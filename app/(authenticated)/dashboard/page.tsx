"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";

// Mock data for active jobs/projects
const mockJobs = [
  {
    id: 1,
    title: "Construction Site Worker",
    company: "ABC Construction",
    location: "Manila",
    salary: "PHP 500-800/day",
    status: "In Progress",
    startDate: "2024-02-20",
    endDate: "2024-03-20",
    progress: 65,
    teamSize: 12,
  },
  {
    id: 2,
    title: "Electrician",
    company: "XYZ Electrical Services",
    location: "Quezon City",
    salary: "PHP 1,000/day",
    status: "Starting Soon",
    startDate: "2024-02-25",
    endDate: "2024-03-10",
    progress: 0,
    teamSize: 4,
  },
];

// Mock stats data
const stats = [
  {
    title: "Total Earnings",
    value: "PHP 45,000",
    change: "+12%",
    icon: DollarSign,
  },
  {
    title: "Active Projects",
    value: "4",
    change: "+2",
    icon: Briefcase,
  },
  {
    title: "Completion Rate",
    value: "94%",
    change: "+3%",
    icon: TrendingUp,
  },
  {
    title: "Team Members",
    value: "16",
    change: "+5",
    icon: Users,
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, Jay!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="btn-modern">
            View Calendar
            <Calendar className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 hover-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Active Projects */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Active Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {mockJobs.map((job) => (
            <Card key={job.id} className="p-6 hover-card">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.company}
                    </p>
                  </div>
                  <Badge
                    variant={
                      job.status === "In Progress" ? "default" : "secondary"
                    }
                    className="rounded-full px-3"
                  >
                    {job.status}
                  </Badge>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.startDate} - {job.endDate}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {job.teamSize} team members
                  </div>
                </div>

                {job.status === "In Progress" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">
                        {job.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-2">
                  <Button variant="outline" className="btn-modern">
                    View Details
                  </Button>
                  <Button className="btn-modern">
                    {job.status === "In Progress"
                      ? "Track Time"
                      : "Start Project"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
