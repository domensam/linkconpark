"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award,
  ChevronRight,
  ChevronLeft
} from "lucide-react"

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Experience", icon: Briefcase },
  { id: 3, title: "Education", icon: GraduationCap },
  { id: 4, title: "Skills", icon: Award },
]

export default function SeekerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()
  
  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would typically handle form submission
    // For now, we'll just redirect to the dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <Card className="mx-auto max-w-2xl p-6 backdrop-blur-sm bg-background/80">
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Complete Your Profile</h2>
            <p className="text-muted-foreground">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </p>
            <Progress value={progress} className="mt-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between items-center">
            {steps.map((step) => {
              const Icon = step.icon
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
                  <div className={`
                    p-2 rounded-full border-2 transition-colors
                    ${step.id === currentStep 
                      ? "border-primary bg-primary/10" 
                      : step.id < currentStep
                      ? "border-muted-foreground bg-muted"
                      : "border-muted-foreground/40"}
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium hidden md:block">{step.title}</span>
                </div>
              )
            })}
          </div>

          {/* Form Content */}
          <div className="space-y-4 py-4">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company">Current/Last Company</Label>
                    <Input id="company" placeholder="Company name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="Your role" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="school">School/University</Label>
                    <Input id="school" placeholder="Enter school name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input id="degree" placeholder="Enter your degree" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Input id="skills" placeholder="Enter your key skills" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="years">Years of Experience</Label>
                    <Input id="years" type="number" placeholder="Years of experience" />
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
              {currentStep !== steps.length && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
