
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Search } from "lucide-react";

interface JobsFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function JobsFilter({ searchTerm, setSearchTerm }: JobsFilterProps) {
  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <InputWithIcon
        icon={Search}
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-[250px]"
      />
    </div>
  );
}
