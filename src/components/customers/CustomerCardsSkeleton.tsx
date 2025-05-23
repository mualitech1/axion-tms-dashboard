import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function CustomerCardsSkeleton() {
  const cards = Array.from({ length: 6 }, (_, i) => i);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card 
          key={card} 
          className="animate-pulse border-indigo-100 dark:border-indigo-800/30 transition-all duration-300 shadow-sm overflow-hidden flex flex-col"
        >
          <CardHeader className="pb-2 flex flex-row items-start justify-between">
            <div>
              <Skeleton className="h-12 w-12 rounded-full bg-indigo-200/40 dark:bg-indigo-700/40" />
            </div>
            <div>
              <Skeleton className="h-6 w-16 rounded-full bg-indigo-200/40 dark:bg-indigo-700/40" />
            </div>
          </CardHeader>
          <CardContent className="flex-grow pb-2">
            <Skeleton className="h-6 w-48 mb-1 bg-indigo-200/40 dark:bg-indigo-700/40" />
            <Skeleton className="h-4 w-32 mb-4 bg-indigo-200/40 dark:bg-indigo-700/40" />
            
            <div className="mt-3 space-y-3">
              <Skeleton className="h-4 w-full bg-indigo-200/40 dark:bg-indigo-700/40" />
              <Skeleton className="h-4 w-full bg-indigo-200/40 dark:bg-indigo-700/40" />
              <Skeleton className="h-4 w-full bg-indigo-200/40 dark:bg-indigo-700/40" />
              <Skeleton className="h-4 w-full bg-indigo-200/40 dark:bg-indigo-700/40" />
              <Skeleton className="h-4 w-full bg-indigo-200/40 dark:bg-indigo-700/40" />
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-between">
            <Skeleton className="h-9 w-full bg-indigo-200/40 dark:bg-indigo-700/40 rounded-md" />
            <Skeleton className="h-9 w-9 ml-2 bg-indigo-200/40 dark:bg-indigo-700/40 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 