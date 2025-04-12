
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockJobs } from "./jobs-list/mockJobData";
import { JobsTable } from "./jobs-list/JobsTable";
import { EmptyJobsState } from "./jobs-list/EmptyJobsState";
import { JobsFilter } from "./jobs-list/JobsFilter";
import { motion } from "framer-motion";

interface JobsListProps {
  selectedDate: Date;
  openJobCreation: () => void;
}

export default function JobsList({ selectedDate, openJobCreation }: JobsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredJobs = mockJobs
    .filter(job => {
      const jobDate = new Date(job.date);
      const sameDate = 
        jobDate.getDate() === selectedDate.getDate() &&
        jobDate.getMonth() === selectedDate.getMonth() &&
        jobDate.getFullYear() === selectedDate.getFullYear();
        
      const matchesSearch = 
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.destination.toLowerCase().includes(searchTerm) ||
        job.id.toString().includes(searchTerm);
        
      return sameDate && matchesSearch;
    });

  console.log("Current filtered jobs:", filteredJobs.length); // Debug log

  return (
    <Card className="shadow-sm border-[#1EAEDB]/20 bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="pb-3 border-b border-[#1EAEDB]/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <CardTitle className="text-[#1A1F2C]">Jobs List</CardTitle>
          <JobsFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {filteredJobs.length > 0 ? (
          <JobsTable jobs={filteredJobs} />
        ) : (
          <EmptyJobsState 
            selectedDate={selectedDate}
            openJobCreation={openJobCreation}
          />
        )}
      </CardContent>
    </Card>
  );
}
