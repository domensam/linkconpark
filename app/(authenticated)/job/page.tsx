"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function JobPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Job Details</h1>
        <p className="text-muted-foreground mb-4">
          Please use the job search page to find and view specific job details.
        </p>
        <Button onClick={() => router.push("/job-search")}>
          Go to Job Search
        </Button>
      </Card>
    </div>
  );
}
