
import React from 'react';

interface FormSectionHeaderProps {
  title: string;
}

const FormSectionHeader = ({ title }: FormSectionHeaderProps) => {
  return <h3 className="font-medium text-lg">{title}</h3>;
};

export default FormSectionHeader;
