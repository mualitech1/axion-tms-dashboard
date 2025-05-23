import { useState, useEffect } from 'react';
import { Search, Book, Brain, Tag, Clock, Download, Plus, Filter, MoreHorizontal } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for knowledge entries
const knowledgeData = [
  {
    id: '1',
    title: 'Optimal Route Planning for Heavy Loads',
    content: 'When planning routes for heavy loads (>20 tons), prioritize highways with recent maintenance records and avoid routes with bridges that have weight restrictions below 30 tons.',
    tags: ['routing', 'heavy-load', 'safety'],
    category: 'operational',
    createdAt: new Date('2023-02-15T10:30:00'),
    updatedAt: new Date('2023-04-20T14:45:00'),
    sourceType: 'manual',
    author: {
      name: 'John Smith',
      avatar: '/avatars/john-smith.jpg',
      role: 'Operations Manager'
    }
  },
  {
    id: '2',
    title: 'Customs Documentation for Cross-Border Shipping',
    content: 'All cross-border shipments require complete CMR documentation, commercial invoice, packing list, and export declaration. For hazardous materials, include ADR documentation and safety data sheets.',
    tags: ['international', 'customs', 'documentation'],
    category: 'regulatory',
    createdAt: new Date('2023-03-10T09:15:00'),
    updatedAt: new Date('2023-03-10T09:15:00'),
    sourceType: 'manual',
    author: {
      name: 'Sarah Wilson',
      avatar: '/avatars/sarah-wilson.jpg',
      role: 'Compliance Officer'
    }
  },
  {
    id: '3',
    title: 'Seasonal Demand Patterns for Agricultural Products',
    content: 'Agricultural transport demand increases by 40% during harvest seasons (April-May for spring crops, September-October for fall crops). Allocate 30% more vehicles during these periods.',
    tags: ['seasonal', 'agriculture', 'capacity-planning'],
    category: 'operational',
    createdAt: new Date('2023-05-22T11:20:00'),
    updatedAt: new Date('2023-06-15T16:30:00'),
    sourceType: 'automated',
    confidenceScore: 0.92,
    author: {
      name: 'TMS Analytics',
      avatar: '/avatars/system.jpg',
      role: 'AI System'
    }
  },
  {
    id: '4',
    title: 'Driver Rest Requirements for Long Haul Routes',
    content: 'Drivers must take a 45-minute break after 4.5 hours of driving, and cannot exceed 9 hours of driving in a single day. For multi-day routes, ensure 11 hours of consecutive rest between shifts.',
    tags: ['compliance', 'driver-safety', 'regulations'],
    category: 'regulatory',
    createdAt: new Date('2023-01-05T13:45:00'),
    updatedAt: new Date('2023-01-05T13:45:00'),
    sourceType: 'manual',
    author: {
      name: 'Michael Brown',
      avatar: '/avatars/michael-brown.jpg',
      role: 'Safety Director'
    }
  },
  {
    id: '5',
    title: 'Invoice Processing Optimization',
    content: 'For clients with established credit, invoices processed within 24 hours of delivery completion show a 35% faster payment rate compared to invoices delayed by 3+ days.',
    tags: ['invoicing', 'finance', 'optimization'],
    category: 'financial',
    createdAt: new Date('2023-06-30T10:15:00'),
    updatedAt: new Date('2023-07-02T09:30:00'),
    sourceType: 'learning',
    confidenceScore: 0.89,
    author: {
      name: 'TMS Analytics',
      avatar: '/avatars/system.jpg',
      role: 'AI System'
    }
  },
];

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeView, setActiveView] = useState('cards');
  
  // Filter knowledge entries based on search term and category
  const filteredKnowledge = knowledgeData.filter(entry => {
    const matchesSearch = 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      activeCategory === 'all' || entry.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white">Knowledge Base</h1>
            <p className="text-gray-400">Centralized intelligence system for transport operations</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-aximo-dark border-aximo-border text-aximo-text-primary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-aximo-primary hover:bg-aximo-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Knowledge
            </Button>
          </div>
        </div>
        
        <div className="bg-aximo-dark rounded-lg border border-aximo-border shadow-card overflow-hidden">
          <div className="p-4 border-b border-aximo-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search knowledge base..."
                  className="pl-10 w-full bg-aximo-darker border-aximo-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 bg-aximo-dark border-aximo-border text-aximo-text-primary">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <div className="border-r border-aximo-border h-6 mx-2"></div>
                <div className="flex rounded-md overflow-hidden border border-aximo-border">
                  <Button 
                    variant={activeView === 'cards' ? 'default' : 'ghost'} 
                    size="sm" 
                    className={`rounded-none h-9 ${activeView === 'cards' ? 'bg-aximo-primary' : 'bg-aximo-dark text-aximo-text-primary'}`}
                    onClick={() => setActiveView('cards')}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
                      <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
                      <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
                      <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
                      <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" />
                    </svg>
                    Cards
                  </Button>
                  <Button 
                    variant={activeView === 'table' ? 'default' : 'ghost'} 
                    size="sm" 
                    className={`rounded-none h-9 ${activeView === 'table' ? 'bg-aximo-primary' : 'bg-aximo-dark text-aximo-text-primary'}`}
                    onClick={() => setActiveView('table')}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
                      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Table
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <div className="px-4 border-b border-aximo-border">
              <TabsList className="bg-transparent border-b-0 p-0 h-auto">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-aximo-primary data-[state=active]:text-aximo-primary rounded-none py-3 px-4 text-aximo-text-secondary"
                >
                  All Knowledge
                </TabsTrigger>
                <TabsTrigger 
                  value="operational" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-aximo-primary data-[state=active]:text-aximo-primary rounded-none py-3 px-4 text-aximo-text-secondary"
                >
                  Operational
                </TabsTrigger>
                <TabsTrigger 
                  value="regulatory" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-aximo-primary data-[state=active]:text-aximo-primary rounded-none py-3 px-4 text-aximo-text-secondary"
                >
                  Regulatory
                </TabsTrigger>
                <TabsTrigger 
                  value="financial" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-aximo-primary data-[state=active]:text-aximo-primary rounded-none py-3 px-4 text-aximo-text-secondary"
                >
                  Financial
                </TabsTrigger>
                <TabsTrigger 
                  value="technical" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-aximo-primary data-[state=active]:text-aximo-primary rounded-none py-3 px-4 text-aximo-text-secondary"
                >
                  Technical
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="p-0 mt-0">
              {activeView === 'cards' ? (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredKnowledge.map(entry => (
                    <Card key={entry.id} className="border border-aximo-border bg-aximo-darker hover:bg-aximo-dark/50 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-medium text-white">{entry.title}</CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-aximo-dark border-aximo-border">
                              <DropdownMenuItem className="text-aximo-text-primary hover:bg-aximo-darker">Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-aximo-text-primary hover:bg-aximo-darker">Share</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500 hover:bg-aximo-darker">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {entry.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="bg-aximo-primary/10 text-aximo-primary border-aximo-primary/30 hover:bg-aximo-primary/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-gray-400 text-sm">{entry.content}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-2 pb-2 border-t border-aximo-border mt-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={entry.author.avatar} />
                            <AvatarFallback className="bg-aximo-primary/20 text-aximo-primary text-xs">
                              {entry.author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs text-aximo-text-primary">{entry.author.name}</p>
                            <p className="text-xs text-gray-500">{entry.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">{formatDate(entry.updatedAt)}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow className="border-b border-aximo-border bg-aximo-darker">
                        <TableHead className="text-aximo-text-primary">Title</TableHead>
                        <TableHead className="text-aximo-text-primary">Tags</TableHead>
                        <TableHead className="text-aximo-text-primary">Source</TableHead>
                        <TableHead className="text-aximo-text-primary">Updated</TableHead>
                        <TableHead className="text-aximo-text-primary text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredKnowledge.map(entry => (
                        <TableRow key={entry.id} className="border-b border-aximo-border hover:bg-aximo-dark/50">
                          <TableCell className="font-medium text-white">
                            <div className="flex items-center">
                              {entry.sourceType === 'automated' ? (
                                <Brain className="h-4 w-4 text-teal-500 mr-2" />
                              ) : entry.sourceType === 'learning' ? (
                                <Brain className="h-4 w-4 text-purple-500 mr-2" />
                              ) : (
                                <Book className="h-4 w-4 text-aximo-primary mr-2" />
                              )}
                              {entry.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 flex-wrap">
                              {entry.tags.slice(0, 2).map(tag => (
                                <Badge key={tag} variant="outline" className="bg-aximo-primary/10 text-aximo-primary border-aximo-primary/30">
                                  {tag}
                                </Badge>
                              ))}
                              {entry.tags.length > 2 && (
                                <Badge variant="outline" className="bg-aximo-darker text-gray-400 border-aximo-border">
                                  +{entry.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={entry.author.avatar} />
                                <AvatarFallback className="bg-aximo-primary/20 text-aximo-primary text-xs">
                                  {entry.author.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-xs text-aximo-text-primary">{entry.author.name}</p>
                                <p className="text-xs text-gray-500">{entry.author.role}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-400">
                            {formatDate(entry.updatedAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-aximo-dark border-aximo-border">
                                <DropdownMenuItem className="text-aximo-text-primary hover:bg-aximo-darker">View</DropdownMenuItem>
                                <DropdownMenuItem className="text-aximo-text-primary hover:bg-aximo-darker">Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-aximo-text-primary hover:bg-aximo-darker">Share</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500 hover:bg-aximo-darker">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            {/* These tabs will use the same filteredKnowledge based on the activeCategory state */}
            <TabsContent value="operational" className="p-0 mt-0">
              {/* Content will be filtered by the activeCategory state */}
            </TabsContent>
            <TabsContent value="regulatory" className="p-0 mt-0">
              {/* Content will be filtered by the activeCategory state */}
            </TabsContent>
            <TabsContent value="financial" className="p-0 mt-0">
              {/* Content will be filtered by the activeCategory state */}
            </TabsContent>
            <TabsContent value="technical" className="p-0 mt-0">
              {/* Content will be filtered by the activeCategory state */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 