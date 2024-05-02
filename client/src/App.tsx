import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  ArticleSummarizerForm,
  ArticleSummarizerFormSchema,
} from "./components/ArticleSummarizerForm";
import { ArticleSummary } from "./components/ArticleSummary";
import { useCreateSummary } from "./entities/summary";
import { useState } from "react";
import { Summary } from "./types";
import RecentSummaries from "./components/RecentSummaries";

export default function App() {
  const [currentSummary, setCurrentSummary] = useState<Summary | null>(null);

  const { createSummary, loading: createLoading } = useCreateSummary();

  const handleSubmit = async (data: ArticleSummarizerFormSchema) => {
    const summary = await createSummary(data);
    setCurrentSummary(summary);
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center p-4 gap-4">
      <Card className="w-1/4 h-full">
        <CardHeader>
          <CardTitle>
            Article Summarizer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleSummarizerForm
            onSubmit={handleSubmit}
            loading={createLoading}
          />
        </CardContent>
      </Card>
      <div className="w-3/4 flex flex-col h-full">
        <Card className="flex-1">
          <CardContent>
            <ArticleSummary
              text={currentSummary?.result ?? ""}
              loading={createLoading}
            />
          </CardContent>
        </Card>
        <RecentSummaries />
      </div>
    </main>
  );
}
