import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

type Customer = Tables<'customers'>;

interface JobFormData {
  consignment_details: string;
  customer_id: string;
  collection_address: {
    company_name: string;
    contact_name: string;
    street: string;
    city: string;
    postcode: string;
    country: string;
    special_instructions?: string;
    ref_number_if_any?: string;
  };
  delivery_address: {
    company_name: string;
    contact_name: string;
    street: string;
    city: string;
    postcode: string;
    country: string;
    special_instructions?: string;
    ref_number_if_any?: string;
  };
  collection_datetime_planned_from: string;
  collection_datetime_planned_to: string;
  delivery_datetime_planned_from: string;
  delivery_datetime_planned_to: string;
  driver_instructions: string;
  service_type: string;
  vehicle_trailer_requirements: string;
  agreed_rate_gbp: string;
  weight_kg: string;
  pallets: string;
  goods_description: string;
  currency?: string;
}

export default function CreateJobPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    consignment_details: '',
    customer_id: '',
    collection_address: {
      company_name: '',
      contact_name: '',
      street: '',
      city: '',
      postcode: '',
      country: 'United Kingdom'
    },
    delivery_address: {
      company_name: '',
      contact_name: '',
      street: '',
      city: '',
      postcode: '',
      country: 'United Kingdom'
    },
    collection_datetime_planned_from: '',
    collection_datetime_planned_to: '',
    delivery_datetime_planned_from: '',
    delivery_datetime_planned_to: '',
    driver_instructions: '',
    service_type: 'standard',
    vehicle_trailer_requirements: 'standard',
    agreed_rate_gbp: '',
    weight_kg: '',
    pallets: '',
    goods_description: '',
    currency: 'GBP'
  });

  useEffect(() => {
    loadCustomers();
    if (isEditMode && id) {
      loadJobForEdit(id);
    }
  }, [isEditMode, id]);

  const loadCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('company_name');

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error loading customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive"
      });
    }
  };

  const loadJobForEdit = async (jobId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;

      // Populate form with existing job data
      if (data) {
        setFormData({
          consignment_details: data.consignment_details || '',
          customer_id: data.customer_id || '',
          collection_address: (data.collection_address as any) || {
            company_name: '',
            contact_name: '',
            street: '',
            city: '',
            postcode: '',
            country: 'United Kingdom'
          },
          delivery_address: (data.delivery_address as any) || {
            company_name: '',
            contact_name: '',
            street: '',
            city: '',
            postcode: '',
            country: 'United Kingdom'
          },
          collection_datetime_planned_from: data.collection_datetime_planned_from ? 
            new Date(data.collection_datetime_planned_from).toISOString().slice(0, 16) : '',
          collection_datetime_planned_to: data.collection_datetime_planned_to ? 
            new Date(data.collection_datetime_planned_to).toISOString().slice(0, 16) : '',
          delivery_datetime_planned_from: data.delivery_datetime_planned_from ? 
            new Date(data.delivery_datetime_planned_from).toISOString().slice(0, 16) : '',
          delivery_datetime_planned_to: data.delivery_datetime_planned_to ? 
            new Date(data.delivery_datetime_planned_to).toISOString().slice(0, 16) : '',
          driver_instructions: data.driver_instructions || '',
          service_type: 'standard', // Default since it doesn't exist in current schema
          vehicle_trailer_requirements: data.vehicle_trailer_requirements || 'standard',
          agreed_rate_gbp: data.agreed_rate_gbp?.toString() || '',
          weight_kg: data.weight_kg?.toString() || '',
          pallets: data.pallets?.toString() || '',
          goods_description: data.goods_description || '',
          currency: data.currency || 'GBP'
        });
      }
    } catch (error) {
      console.error('Error loading job for edit:', error);
      toast({
        title: "Error",
        description: "Failed to load job data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (locationType: 'collection_address' | 'delivery_address', field: string, value: string) => {
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
      'consignment_details',
      'customer_id',
      'collection_datetime_planned_from',
      'service_type',
      'agreed_rate_gbp'
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

    if (!formData.collection_address.street || !formData.collection_address.city) {
      toast({
        title: "Validation Error",
        description: "Collection address and city are required",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.delivery_address.street || !formData.delivery_address.city) {
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
      
      console.log('🚀 FORM SUBMISSION STARTED');
      console.log('📋 Raw Form Data:', formData);
      console.log('🎯 Customer ID being sent:', formData.customer_id);
      console.log('🔍 Customer ID type:', typeof formData.customer_id);
      console.log('📝 Mode:', isEditMode ? 'EDIT' : 'CREATE');
      
      // Transform form data to match our jobs table schema
      const jobData = {
        consignment_details: formData.consignment_details,
        customer_id: formData.customer_id,
        status: 'pending',
        
        // Collection datetime
        collection_datetime_planned_from: formData.collection_datetime_planned_from ? new Date(formData.collection_datetime_planned_from).toISOString() : new Date().toISOString(),
        collection_datetime_planned_to: formData.collection_datetime_planned_to ? new Date(formData.collection_datetime_planned_to).toISOString() : null,
        
        // Delivery datetime
        delivery_datetime_planned_from: formData.delivery_datetime_planned_from ? new Date(formData.delivery_datetime_planned_from).toISOString() : null,
        delivery_datetime_planned_to: formData.delivery_datetime_planned_to ? new Date(formData.delivery_datetime_planned_to).toISOString() : null,
        
        // Collection address as JSONB
        collection_address: {
          company_name: formData.collection_address.company_name || '',
          contact_name: formData.collection_address.contact_name || '',
          street: formData.collection_address.street,
          city: formData.collection_address.city,
          postcode: formData.collection_address.postcode,
          country: formData.collection_address.country || 'United Kingdom',
          special_instructions: formData.collection_address.special_instructions || '',
          ref_number_if_any: formData.collection_address.ref_number_if_any || ''
        },
        
        // Delivery address as JSONB
        delivery_address: {
          company_name: formData.delivery_address.company_name || '',
          contact_name: formData.delivery_address.contact_name || '',
          street: formData.delivery_address.street,
          city: formData.delivery_address.city,
          postcode: formData.delivery_address.postcode,
          country: formData.delivery_address.country || 'United Kingdom',
          special_instructions: formData.delivery_address.special_instructions || '',
          ref_number_if_any: formData.delivery_address.ref_number_if_any || ''
        },
        
        // Service details
        agreed_rate_gbp: formData.agreed_rate_gbp ? parseFloat(formData.agreed_rate_gbp) : null,
        currency: formData.currency || 'GBP',
        vehicle_trailer_requirements: formData.vehicle_trailer_requirements,
        goods_description: formData.goods_description || null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        pallets: formData.pallets ? parseInt(formData.pallets) : null,
        driver_instructions: formData.driver_instructions || null,
        
        // Additional fields
        additional_stops: [],
        pod_document_urls: [],
        cmr_document_urls: [],
        run_sheet_urls: [],
        internal_notes: [],
        updated_at: new Date().toISOString()
      };

      // Add ikb_order_no only for new jobs
      if (!isEditMode) {
        (jobData as any).ikb_order_no = generateJobReference();
        (jobData as any).created_by = null; // Will be set by RLS/auth
      }

      console.log('🔧 Transformed job data for Supabase:', jobData);

      let data, error;
      
      if (isEditMode) {
        // Update existing job
        const result = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', id)
          .select()
          .single();
        data = result.data;
        error = result.error;
      } else {
        // Create new job
        const result = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();
        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('🚨 SUPABASE ERROR:', error);
        throw error;
      }

      console.log('✅ SUCCESS! Job saved:', data);

      toast({
        title: `Success! 🔥`,
        description: `Job ${isEditMode ? 'updated' : 'created'} successfully! BOOM! 🚀`,
      });

      navigate(`/jobs`);
    } catch (error) {
      console.error('❌ Error saving job:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} job: ${error.message}`,
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
                {isEditMode ? 'Edit Job' : 'Create New Job'}
              </h1>
              <p className="text-aximo-text-secondary mt-1">
                {isEditMode ? 'Update transportation job details' : 'Add a new transportation job to the system'}
              </p>
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
                    <Label htmlFor="consignment_details">Consignment Details *</Label>
                    <Input
                      id="consignment_details"
                      value={formData.consignment_details}
                      onChange={(e) => handleInputChange('consignment_details', e.target.value)}
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
                        {customers.map(customer => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.company_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="goods_description">Goods Description</Label>
                  <Textarea
                    id="goods_description"
                    value={formData.goods_description}
                    onChange={(e) => handleInputChange('goods_description', e.target.value)}
                    placeholder="Detailed description of the goods..."
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
                    <Label htmlFor="collection-address">Address *</Label>
                    <Input
                      id="collection-address"
                      value={formData.collection_address.street}
                      onChange={(e) => handleLocationChange('collection_address', 'street', e.target.value)}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="collection-city">City *</Label>
                    <Input
                      id="collection-city"
                      value={formData.collection_address.city}
                      onChange={(e) => handleLocationChange('collection_address', 'city', e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="collection-postcode">Postcode</Label>
                    <Input
                      id="collection-postcode"
                      value={formData.collection_address.postcode}
                      onChange={(e) => handleLocationChange('collection_address', 'postcode', e.target.value)}
                      placeholder="Postcode"
                    />
                  </div>
                  <div>
                    <Label htmlFor="collection-country">Country</Label>
                    <Input
                      id="collection-country"
                      value={formData.collection_address.country}
                      onChange={(e) => handleLocationChange('collection_address', 'country', e.target.value)}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="collection-datetime-planned-from">Pickup Date *</Label>
                    <Input
                      id="collection-datetime-planned-from"
                      type="datetime-local"
                      value={formData.collection_datetime_planned_from}
                      onChange={(e) => handleInputChange('collection_datetime_planned_from', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="collection-datetime-planned-to">Pickup Time</Label>
                    <Input
                      id="collection-datetime-planned-to"
                      type="datetime-local"
                      value={formData.collection_datetime_planned_to}
                      onChange={(e) => handleInputChange('collection_datetime_planned_to', e.target.value)}
                    />
                  </div>
                </div>

                {/* Collection Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="col-span-full text-sm font-medium text-blue-400 mb-2">Collection Contact</h4>
                  <div>
                    <Label htmlFor="collection_company">Company Name</Label>
                    <Input
                      id="collection_company"
                      placeholder="Collection company name"
                      value={formData.collection_address.company_name || ''}
                      onChange={(e) => handleLocationChange('collection_address', 'company_name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="collection_contact">Contact Person</Label>
                    <Input
                      id="collection_contact"
                      placeholder="Contact person name"
                      value={formData.collection_address.contact_name || ''}
                      onChange={(e) => handleLocationChange('collection_address', 'contact_name', e.target.value)}
                    />
                  </div>
                </div>

                {/* Special Collection Instructions */}
                <div>
                  <Label htmlFor="collection_instructions">Special Collection Instructions</Label>
                  <Textarea
                    id="collection_instructions"
                    placeholder="Special instructions for collection (loading requirements, access codes, etc.)"
                    value={formData.collection_address.special_instructions || ''}
                    onChange={(e) => handleLocationChange('collection_address', 'special_instructions', e.target.value)}
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
                      value={formData.delivery_address.street}
                      onChange={(e) => handleLocationChange('delivery_address', 'street', e.target.value)}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery-city">City *</Label>
                    <Input
                      id="delivery-city"
                      value={formData.delivery_address.city}
                      onChange={(e) => handleLocationChange('delivery_address', 'city', e.target.value)}
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
                      value={formData.delivery_address.postcode}
                      onChange={(e) => handleLocationChange('delivery_address', 'postcode', e.target.value)}
                      placeholder="Postcode"
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery-country">Country</Label>
                    <Input
                      id="delivery-country"
                      value={formData.delivery_address.country}
                      onChange={(e) => handleLocationChange('delivery_address', 'country', e.target.value)}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="delivery-datetime-planned-from">Delivery Date</Label>
                    <Input
                      id="delivery-datetime-planned-from"
                      type="datetime-local"
                      value={formData.delivery_datetime_planned_from}
                      onChange={(e) => handleInputChange('delivery_datetime_planned_from', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery-datetime-planned-to">Delivery Time</Label>
                    <Input
                      id="delivery-datetime-planned-to"
                      type="datetime-local"
                      value={formData.delivery_datetime_planned_to}
                      onChange={(e) => handleInputChange('delivery_datetime_planned_to', e.target.value)}
                    />
                  </div>
                </div>

                {/* Delivery Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="col-span-full text-sm font-medium text-orange-400 mb-2">Delivery Contact</h4>
                  <div>
                    <Label htmlFor="delivery_company">Company Name</Label>
                    <Input
                      id="delivery_company"
                      placeholder="Delivery company name"
                      value={formData.delivery_address.company_name || ''}
                      onChange={(e) => handleLocationChange('delivery_address', 'company_name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery_contact">Contact Person</Label>
                    <Input
                      id="delivery_contact"
                      placeholder="Contact person name"
                      value={formData.delivery_address.contact_name || ''}
                      onChange={(e) => handleLocationChange('delivery_address', 'contact_name', e.target.value)}
                    />
                  </div>
                </div>

                {/* Special Delivery Instructions */}
                <div>
                  <Label htmlFor="delivery_instructions">Special Delivery Instructions</Label>
                  <Textarea
                    id="delivery_instructions"
                    placeholder="Special instructions for delivery (unloading requirements, access codes, etc.)"
                    value={formData.driver_instructions || ''}
                    onChange={(e) => handleInputChange('driver_instructions', e.target.value)}
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
                        <SelectItem value="road_freight">Road Freight</SelectItem>
                        <SelectItem value="express_delivery">Express Delivery</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                        <SelectItem value="groupage">Groupage</SelectItem>
                        <SelectItem value="dedicated">Dedicated Vehicle</SelectItem>
                        <SelectItem value="temperature_controlled">Temperature Controlled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="vehicle-trailer-requirements">Vehicle Type</Label>
                    <Select value={formData.vehicle_trailer_requirements} onValueChange={(value) => handleInputChange('vehicle_trailer_requirements', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="curtain_sider">Curtain Sider</SelectItem>
                        <SelectItem value="box_van">Box Van</SelectItem>
                        <SelectItem value="flatbed">Flatbed</SelectItem>
                        <SelectItem value="refrigerated">Refrigerated</SelectItem>
                        <SelectItem value="tanker">Tanker</SelectItem>
                        <SelectItem value="container">Container</SelectItem>
                        <SelectItem value="lowloader">Low Loader</SelectItem>
                        <SelectItem value="car_transporter">Car Transporter</SelectItem>
                        <SelectItem value="tail_lift">Tail Lift Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="agreed_rate_gbp">Rate (£)</Label>
                    <Input
                      id="agreed_rate_gbp"
                      type="number"
                      step="0.01"
                      value={formData.agreed_rate_gbp}
                      onChange={(e) => handleInputChange('agreed_rate_gbp', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="weight_kg">Weight (kg)</Label>
                    <Input
                      id="weight_kg"
                      value={formData.weight_kg}
                      onChange={(e) => handleInputChange('weight_kg', e.target.value)}
                      placeholder="e.g., 100kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pallets">Number of Pallets</Label>
                    <Input
                      id="pallets"
                      type="number"
                      placeholder="e.g., 10"
                      value={formData.pallets || ''}
                      onChange={(e) => handleInputChange('pallets', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formData.currency || 'GBP'} onValueChange={(value) => handleInputChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? 'Update Job' : 'Create Job'}
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

