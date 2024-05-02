import { Skeleton } from "./ui/skeleton";

type Props = {
  text: string;
  loading: boolean;
};

export function ArticleSummary({ text, loading }: Props) {
  return (
    <>
      <h2 className="my-4 text-l font-bold">
        This web app allows you to effectively summarize articles for different
        purposes.
      </h2>
      {!loading ? (
        <div className="mt-4 rounded-md p-4 flex items-center justify-center">
          {text}
        </div>
      ) : (
        <div className="mt-4 rounded-md p-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}
    </>
  );
}
