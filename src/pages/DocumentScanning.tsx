import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scan, Upload, FileText, Camera, Download, 
  Search, Filter, CheckCircle, AlertCircle,
  Eye, Trash2, Archive, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  type: 'POD' | 'CMR' | 'Invoice' | 'BOL' | 'Other';
  status: 'processed' | 'processing' | 'failed';
  uploadDate: string;
  size: string;
  jobReference?: string;
}

const DocumentScanningPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('upload');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'POD_JOB_001.pdf',
      type: 'POD',
      status: 'processed',
      uploadDate: '2024-01-15',
      size: '2.3 MB',
      jobReference: 'IKB-001-2024'
    },
    {
      id: '2',
      name: 'CMR_JOB_002.pdf',
      type: 'CMR',
      status: 'processing',
      uploadDate: '2024-01-15',
      size: '1.8 MB',
      jobReference: 'IKB-002-2024'
    },
    {
      id: '3',
      name: 'Invoice_Customer_ABC.pdf',
      type: 'Invoice',
      status: 'processed',
      uploadDate: '2024-01-14',
      size: '856 KB'
    }
  ];

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
          <AlertCircle className="h-4 w-4 text-yellow-500" />
        </motion.div>;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getTypeColor = (type: Document['type']) => {
    switch (type) {
      case 'POD': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'CMR': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Invoice': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'BOL': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

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
              Document Scanning & Management
            </h1>
            <p className="text-aximo-text-secondary mt-2">
              Upload, scan, and manage all your transport documents with AI-powered processing
            </p>
          </div>
          <Button className="bg-aximo-primary hover:bg-aximo-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            New Upload
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
            { title: 'Total Documents', value: '1,247', change: '+12%', color: 'blue' },
            { title: 'Processed Today', value: '34', change: '+8%', color: 'green' },
            { title: 'Processing Queue', value: '7', change: '-23%', color: 'yellow' },
            { title: 'Failed Processing', value: '2', change: '-50%', color: 'red' }
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
                      stat.color === 'red' ? "text-red-500" :
                      stat.color === 'yellow' ? "text-yellow-500" : "text-blue-500"
                    )}>
                      {stat.change} from yesterday
                    </p>
                  </div>
                  <div className={cn(
                    "p-3 rounded-full",
                    stat.color === 'blue' ? "bg-blue-100 dark:bg-blue-900" :
                    stat.color === 'green' ? "bg-green-100 dark:bg-green-900" :
                    stat.color === 'yellow' ? "bg-yellow-100 dark:bg-yellow-900" : "bg-red-100 dark:bg-red-900"
                  )}>
                    <FileText className={cn(
                      "h-6 w-6",
                      stat.color === 'blue' ? "text-blue-600 dark:text-blue-400" :
                      stat.color === 'green' ? "text-green-600 dark:text-green-400" :
                      stat.color === 'yellow' ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"
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
            <TabsList className="grid w-full grid-cols-3 bg-aximo-card border-aximo-border">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload & Scan
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Document Library
              </TabsTrigger>
              <TabsTrigger value="processed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Processed
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scan className="h-5 w-5 text-aximo-primary" />
                    Document Upload & Scanning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Upload Zone */}
                  <div className="border-2 border-dashed border-aximo-border rounded-lg p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="space-y-4"
                    >
                      <div className="mx-auto h-16 w-16 bg-aximo-primary/10 rounded-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-aximo-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-aximo-text">Drop files here or click to upload</h3>
                        <p className="text-aximo-text-secondary">Support for PDF, JPG, PNG files up to 10MB</p>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          Take Photo
                        </Button>
                        <Button className="bg-aximo-primary hover:bg-aximo-primary-hover flex items-center gap-2 relative">
                          <Upload className="h-4 w-4" />
                          Browse Files
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            multiple
                            title="Upload documents"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              if (files.length > 0) {
                                console.log('Files selected:', files);
                                alert(`${files.length} file(s) selected for upload!`);
                              }
                            }}
                          />
                        </Button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['POD Upload', 'CMR Upload', 'Invoice Scan', 'Bill of Lading'].map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 flex-col gap-2 border-aximo-border hover:bg-aximo-card-hover"
                      >
                        <FileText className="h-6 w-6" />
                        <span className="text-sm">{action}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-aximo-text-secondary" />
                  <Input
                    placeholder="Search documents..."
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

              {/* Documents List */}
              <Card className="border-aximo-border bg-aximo-card">
                <CardContent className="p-0">
                  <div className="divide-y divide-aximo-border">
                    {mockDocuments.map((doc, index) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 hover:bg-aximo-card-hover transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-aximo-primary/10 rounded">
                              <FileText className="h-5 w-5 text-aximo-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium text-aximo-text">{doc.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getTypeColor(doc.type)}>{doc.type}</Badge>
                                {doc.jobReference && (
                                  <span className="text-sm text-aximo-text-secondary">
                                    Job: {doc.jobReference}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(doc.status)}
                                <span className="text-sm text-aximo-text-secondary capitalize">
                                  {doc.status}
                                </span>
                              </div>
                              <p className="text-xs text-aximo-text-secondary mt-1">
                                {doc.size} • {doc.uploadDate}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Archive className="h-4 w-4" />
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

            {/* Processed Tab */}
            <TabsContent value="processed">
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle>Successfully Processed Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-aximo-text mb-2">
                      Processing Complete
                    </h3>
                    <p className="text-aximo-text-secondary">
                      All your documents have been successfully processed and are ready for use.
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

export default DocumentScanningPage; 