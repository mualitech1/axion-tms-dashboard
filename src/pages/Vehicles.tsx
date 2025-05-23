import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { 
  Plus, 
  Search, 
  Filter, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Clock,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Download,
  MoreHorizontal,
  Car,
  Fuel,
  Calendar,
  Settings,
  AlertTriangle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFormValidation } from '@/hooks/use-form-validation';
import { z } from 'zod';

type Vehicle = Tables<'vehicles'>;

const vehicleSchema = z.object({
  registration: z.string().min(2, "Registration must be at least 2 characters"),
  make: z.string().min(2, "Make must be at least 2 characters"),
  model: z.string().min(2, "Model must be at least 2 characters"),
  year: z.number().min(1900, "Year must be valid").max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  type: z.string().min(2, "Vehicle type is required"),
  capacity: z.number().min(0, "Capacity must be positive"),
  fuel_type: z.string().min(2, "Fuel type is required"),
  insurance_expiry: z.string().min(1, "Insurance expiry date is required"),
  mot_expiry: z.string().optional(),
  tax_expiry: z.string().optional(),
  notes: z.string().optional(),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

const statusColors = {
  active: 'bg-green-100 text-green-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  out_of_service: 'bg-red-100 text-red-800',
  retired: 'bg-gray-100 text-gray-800',
};

const typeColors = {
  van: 'bg-blue-100 text-blue-800',
  truck: 'bg-purple-100 text-purple-800',
  lorry: 'bg-orange-100 text-orange-800',
  trailer: 'bg-green-100 text-green-800',
  car: 'bg-gray-100 text-gray-800',
};

export default function Vehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFormData,
  } = useFormValidation<VehicleFormData>(vehicleSchema, {
    registration: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'van',
    capacity: 0,
    fuel_type: 'diesel',
    insurance_expiry: '',
    mot_expiry: '',
    tax_expiry: '',
    notes: '',
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    filterVehicles();
  }, [vehicles, searchTerm, statusFilter, typeFilter]);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error loading vehicles:', error);
      toast({
        title: "Error",
        description: "Failed to load vehicles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterVehicles = () => {
    let filtered = [...vehicles];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.type === typeFilter);
    }

    setFilteredVehicles(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);

      const vehicleData = {
        registration: formData.registration.toUpperCase(),
        make: formData.make,
        model: formData.model,
        year: formData.year,
        type: formData.type,
        capacity: formData.capacity,
        fuel_type: formData.fuel_type,
        insurance_expiry: formData.insurance_expiry,
        mot_expiry: formData.mot_expiry || null,
        tax_expiry: formData.tax_expiry || null,
        notes: formData.notes || null,
        status: 'active',
      };

      if (editingVehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update({
            ...vehicleData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingVehicle.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Vehicle updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('vehicles')
          .insert([vehicleData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Vehicle created successfully",
        });
      }

      resetForm();
      setIsCreateDialogOpen(false);
      setEditingVehicle(null);
      loadVehicles();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      toast({
        title: "Error",
        description: "Failed to save vehicle",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      registration: vehicle.registration,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year || new Date().getFullYear(),
      type: vehicle.type || 'van',
      capacity: vehicle.capacity || 0,
      fuel_type: vehicle.fuel_type || 'diesel',
      insurance_expiry: vehicle.insurance_expiry || '',
      mot_expiry: vehicle.mot_expiry || '',
      tax_expiry: vehicle.tax_expiry || '',
      notes: vehicle.notes || '',
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (vehicleId: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicleId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vehicle deleted successfully",
      });

      loadVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast({
        title: "Error",
        description: "Failed to delete vehicle",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = async (vehicleId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ 
          status: newStatus, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', vehicleId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vehicle status updated successfully",
      });

      loadVehicles();
    } catch (error) {
      console.error('Error updating vehicle status:', error);
      toast({
        title: "Error",
        description: "Failed to update vehicle status",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const isExpiringSoon = (dateString: string | null) => {
    if (!dateString) return false;
    const expiryDate = new Date(dateString);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiryDate <= thirtyDaysFromNow;
  };

  const closeDialog = () => {
    setIsCreateDialogOpen(false);
    setEditingVehicle(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading vehicles...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Management</h1>
          <p className="text-gray-600">Manage your fleet of vehicles</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={loadVehicles}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                </DialogTitle>
                <DialogDescription>
                  {editingVehicle 
                    ? 'Update vehicle information below.'
                    : 'Enter the vehicle details below to add it to your fleet.'
                  }
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registration">Registration *</Label>
                    <InputWithIcon
                      id="registration"
                      name="registration"
                      icon={Car}
                      placeholder="Enter registration"
                      value={formData.registration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.registration}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Vehicle Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleChange({ target: { name: 'type', value } } as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="lorry">Lorry</SelectItem>
                        <SelectItem value="trailer">Trailer</SelectItem>
                        <SelectItem value="car">Car</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-sm text-red-600 mt-1">{errors.type}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="make">Make *</Label>
                    <Input
                      id="make"
                      name="make"
                      placeholder="Enter make"
                      value={formData.make}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.make && (
                      <p className="text-sm text-red-600 mt-1">{errors.make}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      name="model"
                      placeholder="Enter model"
                      value={formData.model}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.model && (
                      <p className="text-sm text-red-600 mt-1">{errors.model}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      placeholder="Enter year"
                      value={formData.year}
                      onChange={(e) => handleChange({ target: { name: 'year', value: parseInt(e.target.value) || 0 } } as any)}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.year && (
                      <p className="text-sm text-red-600 mt-1">{errors.year}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="capacity">Capacity (kg) *</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      placeholder="Enter capacity"
                      value={formData.capacity}
                      onChange={(e) => handleChange({ target: { name: 'capacity', value: parseFloat(e.target.value) || 0 } } as any)}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.capacity && (
                      <p className="text-sm text-red-600 mt-1">{errors.capacity}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="fuel_type">Fuel Type *</Label>
                    <Select
                      value={formData.fuel_type}
                      onValueChange={(value) => handleChange({ target: { name: 'fuel_type', value } } as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="lpg">LPG</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.fuel_type && (
                      <p className="text-sm text-red-600 mt-1">{errors.fuel_type}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="insurance_expiry">Insurance Expiry *</Label>
                    <Input
                      id="insurance_expiry"
                      name="insurance_expiry"
                      type="date"
                      value={formData.insurance_expiry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.insurance_expiry && (
                      <p className="text-sm text-red-600 mt-1">{errors.insurance_expiry}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="mot_expiry">MOT Expiry</Label>
                    <Input
                      id="mot_expiry"
                      name="mot_expiry"
                      type="date"
                      value={formData.mot_expiry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.mot_expiry && (
                      <p className="text-sm text-red-600 mt-1">{errors.mot_expiry}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="tax_expiry">Tax Expiry</Label>
                    <Input
                      id="tax_expiry"
                      name="tax_expiry"
                      type="date"
                      value={formData.tax_expiry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.tax_expiry && (
                      <p className="text-sm text-red-600 mt-1">{errors.tax_expiry}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Enter any additional notes"
                      value={formData.notes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                    />
                    {errors.notes && (
                      <p className="text-sm text-red-600 mt-1">{errors.notes}</p>
                    )}
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {editingVehicle ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      editingVehicle ? 'Update Vehicle' : 'Create Vehicle'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <InputWithIcon
                icon={Search}
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="out_of_service">Out of Service</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="lorry">Lorry</SelectItem>
                <SelectItem value="trailer">Trailer</SelectItem>
                <SelectItem value="car">Car</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Vehicles</p>
                <p className="text-2xl font-bold">{vehicles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">
                  {vehicles.filter(vehicle => vehicle.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold">
                  {vehicles.filter(vehicle => vehicle.status === 'maintenance').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold">
                  {vehicles.filter(vehicle => 
                    isExpiringSoon(vehicle.insurance_expiry) || 
                    isExpiringSoon(vehicle.mot_expiry) || 
                    isExpiringSoon(vehicle.tax_expiry)
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Vehicles ({filteredVehicles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-8">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-500 mb-4">
                {vehicles.length === 0 
                  ? "Get started by adding your first vehicle"
                  : "Try adjusting your filters or search terms"
                }
              </p>
              {vehicles.length === 0 && (
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Vehicle
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Fuel</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>MOT</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{vehicle.registration}</p>
                          <p className="text-sm text-gray-500">
                            {vehicle.make} {vehicle.model} ({vehicle.year})
                          </p>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={typeColors[vehicle.type as keyof typeof typeColors] || typeColors.van}>
                          {vehicle.type?.charAt(0).toUpperCase() + vehicle.type?.slice(1)}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          {vehicle.capacity} kg
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-3 w-3" />
                          {vehicle.fuel_type?.charAt(0).toUpperCase() + vehicle.fuel_type?.slice(1)}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className={`text-sm ${isExpiringSoon(vehicle.insurance_expiry) ? 'text-red-600 font-medium' : ''}`}>
                          {formatDate(vehicle.insurance_expiry)}
                          {isExpiringSoon(vehicle.insurance_expiry) && (
                            <AlertTriangle className="h-3 w-3 inline ml-1" />
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className={`text-sm ${isExpiringSoon(vehicle.mot_expiry) ? 'text-red-600 font-medium' : ''}`}>
                          {formatDate(vehicle.mot_expiry)}
                          {isExpiringSoon(vehicle.mot_expiry) && vehicle.mot_expiry && (
                            <AlertTriangle className="h-3 w-3 inline ml-1" />
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Select
                          value={vehicle.status || 'active'}
                          onValueChange={(value) => handleStatusChange(vehicle.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <Badge className={statusColors[vehicle.status as keyof typeof statusColors] || statusColors.active}>
                              {(vehicle.status || 'active').replace('_', ' ').charAt(0).toUpperCase() + (vehicle.status || 'active').replace('_', ' ').slice(1)}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="out_of_service">Out of Service</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/vehicles/${vehicle.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(vehicle)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Vehicle
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(vehicle.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Vehicle
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 