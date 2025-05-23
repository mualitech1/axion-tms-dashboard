import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Plus, Search, Filter, MapPin, 
  Phone, Mail, Globe, Users, Package,
  Star, TrendingUp, Calendar, Eye,
  Edit, Trash2, MoreHorizontal, Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Company {
  id: string;
  name: string;
  type: 'client' | 'supplier' | 'partner' | 'carrier';
  status: 'active' | 'inactive' | 'pending';
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  country: string;
  contactPerson: string;
  totalJobs: number;
  totalRevenue: number;
  rating: number;
  joinDate: string;
  lastActivity: string;
  logo?: string;
}

const CompaniesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'Global Logistics Ltd',
      type: 'client',
      status: 'active',
      email: 'contact@globallogistics.com',
      phone: '+44 20 7123 4567',
      website: 'www.globallogistics.com',
      address: '123 Business Park',
      city: 'London',
      country: 'United Kingdom',
      contactPerson: 'Sarah Johnson',
      totalJobs: 156,
      totalRevenue: 245000,
      rating: 4.8,
      joinDate: '2023-03-15',
      lastActivity: '2024-01-14'
    },
    {
      id: '2',
      name: 'European Transport Solutions',
      type: 'carrier',
      status: 'active',
      email: 'info@ets-transport.eu',
      phone: '+49 30 1234 5678',
      address: 'Hauptstraße 45',
      city: 'Berlin',
      country: 'Germany',
      contactPerson: 'Hans Mueller',
      totalJobs: 89,
      totalRevenue: 178000,
      rating: 4.6,
      joinDate: '2023-07-22',
      lastActivity: '2024-01-13'
    },
    {
      id: '3',
      name: 'Mediterranean Shipping Co',
      type: 'supplier',
      status: 'active',
      email: 'operations@medshipping.com',
      phone: '+39 06 9876 5432',
      website: 'www.medshipping.com',
      address: 'Via Roma 100',
      city: 'Rome',
      country: 'Italy',
      contactPerson: 'Marco Rossi',
      totalJobs: 234,
      totalRevenue: 567000,
      rating: 4.9,
      joinDate: '2022-11-08',
      lastActivity: '2024-01-15'
    },
    {
      id: '4',
      name: 'Nordic Freight Partners',
      type: 'partner',
      status: 'pending',
      email: 'contact@nordicfreight.no',
      phone: '+47 22 12 34 56',
      address: 'Storgata 25',
      city: 'Oslo',
      country: 'Norway',
      contactPerson: 'Erik Andersen',
      totalJobs: 0,
      totalRevenue: 0,
      rating: 0,
      joinDate: '2024-01-10',
      lastActivity: '2024-01-10'
    }
  ];

  const getStatusColor = (status: Company['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const getTypeColor = (type: Company['type']) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'supplier': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'partner': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'carrier': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    }
  };

  const getTypeIcon = (type: Company['type']) => {
    switch (type) {
      case 'client': return <Users className="h-4 w-4" />;
      case 'supplier': return <Package className="h-4 w-4" />;
      case 'partner': return <Building className="h-4 w-4" />;
      case 'carrier': return <Building2 className="h-4 w-4" />;
    }
  };

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || company.type === selectedTab;
    return matchesSearch && matchesTab;
  });

  const totalCompanies = mockCompanies.length;
  const activeCompanies = mockCompanies.filter(c => c.status === 'active').length;
  const totalRevenue = mockCompanies.reduce((sum, c) => sum + c.totalRevenue, 0);
  const avgRating = mockCompanies.filter(c => c.rating > 0).reduce((sum, c) => sum + c.rating, 0) / mockCompanies.filter(c => c.rating > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-aximo-primary to-blue-500 bg-clip-text text-transparent">
              Company Management
            </h1>
            <p className="text-aximo-text-secondary mt-2">
              Manage clients, suppliers, carriers, and business partners
            </p>
          </div>
          <Button className="bg-aximo-primary hover:bg-aximo-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { 
              title: 'Total Companies', 
              value: totalCompanies.toString(), 
              change: '+12%', 
              color: 'blue',
              icon: Building2
            },
            { 
              title: 'Active Partners', 
              value: activeCompanies.toString(), 
              change: '+8%', 
              color: 'green',
              icon: Users
            },
            { 
              title: 'Total Revenue', 
              value: `£${(totalRevenue / 1000).toFixed(0)}K`, 
              change: '+23%', 
              color: 'purple',
              icon: TrendingUp
            },
            { 
              title: 'Avg Rating', 
              value: avgRating.toFixed(1), 
              change: '+0.2', 
              color: 'yellow',
              icon: Star
            }
          ].map((stat, index) => (
            <Card key={index} className="border-aximo-border bg-aximo-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-aximo-text-secondary">{stat.title}</p>
                    <p className="text-2xl font-bold text-aximo-text">{stat.value}</p>
                    <p className={cn(
                      "text-xs",
                      stat.color === 'green' ? "text-green-500" :
                      stat.color === 'purple' ? "text-purple-500" :
                      stat.color === 'yellow' ? "text-yellow-500" : "text-blue-500"
                    )}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={cn(
                    "p-3 rounded-full",
                    stat.color === 'blue' ? "bg-blue-100 dark:bg-blue-900" :
                    stat.color === 'green' ? "bg-green-100 dark:bg-green-900" :
                    stat.color === 'purple' ? "bg-purple-100 dark:bg-purple-900" : "bg-yellow-100 dark:bg-yellow-900"
                  )}>
                    <stat.icon className={cn(
                      "h-6 w-6",
                      stat.color === 'blue' ? "text-blue-600 dark:text-blue-400" :
                      stat.color === 'green' ? "text-green-600 dark:text-green-400" :
                      stat.color === 'purple' ? "text-purple-600 dark:text-purple-400" : "text-yellow-600 dark:text-yellow-400"
                    )} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-aximo-card border-aximo-border">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                All Companies
              </TabsTrigger>
              <TabsTrigger value="client" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Clients
              </TabsTrigger>
              <TabsTrigger value="supplier" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Suppliers
              </TabsTrigger>
              <TabsTrigger value="carrier" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Carriers
              </TabsTrigger>
              <TabsTrigger value="partner" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Partners
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="space-y-6">
              {/* Search and Filter */}
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-aximo-text-secondary" />
                  <Input
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-aximo-card border-aximo-border"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              {/* Companies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-aximo-border bg-aximo-card hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={company.logo} />
                              <AvatarFallback className="bg-aximo-primary/10 text-aximo-primary">
                                {company.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-aximo-text">{company.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getTypeColor(company.type)}>
                                  {getTypeIcon(company.type)}
                                  <span className="ml-1 capitalize">{company.type}</span>
                                </Badge>
                                <Badge className={getStatusColor(company.status)}>
                                  {company.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Contact Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-aximo-text-secondary">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">{company.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-aximo-text-secondary">
                            <Phone className="h-4 w-4" />
                            <span>{company.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-aximo-text-secondary">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate">{company.city}, {company.country}</span>
                          </div>
                          {company.website && (
                            <div className="flex items-center gap-2 text-sm text-aximo-text-secondary">
                              <Globe className="h-4 w-4" />
                              <span className="truncate">{company.website}</span>
                            </div>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-aximo-border">
                          <div className="text-center">
                            <p className="text-lg font-semibold text-aximo-text">{company.totalJobs}</p>
                            <p className="text-xs text-aximo-text-secondary">Total Jobs</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-aximo-text">
                              £{(company.totalRevenue / 1000).toFixed(0)}K
                            </p>
                            <p className="text-xs text-aximo-text-secondary">Revenue</p>
                          </div>
                        </div>

                        {/* Rating */}
                        {company.rating > 0 && (
                          <div className="flex items-center justify-center gap-1 pt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < Math.floor(company.rating) 
                                    ? "text-yellow-400 fill-current" 
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                            <span className="text-sm text-aximo-text-secondary ml-1">
                              {company.rating.toFixed(1)}
                            </span>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filteredCompanies.length === 0 && (
                <Card className="border-aximo-border bg-aximo-card">
                  <CardContent className="text-center py-12">
                    <Building2 className="h-16 w-16 text-aximo-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-aximo-text mb-2">
                      No companies found
                    </h3>
                    <p className="text-aximo-text-secondary mb-4">
                      Try adjusting your search criteria or add a new company.
                    </p>
                    <Button className="bg-aximo-primary hover:bg-aximo-primary-hover">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Company
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default CompaniesPage; 