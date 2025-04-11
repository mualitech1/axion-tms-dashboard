
import { useMemo, useState } from 'react';
import { User } from '../types';

interface UseUserFilteringProps {
  users: User[];
  searchTerm: string;
  roleFilter: string[];
  statusFilter: string[];
}

export const useUserFiltering = ({ 
  users, 
  searchTerm, 
  roleFilter, 
  statusFilter 
}: UseUserFilteringProps) => {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role);
        
        const matchesStatus = statusFilter.length === 0 || statusFilter.includes(user.status);
        
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        
        if (sortField === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortField === 'email') {
          comparison = a.email.localeCompare(b.email);
        } else if (sortField === 'role') {
          comparison = a.role.localeCompare(b.role);
        } else if (sortField === 'lastLogin') {
          const dateA = a.lastLogin ? new Date(a.lastLogin).getTime() : 
                       (a.lastActive ? new Date(a.lastActive).getTime() : 0);
          const dateB = b.lastLogin ? new Date(b.lastLogin).getTime() : 
                       (b.lastActive ? new Date(b.lastActive).getTime() : 0);
          comparison = dateA - dateB;
        } else if (sortField === 'status') {
          comparison = a.status.localeCompare(b.status);
        }
        
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [users, searchTerm, sortField, sortDirection, roleFilter, statusFilter]);
  
  return {
    filteredUsers,
    sortField,
    sortDirection,
    handleSort,
  };
};
