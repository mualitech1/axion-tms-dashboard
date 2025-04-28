
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, ChevronUp, ArrowDownToLine, LineChart } from 'lucide-react';

interface DataRow {
  id: string;
  [key: string]: any;
}

interface BusinessIntelligenceTablesProps {
  title: string;
  description: string;
  categories: string[];
  data: {
    [key: string]: DataRow[];
  };
  headers: {
    [key: string]: {
      id: string;
      label: string;
      sortable?: boolean;
    }[];
  };
}

export function BusinessIntelligenceTables({ 
  title, 
  description, 
  categories,
  data,
  headers
}: BusinessIntelligenceTablesProps) {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = data[activeTab]?.filter(row => {
    return Object.values(row).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) || [];

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-muted-foreground" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <ArrowDownToLine className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={categories[0]} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search data..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {headers[category].map(header => (
                        <TableHead 
                          key={header.id}
                          className={header.sortable ? "cursor-pointer" : ""}
                          onClick={() => header.sortable && handleSort(header.id)}
                        >
                          <div className="flex items-center">
                            {header.label}
                            {header.sortable && sortConfig && sortConfig.key === header.id && (
                              sortConfig.direction === 'asc' ? 
                                <ChevronUp className="ml-1 h-4 w-4" /> : 
                                <ChevronDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedData.length > 0 ? (
                      sortedData.map(row => (
                        <TableRow key={row.id}>
                          {headers[category].map(header => (
                            <TableCell key={`${row.id}-${header.id}`}>
                              {row[header.id]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={headers[category].length} className="text-center py-4">
                          No data found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
