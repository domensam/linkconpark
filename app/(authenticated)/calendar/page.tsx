"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  Video,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const events = [
  {
    id: 1,
    title: "Technical Interview",
    company: "TechCorp Inc.",
    type: "Interview",
    date: "Today",
    time: "2:00 PM",
    isVideo: true,
  },
  {
    id: 2,
    title: "Portfolio Review",
    company: "Design Studio",
    type: "Review",
    date: "Tomorrow",
    time: "11:00 AM",
    isVideo: true,
  },
  {
    id: 3,
    title: "Follow-up Meeting",
    company: "Innovation Labs",
    type: "Meeting",
    date: "Feb 18",
    time: "3:30 PM",
    isVideo: false,
  },
]

const upcomingDates = [
  { date: "15", day: "Mon", hasEvent: true },
  { date: "16", day: "Tue", hasEvent: true },
  { date: "17", day: "Wed", hasEvent: false },
  { date: "18", day: "Thu", hasEvent: true },
  { date: "19", day: "Fri", hasEvent: false },
  { date: "20", day: "Sat", hasEvent: false },
  { date: "21", day: "Sun", hasEvent: false },
]

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("15")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your interviews and meetings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-7 xl:grid-cols-12">
        {/* Calendar View */}
        <Card className="p-6 md:col-span-4 xl:col-span-8">
          <div className="space-y-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">February 2025</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Date Picker */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {upcomingDates.map((date) => (
                <button
                  key={date.date}
                  onClick={() => setSelectedDate(date.date)}
                  className={`flex flex-col items-center min-w-[4rem] p-3 rounded-lg transition-colors ${
                    selectedDate === date.date
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <span className="text-sm font-medium">{date.day}</span>
                  <span className="text-2xl font-bold">{date.date}</span>
                  {date.hasEvent && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                      selectedDate === date.date ? "bg-primary-foreground" : "bg-primary"
                    }`} />
                  )}
                </button>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square p-2 border rounded-lg hover:bg-accent/50 cursor-pointer"
                >
                  <span className="text-sm">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Events List */}
        <Card className="p-6 md:col-span-3 xl:col-span-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg bg-accent/50 hover:bg-accent/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {event.isVideo && (
                        <div className="p-1.5 rounded-full bg-primary/10">
                          <Video className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>4 Attendees</span>
                    </div>
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
