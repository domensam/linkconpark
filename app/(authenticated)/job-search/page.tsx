"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Filter,
  Star,
  ChevronRight,
  Building2,
} from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "₱120,000-150,000/year",
    experience: "5+ years",
    posted: "2 days ago",
    matchScore: 92,
    skills: ["React", "TypeScript", "Next.js"],
    isFeatured: true,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Contract",
    salary: "₱800-1,000/hour",
    experience: "3+ years",
    posted: "1 day ago",
    matchScore: 88,
    skills: ["Figma", "UI Design", "User Research"],
    isFeatured: false,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Innovation Labs",
    location: "New York, NY",
    type: "Full-time",
    salary: "₱100,000-130,000/year",
    experience: "4+ years",
    posted: "3 days ago",
    matchScore: 85,
    skills: ["Node.js", "React", "PostgreSQL"],
    isFeatured: false,
  },
]

const filters = [
  {
    name: "Job Type",
    options: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  {
    name: "Experience",
    options: ["Entry Level", "Mid Level", "Senior", "Lead"],
  },
  {
    name: "Location",
    options: ["Remote", "Hybrid", "On-site"],
  },
  {
    name: "Salary Range",
    options: ["₱0-50,000", "₱50,000-100,000", "₱100,000-150,000", "₱150,000+"],
  },
]

export default function JobSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find Your Next Role</h1>
        <p className="text-muted-foreground">Browse through thousands of job opportunities</p>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, or keywords"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 md:flex-none">
              <MapPin className="mr-2 h-4 w-4" />
              Location
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button className="flex-1 md:flex-none">Search</Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Filters */}
        <Card className="p-6 md:col-span-3">
          <div className="space-y-6">
            <h2 className="font-semibold">Filters</h2>
            {filters.map((filter) => (
              <div key={filter.name} className="space-y-3">
                <h3 className="text-sm font-medium">{filter.name}</h3>
                <div className="space-y-2">
                  {filter.options.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Job Listings */}
        <div className="space-y-4 md:col-span-9">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className={`p-6 ${
                job.isFeatured ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{job.title}</h3>
                        {job.isFeatured && (
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span className="text-sm">{job.company}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                        {job.matchScore}% Match
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.posted}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded-full bg-accent text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-2 md:w-32">
                  <Button className="flex-1">Apply</Button>
                  <Button variant="outline" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <div className="flex justify-center">
            <Button variant="outline">
              Load More
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
