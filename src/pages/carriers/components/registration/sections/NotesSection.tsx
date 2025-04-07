
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "../FormSection";
import { RegistrationFormValues } from "../RegistrationFormSchema";

interface NotesSectionProps {
  form: UseFormReturn<RegistrationFormValues>;
  onChange: (field: string, value: any) => void;
}

export function NotesSection({ form, onChange }: NotesSectionProps) {
  return (
    <FormSection title="Additional Information">
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes</FormLabel>
            <FormControl>
              <Textarea 
                {...field}
                rows={4}
                onChange={(e) => {
                  field.onChange(e);
                  onChange("notes", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
}
