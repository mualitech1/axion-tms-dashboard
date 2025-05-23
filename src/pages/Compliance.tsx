import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, AlertTriangle, CheckCircle, Clock, 
  FileText, Calendar, Users, Truck, 
  Award, BookOpen, Search, Filter,
  Download, Eye, Plus, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ComplianceItem {
  id: string;
  title: string;
  type: 'certification' | 'audit' | 'regulation' | 'training';
  status: 'compliant' | 'warning' | 'expired' | 'pending';
  expiryDate: string;
  lastUpdated: string;
  responsible: string;
  priority: 'high' | 'medium' | 'low';
}

const CompliancePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const mockComplianceItems: ComplianceItem[] = [
    {
      id: '1',
      title: 'ISO 9001:2015 Certification',
      type: 'certification',
      status: 'compliant',
      expiryDate: '2024-12-31',
      lastUpdated: '2024-01-15',
      responsible: 'Quality Manager',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Driver CPC Training',
      type: 'training',
      status: 'warning',
      expiryDate: '2024-03-15',
      lastUpdated: '2024-01-10',
      responsible: 'HR Manager',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Vehicle Safety Inspection',
      type: 'audit',
      status: 'pending',
      expiryDate: '2024-02-28',
      lastUpdated: '2024-01-12',
      responsible: 'Fleet Manager',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'GDPR Compliance Review',
      type: 'regulation',
      status: 'compliant',
      expiryDate: '2024-06-30',
      lastUpdated: '2024-01-08',
      responsible: 'Data Protection Officer',
      priority: 'high'
    }
  ];

  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'expired':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getTypeIcon = (type: ComplianceItem['type']) => {
    switch (type) {
      case 'certification': return <Award className="h-4 w-4" />;
      case 'audit': return <Shield className="h-4 w-4" />;
      case 'regulation': return <FileText className="h-4 w-4" />;
      case 'training': return <BookOpen className="h-4 w-4" />;
    }
  };

  const complianceScore = 85;
  const totalItems = mockComplianceItems.length;
  const compliantItems = mockComplianceItems.filter(item => item.status === 'compliant').length;
  const warningItems = mockComplianceItems.filter(item => item.status === 'warning').length;
  const expiredItems = mockComplianceItems.filter(item => item.status === 'expired').length;

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
              Compliance Management
            </h1>
            <p className="text-aximo-text-secondary mt-2">
              Monitor and manage regulatory compliance, certifications, and audit requirements
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button className="bg-aximo-primary hover:bg-aximo-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Add Compliance Item
            </Button>
          </div>
        </motion.div>

        {/* Compliance Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-aximo-text">Overall Compliance Score</h3>
                  <p className="text-aximo-text-secondary">Based on current compliance status</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-aximo-primary">{complianceScore}%</div>
                  <div className="text-sm text-aximo-text-secondary">
                    {compliantItems}/{totalItems} items compliant
                  </div>
                </div>
              </div>
              <Progress value={complianceScore} className="h-3" />
              <div className="flex justify-between mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-aximo-text-secondary">Compliant: {compliantItems}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-aximo-text-secondary">Warning: {warningItems}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-aximo-text-secondary">Expired: {expiredItems}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { title: 'Active Certifications', value: '12', icon: Award, color: 'blue' },
            { title: 'Pending Audits', value: '3', icon: Shield, color: 'yellow' },
            { title: 'Training Due', value: '8', icon: BookOpen, color: 'orange' },
            { title: 'Regulatory Updates', value: '2', icon: FileText, color: 'green' }
          ].map((stat, index) => (
            <Card key={index} className="border-aximo-border bg-aximo-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-aximo-text-secondary">{stat.title}</p>
                    <p className="text-2xl font-bold text-aximo-text">{stat.value}</p>
                  </div>
                  <div className={cn(
                    "p-3 rounded-full",
                    stat.color === 'blue' ? "bg-blue-100 dark:bg-blue-900" :
                    stat.color === 'yellow' ? "bg-yellow-100 dark:bg-yellow-900" :
                    stat.color === 'orange' ? "bg-orange-100 dark:bg-orange-900" : "bg-green-100 dark:bg-green-900"
                  )}>
                    <stat.icon className={cn(
                      "h-6 w-6",
                      stat.color === 'blue' ? "text-blue-600 dark:text-blue-400" :
                      stat.color === 'yellow' ? "text-yellow-600 dark:text-yellow-400" :
                      stat.color === 'orange' ? "text-orange-600 dark:text-orange-400" : "text-green-600 dark:text-green-400"
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
          transition={{ delay: 0.3 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-aximo-card border-aximo-border">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="certifications" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Certifications
              </TabsTrigger>
              <TabsTrigger value="audits" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Audits
              </TabsTrigger>
              <TabsTrigger value="training" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Training
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-aximo-text-secondary" />
                  <Input
                    placeholder="Search compliance items..."
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

              {/* Compliance Items List */}
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle>All Compliance Items</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-aximo-border">
                    {mockComplianceItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 hover:bg-aximo-card-hover transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-aximo-primary/10 rounded">
                              {getTypeIcon(item.type)}
                            </div>
                            <div>
                              <h3 className="font-medium text-aximo-text">{item.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getStatusColor(item.status)}>
                                  {getStatusIcon(item.status)}
                                  <span className="ml-1 capitalize">{item.status}</span>
                                </Badge>
                                <span className="text-sm text-aximo-text-secondary capitalize">
                                  {item.type}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-aximo-text">
                                Expires: {item.expiryDate}
                              </p>
                              <p className="text-xs text-aximo-text-secondary">
                                Responsible: {item.responsible}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications">
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-aximo-primary" />
                    Active Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockComplianceItems
                      .filter(item => item.type === 'certification')
                      .map((cert, index) => (
                        <motion.div
                          key={cert.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 border border-aximo-border rounded-lg bg-aximo-background"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <Award className="h-8 w-8 text-aximo-primary" />
                            <div>
                              <h3 className="font-medium text-aximo-text">{cert.title}</h3>
                              <Badge className={getStatusColor(cert.status)}>
                                {cert.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm text-aximo-text-secondary">
                            <div className="flex justify-between">
                              <span>Expires:</span>
                              <span>{cert.expiryDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Responsible:</span>
                              <span>{cert.responsible}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audits Tab */}
            <TabsContent value="audits">
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-aximo-primary" />
                    Audit Schedule & Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Shield className="h-16 w-16 text-aximo-primary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-aximo-text mb-2">
                      Audit Management
                    </h3>
                    <p className="text-aximo-text-secondary">
                      Schedule and track internal and external audits for compliance verification.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Training Tab */}
            <TabsContent value="training">
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-aximo-primary" />
                    Training & Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BookOpen className="h-16 w-16 text-aximo-primary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-aximo-text mb-2">
                      Training Programs
                    </h3>
                    <p className="text-aximo-text-secondary">
                      Manage mandatory training requirements and track completion status.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default CompliancePage; 