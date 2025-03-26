
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, UserCircle, Shield, Activity } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { userData } from './data/userData';
import { User } from './types';
import UserPermissionsSection from './components/UserPermissionsSection';

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundUser = userData.find(u => u.id === parseInt(id));
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, [id]);
  
  if (!user) {
    return (
      <MainLayout title="User Details">
        <div className="flex items-center justify-center h-64">
          <p className="text-tms-gray-500">User not found</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title={`User: ${user.name}`}>
      <div className="animate-fade-in">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="outline" size="icon">
              <Link to="/users">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold text-tms-gray-800">User Profile</h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="w-full md:w-1/3">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={`https://avatars.dicebear.com/api/initials/${user.name.replace(/\s+/g, '-')}.svg`} alt={user.name} />
                    <AvatarFallback className="bg-tms-blue-light text-tms-blue text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-tms-gray-800">{user.name}</h2>
                  <p className="text-tms-gray-500 mb-2">{user.email}</p>
                  <Badge 
                    className={`mb-4 ${
                      user.status === 'Active' ? 'bg-tms-green-light text-tms-green' : 
                      'bg-tms-gray-200 text-tms-gray-600'
                    }`}
                  >
                    {user.status}
                  </Badge>
                  
                  <div className="w-full space-y-4">
                    <div className="flex justify-between py-2 border-b border-tms-gray-200">
                      <span className="font-medium text-tms-gray-600">Role</span>
                      <span className="text-tms-gray-800">{user.role}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-tms-gray-200">
                      <span className="font-medium text-tms-gray-600">Department</span>
                      <span className="text-tms-gray-800">{user.department}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-tms-gray-200">
                      <span className="font-medium text-tms-gray-600">Last Active</span>
                      <span className="text-tms-gray-800">
                        {new Date(user.lastActive).toLocaleString('en-GB', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex w-full mt-6 gap-2">
                    <Button className="w-full" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      className="w-full" 
                      variant={user.status === 'Active' ? 'destructive' : 'default'}
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="overview">
                    <UserCircle className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="permissions">
                    <Shield className="h-4 w-4 mr-2" />
                    Permissions
                  </TabsTrigger>
                  <TabsTrigger value="activity" asChild>
                    <Link to={`/users/logs/${user.id}`}>
                      <Activity className="h-4 w-4 mr-2" />
                      Activity
                    </Link>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Overview</CardTitle>
                      <CardDescription>Key information about this user's account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-md font-medium mb-2">Account Summary</h3>
                          <p className="text-tms-gray-600">
                            {user.name} is a {user.role.toLowerCase()} in the {user.department} department. 
                            They have been active within the last {Math.ceil((new Date().getTime() - new Date(user.lastActive).getTime()) / (1000 * 60 * 60 * 24))} days.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-md font-medium mb-2">System Access</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-tms-gray-100 p-4 rounded-md">
                              <p className="text-sm text-tms-gray-500">Last login</p>
                              <p className="font-medium">
                                {new Date(user.lastActive).toLocaleString('en-GB', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                            <div className="bg-tms-gray-100 p-4 rounded-md">
                              <p className="text-sm text-tms-gray-500">Account created</p>
                              <p className="font-medium">
                                {new Date(new Date(user.lastActive).getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="permissions">
                  <UserPermissionsSection userId={user.id} userRole={user.role} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
