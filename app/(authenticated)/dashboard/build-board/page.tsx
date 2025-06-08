"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityGraph } from "@/components/build-board/activity-graph";
import {
  ArrowUp,
  ArrowDown,
  BarChart2,
  Users,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Applications",
    value: "156",
    change: "+12%",
    trend: "up",
  },
  {
    title: "Interview Rate",
    value: "32%",
    change: "+4%",
    trend: "up",
  },
  {
    title: "Average Response",
    value: "2.4 days",
    change: "-8%",
    trend: "down",
  },
  {
    title: "Profile Views",
    value: "892",
    change: "+18%",
    trend: "up",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "application",
    title: "Applied to Senior Frontend Developer",
    company: "TechCorp Inc.",
    time: "2 hours ago",
    icon: BarChart2,
  },
  {
    id: 2,
    type: "interview",
    title: "Interview Scheduled",
    company: "Design Studio",
    time: "Yesterday",
    icon: Users,
  },
  {
    id: 3,
    type: "offer",
    title: "Received Job Offer",
    company: "Innovation Labs",
    time: "2 days ago",
    icon: Star,
  },
];

export default function BuildBoardPage() {
  // Generate sample data for the activity graph
  const activityData = Array.from({ length: 365 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    count: Math.floor(Math.random() * 5),
  })).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Build Board</h1>
        <p className="text-muted-foreground">
          Track your job search progress and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
                {stat.trend === "up" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Activity Graph */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Activity Overview</h2>
              <Button variant="ghost" size="sm">
                Last 30 Days
              </Button>
            </div>
            <ActivityGraph data={activityData} />
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Button variant="ghost" className="text-sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-accent/50"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.company}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Skills and Endorsements */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Skills & Endorsements</h2>
              <p className="text-sm text-muted-foreground">
                Track your skill development and endorsements
              </p>
            </div>
            <Button variant="outline">Add Skill</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-accent/50">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">React.js</p>
                <span className="text-sm text-primary">Advanced</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  24 endorsements
                </span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-accent/50">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">TypeScript</p>
                <span className="text-sm text-primary">Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  18 endorsements
                </span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-accent/50">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">UI/UX Design</p>
                <span className="text-sm text-primary">Advanced</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  31 endorsements
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
