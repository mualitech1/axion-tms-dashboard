import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import {
  ArrowLeft, Truck, MapPin, Calendar, Package, 
  User, Phone, Mail, AlertTriangle, CheckCircle,
  Clock, Building2, Shield, Filter, Search,
  Zap, Target, Star
} from 'lucide-react';

type Job = Tables<'jobs'> & {
  customer?: {
    company_name: string;
  };
};

type Carrier = Tables<'carriers'>;

interface CarrierMatch {
  carrier: Carrier;
  matchScore: number;
  matchReasons: string[];
  complianceStatus: 'compliant' | 'warning' | 'non_compliant';
  estimatedCost?: number;
}

export default function JobAssignmentPage() {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [carrierMatches, setCarrierMatches] = useState<CarrierMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [selectedCarrierId, setSelectedCarrierId] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterFleetType, setFilterFleetType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (jobId) {
      loadJobAndCarriers();
    }
  }, [jobId]);

  useEffect(() => {
    if (job && carriers.length > 0) {
      calculateCarrierMatches();
    }
  }, [job, carriers, filterRegion, filterFleetType, searchTerm]);

  const loadJobAndCarriers = async () => {
    try {
      setLoading(true);
      
      // Load job details
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select(`
          *,
          customer:customers!jobs_customer_id_fkey (
            company_name
          )
        `)
        .eq('id', jobId)
        .single();

      if (jobError) throw jobError;
      setJob(jobData as Job);

      // Load available carriers
      const { data: carriersData, error: carriersError } = await supabase
        .from('carriers')
        .select('*')
        .eq('status', 'approved')
        .order('company_name');

      if (carriersError) throw carriersError;
      setCarriers(carriersData || []);

    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load job and carrier data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateCarrierMatches = () => {
    if (!job) return;

    const collectionAddr = job.collection_address as any;
    const deliveryAddr = job.delivery_address as any;
    
    let filteredCarriers = carriers.filter(carrier => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!carrier.company_name.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Region filter
      if (filterRegion !== 'all') {
        if (!carrier.regions_of_interest.includes(filterRegion)) {
          return false;
        }
      }

      // Fleet type filter
      if (filterFleetType !== 'all') {
        if (!carrier.fleet_type.includes(filterFleetType)) {
          return false;
        }
      }

      return true;
    });

    const matches: CarrierMatch[] = filteredCarriers.map(carrier => {
      let score = 0;
      const reasons: string[] = [];
      
      // Region matching
      const jobRegions = [collectionAddr?.city, deliveryAddr?.city].filter(Boolean);
      const regionMatch = carrier.regions_of_interest.some(region => 
        jobRegions.some(jobRegion => 
          jobRegion?.toLowerCase().includes(region.toLowerCase()) ||
          region.toLowerCase().includes(jobRegion?.toLowerCase())
        )
      );
      
      if (regionMatch) {
        score += 40;
        reasons.push('✅ Operates in job region');
      } else {
        reasons.push('⚠️ Outside preferred regions');
      }

      // Fleet type matching
      const requiredVehicle = job.vehicle_trailer_requirements?.toLowerCase() || '';
      const hasMatchingFleet = carrier.fleet_type.some(fleet =>
        requiredVehicle.includes(fleet.toLowerCase()) ||
        fleet.toLowerCase().includes(requiredVehicle)
      );
      
      if (hasMatchingFleet) {
        score += 30;
        reasons.push('✅ Has suitable fleet');
      } else {
        reasons.push('❌ No matching fleet type');
      }

      // Service type matching
      if (carrier.service_type === 'Road Freight' || carrier.service_type === 'Both') {
        score += 20;
        reasons.push('✅ Provides road freight');
      }

      // Warehousing facilities bonus
      if (carrier.warehousing_facilities) {
        score += 10;
        reasons.push('✅ Has warehousing facilities');
      }

      // Compliance status (mock for now - would check document expiry dates)
      const complianceStatus: 'compliant' | 'warning' | 'non_compliant' = 
        Math.random() > 0.8 ? 'warning' : 'compliant';

      if (complianceStatus === 'compliant') {
        score += 10;
        reasons.push('✅ Fully compliant');
      } else if (complianceStatus === 'warning') {
        reasons.push('⚠️ Documents expiring soon');
      } else {
        score -= 20;
        reasons.push('❌ Non-compliant documents');
      }

      return {
        carrier,
        matchScore: Math.max(0, score),
        matchReasons: reasons,
        complianceStatus,
        estimatedCost: job.agreed_rate_gbp ? job.agreed_rate_gbp * 0.8 : undefined
      };
    });

    // Sort by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);
    setCarrierMatches(matches);
  };

  const handleAssignJob = async () => {
    if (!selectedCarrierId || !job) return;

    try {
      setAssigning(true);
      
      const { error } = await supabase
        .from('jobs')
        .update({
          carrier_id: selectedCarrierId,
          status: 'allocated',
          updated_at: new Date().toISOString()
        })
        .eq('id', job.id);

      if (error) throw error;

      toast({
        title: "Success! 🚀",
        description: "Job assigned to carrier successfully!",
      });

      navigate('/jobs');
    } catch (error) {
      console.error('Error assigning job:', error);
      toast({
        title: "Error",
        description: "Failed to assign job to carrier",
        variant: "destructive"
      });
    } finally {
      setAssigning(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getComplianceBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-800">✅ Compliant</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">⚠️ Warning</Badge>;
      case 'non_compliant':
        return <Badge className="bg-red-100 text-red-800">❌ Non-Compliant</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Job not found</p>
      </div>
    );
  }

  const collectionAddr = job.collection_address as any;
  const deliveryAddr = job.delivery_address as any;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/jobs')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Assign Job to Carrier</h1>
            <p className="text-gray-400">Find the best carrier match for this job</p>
          </div>
        </div>
      </div>

      {/* Job Summary */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-400" />
            Job Details: {job.ikb_order_no}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            <div className="space-y-2">
              <p className="text-gray-400">Customer</p>
              <p className="font-medium">{job.customer?.company_name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Route</p>
              <p className="font-medium">
                {collectionAddr?.city} → {deliveryAddr?.city}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Value</p>
              <p className="font-medium text-green-400">£{job.agreed_rate_gbp?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Vehicle Required</p>
              <p className="font-medium">{job.vehicle_trailer_requirements}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Collection Date</p>
              <p className="font-medium">
                {job.collection_datetime_planned_from ? 
                  new Date(job.collection_datetime_planned_from).toLocaleDateString() : 'Not set'}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Weight</p>
              <p className="font-medium">{job.weight_kg ? `${job.weight_kg}kg` : 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search carriers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="Manchester">Manchester</SelectItem>
                  <SelectItem value="Birmingham">Birmingham</SelectItem>
                  <SelectItem value="West Midlands">West Midlands</SelectItem>
                  <SelectItem value="Yorkshire">Yorkshire</SelectItem>
                  <SelectItem value="North East">North East</SelectItem>
                  <SelectItem value="Scotland">Scotland</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterFleetType} onValueChange={setFilterFleetType}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by fleet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fleet Types</SelectItem>
                  <SelectItem value="Curtain-side">Curtain-side</SelectItem>
                  <SelectItem value="Temperature Controlled">Temperature Controlled</SelectItem>
                  <SelectItem value="ADR">ADR</SelectItem>
                  <SelectItem value="Container">Container</SelectItem>
                  <SelectItem value="44T Artic">44T Artic</SelectItem>
                  <SelectItem value="Tail-lift">Tail-lift</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">{carrierMatches.length} matches found</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carrier Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {carrierMatches.map((match, index) => (
          <motion.div
            key={match.carrier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 transition-all duration-200 hover:border-blue-500 ${
              selectedCarrierId === match.carrier.id ? 'ring-2 ring-blue-500' : ''
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-400" />
                    {match.carrier.company_name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className={`text-2xl font-bold ${getScoreColor(match.matchScore)}`}>
                      {match.matchScore}%
                    </div>
                    {match.matchScore >= 80 && <Star className="h-5 w-5 text-yellow-400" />}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Compliance Status */}
                <div className="flex items-center justify-between">
                  {getComplianceBadge(match.complianceStatus)}
                  {match.estimatedCost && (
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Est. Cost</p>
                      <p className="text-green-400 font-medium">£{match.estimatedCost.toFixed(2)}</p>
                    </div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="h-4 w-4" />
                    {match.carrier.pod_contact.name}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="h-4 w-4" />
                    {match.carrier.pod_contact.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 md:col-span-2">
                    <Mail className="h-4 w-4" />
                    {match.carrier.pod_contact.email}
                  </div>
                </div>

                {/* Fleet & Regions */}
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-400 text-sm">Fleet Types</p>
                    <div className="flex flex-wrap gap-1">
                      {match.carrier.fleet_type.map(fleet => (
                        <Badge key={fleet} variant="outline" className="text-xs">
                          {fleet}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Regions</p>
                    <div className="flex flex-wrap gap-1">
                      {match.carrier.regions_of_interest.map(region => (
                        <Badge key={region} variant="outline" className="text-xs">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Match Reasons */}
                <div>
                  <p className="text-gray-400 text-sm mb-2">Match Analysis</p>
                  <div className="space-y-1">
                    {match.matchReasons.map((reason, idx) => (
                      <p key={idx} className="text-xs text-gray-300">{reason}</p>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => setSelectedCarrierId(match.carrier.id)}
                  variant={selectedCarrierId === match.carrier.id ? "default" : "outline"}
                  className="w-full"
                  disabled={match.complianceStatus === 'non_compliant'}
                >
                  {selectedCarrierId === match.carrier.id ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Select Carrier
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Assign Button */}
      {selectedCarrierId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6"
        >
          <Button
            onClick={handleAssignJob}
            disabled={assigning}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg"
          >
            {assigning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Assigning...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Assign Job to Carrier
              </>
            )}
          </Button>
        </motion.div>
      )}

      {carrierMatches.length === 0 && !loading && (
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardContent className="text-center py-8">
            <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No matching carriers found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 