import { useDeleteSummary, useSummaries } from "@/entities/summary";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const XIcon = (props: Partial<React.SVGProps<SVGSVGElement>>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

export default function RecentSummaries() {
  const { summaries, isLoading } = useSummaries(10);
  const { deleteSummary } = useDeleteSummary();

  if (isLoading) {
    return (
      <div className="h-28 w-full py-4">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <ScrollArea className="flex w-full h-28 overflow-x-auto py-4">
      <div className="flex w-max space-x-2">
        {summaries.map((summary) => (
          <Card key={summary.id} className="flex flex-col">
            <button
              className="rounded-full p-1 hover:bg-gray-100 ml-auto"
              onClick={() => deleteSummary(summary.id)}
            >
              <XIcon className="h-4 w-4" />
            </button>
            <CardContent className="max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap">
              {summary.result}
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
