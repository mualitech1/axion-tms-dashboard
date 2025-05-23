import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import {
  ArrowLeft, MapPin, Calendar, Package, 
  Truck, User, Save, Plus, Search,
  Clock, DollarSign, AlertTriangle, CheckCircle
} from 'lucide-react';

type Company = Tables<'companies'>;

interface JobFormData {
  title: string;
  description: string;
  customer_id: string;
  pickup_location: {
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
  delivery_location: {
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
  pickup_date: string;
  pickup_time: string;
  delivery_date: string;
  delivery_time: string;
  pickup_instructions: string;
  delivery_instructions: string;
  service_type: string;
  vehicle_requirements: string;
  priority: string;
  rate: string;
  weight: string;
  dimensions: string;
  special_requirements: string;
}

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    customer_id: '',
    pickup_location: {
      address: '',
      city: '',
      postcode: '',
      country: 'United Kingdom'
    },
    delivery_location: {
      address: '',
      city: '',
      postcode: '',
      country: 'United Kingdom'
    },
    pickup_date: '',
    pickup_time: '',
    delivery_date: '',
    delivery_time: '',
    pickup_instructions: '',
    delivery_instructions: '',
    service_type: 'standard',
    vehicle_requirements: 'standard',
    priority: 'medium',
    rate: '',
    weight: '',
    dimensions: '',
    special_requirements: ''
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('type', 'customer')
        .order('name');

      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error('Error loading companies:', error);
      toast({
        title: "Error",
        description: "Failed to load customer list",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (locationType: 'pickup_location' | 'delivery_location', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [locationType]: {
        ...prev[locationType],
        [field]: value
      }
    }));
  };

  const generateJobReference = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `JOB${year}${month}${day}${random}`;
  };

  const validateForm = () => {
    const required = [
      'title',
      'customer_id',
      'pickup_date',
      'service_type',
      'priority'
    ];

    for (const field of required) {
      if (!formData[field as keyof JobFormData]) {
        toast({
          title: "Validation Error",
          description: `${field.replace('_', ' ')} is required`,
          variant: "destructive"
        });
        return false;
      }
    }

    if (!formData.pickup_location.address || !formData.pickup_location.city) {
      toast({
        title: "Validation Error",
        description: "Pickup address and city are required",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.delivery_location.address || !formData.delivery_location.city) {
      toast({
        title: "Validation Error",
        description: "Delivery address and city are required",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setSaving(true);
      
      const jobData = {
        reference: generateJobReference(),
        title: formData.title,
        description: formData.description,
        customer_id: formData.customer_id,
        pickup_location: formData.pickup_location,
        delivery_location: formData.delivery_location,
        pickup_date: formData.pickup_date,
        pickup_time: formData.pickup_time,
        delivery_date: formData.delivery_date || null,
        delivery_time: formData.delivery_time || null,
        pickup_instructions: formData.pickup_instructions || null,
        delivery_instructions: formData.delivery_instructions || null,
        service_type: formData.service_type,
        vehicle_requirements: formData.vehicle_requirements,
        priority: formData.priority,
        rate: formData.rate ? parseFloat(formData.rate) : null,
        weight: formData.weight || null,
        dimensions: formData.dimensions || null,
        special_requirements: formData.special_requirements || null,
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: `Job ${data.reference} created successfully`,
      });

      navigate(`/jobs/details/${data.id}`);
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: "Failed to create job",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/jobs')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-aximo-primary to-blue-500 bg-clip-text text-transparent">
                Create New Job
              </h1>
              <p className="text-aximo-text-secondary mt-1">Add a new transportation job to the system</p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-aximo-border bg-aximo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-aximo-primary" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Manchester to London Delivery"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer">Customer *</Label>
                    <Select value={formData.customer_id} onValueChange={(value) => handleInputChange('customer_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map(company => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed description of the job requirements..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pickup Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-aximo-border bg-aximo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Pickup Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup-address">Address *</Label>
                    <Input
                      id="pickup-address"
                      value={formData.pickup_location.address}
                      onChange={(e) => handleLocationChange('pickup_location', 'address', e.target.value)}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pickup-city">City *</Label>
                    <Input
                      id="pickup-city"
                      value={formData.pickup_location.city}
                      onChange={(e) => handleLocationChange('pickup_location', 'city', e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup-postcode">Postcode</Label>
                    <Input
                      id="pickup-postcode"
                      value={formData.pickup_location.postcode}
                      onChange={(e) => handleLocationChange('pickup_location', 'postcode', e.target.value)}
                      placeholder="Postcode"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pickup-country">Country</Label>
                    <Input
                      id="pickup-country"
                      value={formData.pickup_location.country}
                      onChange={(e) => handleLocationChange('pickup_location', 'country', e.target.value)}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup-date">Pickup Date *</Label>
                    <Input
                      id="pickup-date"
                      type="date"
                      value={formData.pickup_date}
                      onChange={(e) => handleInputChange('pickup_date', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pickup-time">Pickup Time</Label>
                    <Input
                      id="pickup-time"
                      type="time"
                      value={formData.pickup_time}
                      onChange={(e) => handleInputChange('pickup_time', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pickup-instructions">Pickup Instructions</Label>
                  <Textarea
                    id="pickup-instructions"
                    value={formData.pickup_instructions}
                    onChange={(e) => handleInputChange('pickup_instructions', e.target.value)}
                    placeholder="Special instructions for pickup..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Delivery Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-aximo-border bg-aximo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  Delivery Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="delivery-address">Address *</Label>
                    <Input
                      id="delivery-address"
                      value={formData.delivery_location.address}
                      onChange={(e) => handleLocationChange('delivery_location', 'address', e.target.value)}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery-city">City *</Label>
                    <Input
                      id="delivery-city"
                      value={formData.delivery_location.city}
                      onChange={(e) => handleLocationChange('delivery_location', 'city', e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="delivery-postcode">Postcode</Label>
                    <Input
                      id="delivery-postcode"
                      value={formData.delivery_location.postcode}
                      onChange={(e) => handleLocationChange('delivery_location', 'postcode', e.target.value)}
                      placeholder="Postcode"
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery-country">Country</Label>
                    <Input
                      id="delivery-country"
                      value={formData.delivery_location.country}
                      onChange={(e) => handleLocationChange('delivery_location', 'country', e.target.value)}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="delivery-date">Delivery Date</Label>
                    <Input
                      id="delivery-date"
                      type="date"
                      value={formData.delivery_date}
                      onChange={(e) => handleInputChange('delivery_date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery-time">Delivery Time</Label>
                    <Input
                      id="delivery-time"
                      type="time"
                      value={formData.delivery_time}
                      onChange={(e) => handleInputChange('delivery_time', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="delivery-instructions">Delivery Instructions</Label>
                  <Textarea
                    id="delivery-instructions"
                    value={formData.delivery_instructions}
                    onChange={(e) => handleInputChange('delivery_instructions', e.target.value)}
                    placeholder="Special instructions for delivery..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-aximo-border bg-aximo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-aximo-primary" />
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="service-type">Service Type *</Label>
                    <Select value={formData.service_type} onValueChange={(value) => handleInputChange('service_type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Delivery</SelectItem>
                        <SelectItem value="express">Express Delivery</SelectItem>
                        <SelectItem value="overnight">Overnight Delivery</SelectItem>
                        <SelectItem value="same_day">Same Day Delivery</SelectItem>
                        <SelectItem value="scheduled">Scheduled Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="vehicle-requirements">Vehicle Type</Label>
                    <Select value={formData.vehicle_requirements} onValueChange={(value) => handleInputChange('vehicle_requirements', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Vehicle</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="hgv">HGV</SelectItem>
                        <SelectItem value="refrigerated">Refrigerated</SelectItem>
                        <SelectItem value="flatbed">Flatbed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Priority *</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rate">Rate (£)</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.01"
                      value={formData.rate}
                      onChange={(e) => handleInputChange('rate', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="e.g., 100kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange('dimensions', e.target.value)}
                      placeholder="e.g., 2m x 1m x 1m"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="special-requirements">Special Requirements</Label>
                  <Textarea
                    id="special-requirements"
                    value={formData.special_requirements}
                    onChange={(e) => handleInputChange('special_requirements', e.target.value)}
                    placeholder="Any special handling requirements, equipment needed, etc..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end gap-4"
          >
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/jobs')}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-aximo-primary hover:bg-aximo-primary-hover"
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Job
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
