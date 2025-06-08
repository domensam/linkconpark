"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  FileText,
  Upload,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Briefcase,
  Mail,
  Lock,
  FileCheck,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";
import MatchmakingScreen from "@/components/MatchmakingScreen";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps = [
  { id: 1, title: "Company Info", icon: Building2 },
  { id: 2, title: "Account Setup", icon: FileText },
  { id: 3, title: "Documents", icon: Upload },
  { id: 4, title: "Preferences", icon: Clock },
];

export default function ProviderOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const router = useRouter();

  const progress = (currentStep / steps.length) * 100;

  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    address: "",
    lineOfWork: "",
    email: "",
    password: "",
    hiringType: "",
    budgetRange: "",
    workLocation: "",
    workSchedule: "",
    experienceLevel: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically handle form submission
    localStorage.setItem("providerProfile", JSON.stringify(formData));
    // Show matchmaking screen instead of direct redirect
    setShowMatchmaking(true);
  };

  if (showMatchmaking) {
    return <MatchmakingScreen userType="provider" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <Card className="mx-auto max-w-2xl p-6 backdrop-blur-sm bg-background/80">
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Complete Company Profile
            </h2>
            <p className="text-muted-foreground">
              Step {currentStep} of {steps.length}:{" "}
              {steps[currentStep - 1].title}
            </p>
            <Progress value={progress} className="mt-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between items-center">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center space-y-2 ${
                    step.id === currentStep
                      ? "text-primary"
                      : step.id < currentStep
                      ? "text-muted-foreground"
                      : "text-muted-foreground/40"
                  }`}
                >
                  <div
                    className={`
                    p-2 rounded-full border-2 transition-colors
                    ${
                      step.id === currentStep
                        ? "border-primary bg-primary/10"
                        : step.id < currentStep
                        ? "border-muted-foreground bg-muted"
                        : "border-muted-foreground/40"
                    }
                  `}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium hidden md:block">
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="space-y-4 py-4">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyName"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">City/Province</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter city or province"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter complete address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lineOfWork">Line of Work</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lineOfWork"
                        placeholder="e.g. Construction, Manufacturing"
                        value={formData.lineOfWork}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Company Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter company email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="govId">Government ID</Label>
                    <div className="relative">
                      <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="govId"
                        type="file"
                        accept="image/*,.pdf"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload a valid government ID (PDF or Image)
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="permits">Company Permits</Label>
                    <div className="relative">
                      <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="permits"
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        className="pl-10"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload business permits and licenses
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hiringType">Hiring Type</Label>
                    <Select
                      onValueChange={(value: string) =>
                        handleSelectChange("hiringType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hiring type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="budgetRange">Budget Range</Label>
                    <Select
                      onValueChange={(value: string) =>
                        handleSelectChange("budgetRange", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-20k">Below ₱20,000</SelectItem>
                        <SelectItem value="20k-30k">
                          ₱20,000 - ₱30,000
                        </SelectItem>
                        <SelectItem value="30k-40k">
                          ₱30,000 - ₱40,000
                        </SelectItem>
                        <SelectItem value="40k-50k">
                          ₱40,000 - ₱50,000
                        </SelectItem>
                        <SelectItem value="above-50k">Above ₱50,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="workLocation">Work Location</Label>
                    <Select
                      onValueChange={(value: string) =>
                        handleSelectChange("workLocation", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select work location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="workSchedule">Work Schedule</Label>
                    <Select
                      onValueChange={(value: string) =>
                        handleSelectChange("workSchedule", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select work schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day-shift">
                          Day Shift (6AM - 3PM)
                        </SelectItem>
                        <SelectItem value="mid-shift">
                          Mid Shift (2PM - 11PM)
                        </SelectItem>
                        <SelectItem value="night-shift">
                          Night Shift (10PM - 7AM)
                        </SelectItem>
                        <SelectItem value="flexible">Flexible Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="experienceLevel">
                      Required Experience Level
                    </Label>
                    <Select
                      onValueChange={(value: string) =>
                        handleSelectChange("experienceLevel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">
                          Entry Level (0-2 years)
                        </SelectItem>
                        <SelectItem value="mid">
                          Mid Level (2-5 years)
                        </SelectItem>
                        <SelectItem value="senior">
                          Senior Level (5+ years)
                        </SelectItem>
                        <SelectItem value="expert">
                          Expert Level (8+ years)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              onClick={currentStep === steps.length ? handleSubmit : nextStep}
            >
              {currentStep === steps.length ? "Submit" : "Next"}
              {currentStep !== steps.length && (
                <ChevronRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
