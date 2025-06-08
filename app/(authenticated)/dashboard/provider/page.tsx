"use client"

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProviderDashboard() {
  const [activeProjects, setActiveProjects] = useState<Array<any>>([]);

  useEffect(() => {
    // For provider, we load jobs from the same local storage key "jobs"
    const storedJobsStr = localStorage.getItem("jobs") || "[]";
    const storedJobs = JSON.parse(storedJobsStr);
    setActiveProjects(storedJobs);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Here are your active projects</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeProjects.length > 0 ? (
          activeProjects.map((project) => (
            <Link key={project.id} href={`/dashboard/job/${project.id}`}>
              <Card className="p-6 cursor-pointer hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{project.title}</h3>
                    {/* Map company to client where applicable */}
                    <p className="text-sm text-muted-foreground">
                      Client: {project.company || "N/A"}
                    </p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                {project.previewImage && (
                  <img
                    src={project.previewImage}
                    alt="Project Preview"
                    className="mt-2 w-full h-24 object-cover"
                  />
                )}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Location:</span>
                    <span className="ml-2 text-muted-foreground">
                      {project.location || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Budget:</span>
                    <span className="ml-2 text-muted-foreground">
                      {project.budget || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Duration:</span>
                    <span className="ml-2 text-muted-foreground">
                      {project.startDate || "N/A"} - {project.endDate || "N/A"}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <p>No active projects found.</p>
        )}
      </div>
    </div>
  );
}
