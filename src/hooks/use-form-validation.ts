import { useState, useCallback } from 'react';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

/**
 * Custom hook for form validation using Zod
 * Provides consistent form validation across the application
 */
export function useFormValidation<T extends z.ZodType<unknown, z.ZodTypeDef, unknown>>(
  schema: T, 
  initialValues?: Partial<z.infer<T>>
) {
  type FormDataType = z.infer<T>;
  
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState<Partial<FormDataType>>(initialValues || {});
  const [isValidating, setIsValidating] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  
  /**
   * Validate the entire form data against the schema
   * @returns true if valid, false otherwise
   */
  const validateForm = useCallback((data: Partial<FormDataType>): data is FormDataType => {
    setIsValidating(true);
    try {
      schema.parse(data);
      setErrors({});
      setIsValidating(false);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string[]> = {};
        
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path].push(err.message);
        });
        
        setErrors(formattedErrors);
        
        // Show toast with the first error for better UX
        const firstError = error.errors[0];
        if (firstError) {
          toast({
            title: "Validation Error",
            description: firstError.message,
            variant: "destructive",
          });
        }
      }
      setIsValidating(false);
      return false;
    }
  }, [schema]);
  
  /**
   * Validate a single field
   * @param field - The field name to validate
   * @param value - The value to validate
   * @returns true if valid, false otherwise
   */
  const validateField = useCallback((field: keyof FormDataType, value: unknown): boolean => {
    try {
      // Create a partial data object for validation
      const partialData = { [field]: value } as Partial<FormDataType>;
      
      // Use safeParse to avoid throwing errors
      const result = schema.safeParse(partialData);
      
      if (result.success) {
        // Clear errors for this field
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[field as string];
          return updated;
        });
        return true;
      } else {
        // Set errors for this field
        const fieldErrors = result.error.errors
          .filter((err) => err.path.includes(field as string))
          .map((err) => err.message);
        
        if (fieldErrors.length > 0) {
          setErrors((prev) => ({
            ...prev,
            [field as string]: fieldErrors,
          }));
        }
        return false;
      }
    } catch (error) {
      console.error('Field validation error:', error);
      return false;
    }
  }, [schema]);
  
  /**
   * Handle form input changes with real-time validation
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle different input types
    let inputValue: unknown = value;
    if (type === 'checkbox') {
      inputValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      inputValue = value === '' ? undefined : Number(value);
    }
    
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
    
    // Mark field as touched
    setTouchedFields((prev) => new Set(prev).add(name));
    
    // Validate the field only if it has been touched
    if (touchedFields.has(name) || value !== '') {
      validateField(name as keyof FormDataType, inputValue);
    }
  }, [validateField, touchedFields]);
  
  /**
   * Handle field blur events
   */
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Mark field as touched
    setTouchedFields((prev) => new Set(prev).add(name));
    
    // Validate on blur
    let inputValue: unknown = value;
    if (type === 'checkbox') {
      inputValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      inputValue = value === '' ? undefined : Number(value);
    }
    
    validateField(name as keyof FormDataType, inputValue);
  }, [validateField]);
  
  /**
   * Reset the form data and errors
   */
  const resetForm = useCallback(() => {
    setFormData({});
    setErrors({});
    setTouchedFields(new Set());
    setIsValidating(false);
  }, []);
  
  /**
   * Set form values in bulk
   */
  const setFormValues = useCallback((values: Partial<FormDataType>) => {
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
  }, []);
  
  /**
   * Get error message for a specific field
   */
  const getFieldError = useCallback((fieldName: string): string | undefined => {
    const fieldErrors = errors[fieldName];
    return fieldErrors && fieldErrors.length > 0 ? fieldErrors[0] : undefined;
  }, [errors]);
  
  /**
   * Check if a field has been touched
   */
  const isFieldTouched = useCallback((fieldName: string): boolean => {
    return touchedFields.has(fieldName);
  }, [touchedFields]);
  
  /**
   * Check if form is valid
   */
  const isFormValid = useCallback((): boolean => {
    return Object.keys(errors).length === 0 && Object.keys(formData).length > 0;
  }, [errors, formData]);
  
  return {
    formData,
    errors,
    isValidating,
    touchedFields,
    validateForm,
    validateField,
    handleChange,
    handleBlur,
    resetForm,
    setFormValues,
    getFieldError,
    isFieldTouched,
    isFormValid,
  };
} 