
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export type FieldType = 'text' | 'number' | 'date' | 'checkbox' | 'select';

export interface CustomField {
  id: string;
  name: string;
  type: FieldType;
  value: any;
  options?: string[];
}

interface CustomFieldsCardProps {
  customFields: CustomField[];
  onChange?: (fields: CustomField[]) => void;
}

export default function CustomFieldsCard({ customFields, onChange }: CustomFieldsCardProps) {
  const handleFieldChange = (id: string, value: any) => {
    if (onChange) {
      const updatedFields = customFields.map(field => 
        field.id === id ? { ...field, value } : field
      );
      onChange(updatedFields);
    }
  };

  return (
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
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
                  />
                ) : field.type === 'date' ? (
                  <Input 
                    type="date" 
                    value={field.value} 
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  />
                ) : (
                  <Input 
                    type={field.type} 
                    value={field.value}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
