
import React from 'react';
import { CustomField } from './CustomFieldsCard';
import CustomFieldsCard from './CustomFieldsCard';

interface CustomFieldsTabProps {
  customFields: CustomField[];
  setCustomFields: (fields: CustomField[]) => void;
}

export default function CustomFieldsTab({ customFields, setCustomFields }: CustomFieldsTabProps) {
  return (
    <CustomFieldsCard 
      customFields={customFields}
      onChange={setCustomFields}
    />
  );
}
