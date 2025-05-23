import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';

export default function CustomerTableSkeleton() {
  const rows = Array.from({ length: 6 }, (_, i) => i);
  
  return (
    <Card className="shadow-md border-indigo-50 overflow-hidden rounded-xl dark:bg-indigo-950/20 dark:border-indigo-800/30">
      <CardHeader className="pb-0 border-b border-indigo-50 dark:border-indigo-800/30 bg-indigo-50/50 dark:bg-indigo-900/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-7 w-48 bg-indigo-200/40 dark:bg-indigo-700/40" />
            <Skeleton className="h-4 w-32 mt-2 bg-indigo-200/40 dark:bg-indigo-700/40" />
          </div>
          
          <div className="flex gap-2">
            <Skeleton className="h-9 w-48 bg-indigo-200/40 dark:bg-indigo-700/40" />
            <Skeleton className="h-9 w-24 bg-indigo-200/40 dark:bg-indigo-700/40" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-indigo-900/20">
            <TableRow className="border-b border-indigo-50/50 dark:border-indigo-800/30">
              <TableHead className="w-[280px]">
                <Skeleton className="h-5 w-20 bg-indigo-200/40 dark:bg-indigo-700/40" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-16 bg-indigo-200/40 dark:bg-indigo-700/40" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-16 bg-indigo-200/40 dark:bg-indigo-700/40" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-5 w-20 ml-auto bg-indigo-200/40 dark:bg-indigo-700/40" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-24 bg-indigo-200/40 dark:bg-indigo-700/40" />
              </TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow 
                key={row}
                className="animate-pulse border-b border-indigo-50/30 dark:border-indigo-800/20"
              >
                <TableCell>
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full mr-3 bg-indigo-200/40 dark:bg-indigo-700/40" />
                    <div>
                      <Skeleton className="h-5 w-36 bg-indigo-200/40 dark:bg-indigo-700/40" />
                      <Skeleton className="h-4 w-24 mt-1 bg-indigo-200/40 dark:bg-indigo-700/40" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-28 bg-indigo-200/40 dark:bg-indigo-700/40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-full bg-indigo-200/40 dark:bg-indigo-700/40" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-5 w-20 ml-auto bg-indigo-200/40 dark:bg-indigo-700/40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24 bg-indigo-200/40 dark:bg-indigo-700/40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-md bg-indigo-200/40 dark:bg-indigo-700/40 mx-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 