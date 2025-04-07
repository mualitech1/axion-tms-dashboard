
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { 
  ArrowLeft, User, Building, Phone, Mail, DollarSign, 
  BarChart3, Calendar, Tag, Clock, Users, History
} from 'lucide-react';
import { initialLeadsData } from './data/pipelineData';
import { Lead, LeadStatus, LeadSource, ActivityType, Activity } from './data/pipelineTypes';
import { formatCurrency } from '@/lib/utils';

// Mock activities for demonstration
const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    leadId: 'lead-1',
    type: ActivityType.NOTE,
    description: 'Initial meeting with Jane to discuss requirements',
    timestamp: '2025-04-02T14:30:00',
    userId: 'user-1'
  },
  {
    id: 'activity-2',
    leadId: 'lead-1',
    type: ActivityType.CALL,
    description: 'Follow-up call to discuss proposal details',
    timestamp: '2025-03-28T11:15:00',
    userId: 'user-1'
  },
  {
    id: 'activity-3',
    leadId: 'lead-1',
    type: ActivityType.EMAIL,
    description: 'Sent pricing information and service details',
    timestamp: '2025-03-25T09:45:00',
    userId: 'user-2'
  },
  {
    id: 'activity-4',
    leadId: 'lead-1',
    type: ActivityType.STAGE_CHANGED,
    description: 'Moved from Initial Contact to Discovery',
    timestamp: '2025-03-22T16:30:00',
    userId: 'system'
  }
];

// Custom field types
type FieldType = 'text' | 'number' | 'date' | 'checkbox' | 'select';

interface CustomField {
  id: string;
  name: string;
  type: FieldType;
  value: any;
  options?: string[]; // For select fields
}

export default function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityText, setActivityText] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: 'field1', name: 'Decision Maker', type: 'text', value: 'Sarah Johnson' },
    { id: 'field2', name: 'Budget Confirmed', type: 'checkbox', value: true },
    { id: 'field3', name: 'Next Meeting', type: 'date', value: '2025-04-15' }
  ]);
  
  // Setup form
  const form = useForm<Lead>({
    defaultValues: lead || undefined
  });

  // Fetch lead data
  useEffect(() => {
    // In a real app, this would be an API call
    const foundLead = initialLeadsData.find(lead => lead.id === id);
    if (foundLead) {
      setLead(foundLead);
      form.reset(foundLead);
    }
    
    // Get activities
    setActivities(mockActivities.filter(activity => activity.leadId === id));
  }, [id, form]);
  
  const handleSave = (data: Lead) => {
    console.log('Saving lead:', data);
    setLead(data);
  };
  
  const addActivity = () => {
    if (!activityText.trim() || !lead) return;
    
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      leadId: lead.id,
      type: ActivityType.NOTE,
      description: activityText,
      timestamp: new Date().toISOString(),
      userId: 'current-user' // In a real app, this would come from auth
    };
    
    setActivities([newActivity, ...activities]);
    setActivityText('');
  };
  
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.NOTE: return <Tag className="h-4 w-4 mr-2" />;
      case ActivityType.EMAIL: return <Mail className="h-4 w-4 mr-2" />;
      case ActivityType.CALL: return <Phone className="h-4 w-4 mr-2" />;
      case ActivityType.MEETING: return <Users className="h-4 w-4 mr-2" />;
      case ActivityType.STAGE_CHANGED: return <BarChart3 className="h-4 w-4 mr-2" />;
      default: return <History className="h-4 w-4 mr-2" />;
    }
  };
  
  if (!lead) {
    return (
      <MainLayout title="Lead Not Found">
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-bold mb-4">Lead Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The lead you're looking for doesn't exist or has been deleted.
          </p>
          <Link to="/pipeline/board">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pipeline
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title={`Lead: ${lead.company}`}>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Link to="/pipeline/board">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pipeline
            </Button>
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{lead.company}</h1>
            <div className="flex items-center text-muted-foreground">
              <span className="mr-2">{lead.contact}, {lead.title}</span>
              <Badge variant={lead.status === LeadStatus.ACTIVE ? "default" : "destructive"}>
                {lead.status}
              </Badge>
            </div>
          </div>
          <div className="space-x-2">
            <Button variant="outline">Edit Lead</Button>
            <Button>Schedule Meeting</Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Lead Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="custom">Custom Fields</TabsTrigger>
        </TabsList>
        
        {/* Lead Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...form}>
                  <form className="space-y-4" onSubmit={form.handleSubmit(handleSave)}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                                <Input {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <Input {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                <Input {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                <Input {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Deal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Deal Value</p>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      <p className="text-2xl font-bold">{formatCurrency(lead.value)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Probability</p>
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1 text-muted-foreground" />
                      <p className="text-2xl font-bold">{lead.probability}%</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm font-medium">Current Stage</p>
                    <Badge variant="outline" className="mt-1">{lead.stage}</Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Lead Source</p>
                    <Badge variant="outline" className="mt-1">{lead.source}</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm font-medium">Created Date</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{new Date(lead.created).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Last Activity</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{new Date(lead.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Enter notes about this lead..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <Button onClick={() => form.handleSubmit(handleSave)()}>
                  Save Notes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a note, log a call, or record an activity..."
                  value={activityText}
                  onChange={(e) => setActivityText(e.target.value)}
                  className="flex-1"
                />
                <Button className="self-end" onClick={addActivity}>Add</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l border-border space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="relative pb-4">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-background border border-border">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{ActivityType[activity.type]}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Custom Fields Tab */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Custom Fields</CardTitle>
              <Button variant="outline" size="sm">Add Field</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customFields.map((field) => (
                  <div key={field.id} className="grid grid-cols-2 gap-4 items-center">
                    <div className="font-medium">{field.name}</div>
                    <div>
                      {field.type === 'checkbox' ? (
                        <Checkbox checked={field.value} />
                      ) : field.type === 'date' ? (
                        <Input type="date" value={field.value} />
                      ) : (
                        <Input type={field.type} value={field.value} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
