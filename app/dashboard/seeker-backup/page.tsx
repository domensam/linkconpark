"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Briefcase,
  Clock,
  DollarSign,
  Star,
  ChevronRight,
  Bell,
  Calendar,
  MessageSquare
} from "lucide-react"

const upcomingJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    salary: "₱80,000-100,000/year",
    type: "Full-time",
    matchScore: 92,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Design Studio",
    salary: "₱600-750/hour",
    type: "Contract",
    matchScore: 88,
  },
]

const notifications = [
  {
    id: 1,
    type: "message",
    content: "New message from Design Studio",
    time: "2 hours ago",
    icon: MessageSquare,
  },
  {
    id: 2,
    type: "calendar",
    content: "Interview scheduled with TechCorp Inc.",
    time: "Tomorrow, 2:00 PM",
    icon: Calendar,
  },
]

export default function SeekerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Jay!</h1>
          <p className="text-muted-foreground">Here's what's happening with your job search</p>
        </div>
        <Button size="icon" variant="outline" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
            3
          </span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Applications</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Interviews</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Saved Jobs</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Salary</p>
              <p className="text-2xl font-bold">$85k</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Profile Completion</h2>
              <p className="text-sm text-muted-foreground">Complete your profile to increase visibility</p>
            </div>
            <Button variant="outline">Complete Profile</Button>
          </div>
          <Progress value={75} className="h-2" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium">Basic Info</p>
              <p className="text-muted-foreground">Completed</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Experience</p>
              <p className="text-muted-foreground">Completed</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Skills</p>
              <p className="text-muted-foreground">In Progress</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Portfolio</p>
              <p className="text-muted-foreground">Not Started</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Matches */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recommended Jobs</h2>
              <Button variant="ghost" className="text-sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-accent/50 hover:bg-accent/70 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                      {job.matchScore}% Match
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-accent/50"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <notification.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{notification.content}</p>
                    <p className="text-sm text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
