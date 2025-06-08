"use client"

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

// Remove static jobDetails. Load from local storage.
export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const storedJobsStr = localStorage.getItem("jobs") || "[]";
    const storedJobs = JSON.parse(storedJobsStr);
    const foundJob = storedJobs.find((j: any) => String(j.id) === id);
    setJob(foundJob);
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
        <p className="text-muted-foreground">Job ID: {id}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Job Information</h3>
            <div className="flex items-center text-sm">
              <span className="font-medium">Company:</span>
              <span className="ml-2 text-muted-foreground">{job.company || "N/A"}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="font-medium">Location:</span>
              <span className="ml-2 text-muted-foreground">{job.location || "N/A"}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="font-medium">Salary:</span>
              <span className="ml-2 text-muted-foreground">{job.salary || "N/A"}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="font-medium">Duration:</span>
              <span className="ml-2 text-muted-foreground">{job.startDate || "N/A"} - {job.endDate || "N/A"}</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Job Description</h3>
            <p className="text-muted-foreground">{job.description || "No description available."}</p>
          </div>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Skills Required</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              {job.skillsRequired?.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              )) || <li>No skills required.</li>}
            </ul>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Job Preview</h3>
            <p className="text-muted-foreground">Images:</p>
            <div className="flex space-x-2">
              {job.previewImages?.map((image: string, index: number) => (
                <img key={index} src={image} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover" />
              )) || <p>No images available.</p>}
            </div>
            <p className="text-muted-foreground">Documents:</p>
            <ul className="list-disc pl-5 text-muted-foreground">
              {job.documents?.map((document: string, index: number) => (
                <li key={index}>
                  <a href={document} target="_blank" rel="noopener noreferrer" className="underline">
                    Document {index + 1}
                  </a>
                </li>
              )) || <li>No documents available.</li>}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
