"use client";

import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Edit2,
  Plus,
  Star,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import TesdaCertificateModal from "@/components/TesdaCertificateModal";
import {
  ICPCertificateService,
  Certificate,
} from "@/lib/icp-certificate-service";
import { useState, useRef } from "react";
import { createHash } from "crypto";

interface Skill {
  name: string;
  level: string;
  endorsements: number;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
  achievements: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  verified?: boolean;
  hash?: string;
  file?: File;
}

interface SeekerProfilePageProps {}

const SeekerProfilePage: React.FC<SeekerProfilePageProps> = () => {
  const [editMode, setEditMode] = React.useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] =
    React.useState(false);
  const [certificateService] = React.useState(
    () => new ICPCertificateService()
  );
  const [certifications, setCertifications] = React.useState<Certification[]>([
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2023",
      verified: true,
    },
    {
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      year: "2022",
      verified: true,
    },
  ]);
  const [verifyingHash, setVerifyingHash] = React.useState("");
  const [verificationResult, setVerificationResult] = React.useState<
    Certificate | null | undefined
  >();
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [generatedHash, setGeneratedHash] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const skills: Skill[] = [
    { name: "React", level: "Advanced", endorsements: 24 },
    { name: "TypeScript", level: "Intermediate", endorsements: 18 },
    { name: "Node.js", level: "Advanced", endorsements: 21 },
    { name: "UI/UX Design", level: "Intermediate", endorsements: 15 },
    { name: "Next.js", level: "Advanced", endorsements: 19 },
  ];

  const experience: Experience[] = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description:
        "Led the frontend development team in building modern web applications using React and Next.js.",
    },
    {
      title: "Web Developer",
      company: "Digital Solutions",
      period: "2020 - 2022",
      description:
        "Developed and maintained client websites using modern JavaScript frameworks.",
    },
  ];

  const education: Education[] = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      year: "2020",
      achievements: "Graduated with honors, Dean's Lister",
    },
  ];

  const handleAddCertification = () => {
    setIsCertificateModalOpen(true);
  };

  const handleCertificateAdded = (certificate: {
    name: string;
    hash: string;
    verified: boolean;
  }) => {
    setCertifications((prev) => [
      ...prev,
      {
        name: certificate.name,
        issuer: "TESDA",
        year: new Date().getFullYear().toString(),
        verified: certificate.verified,
        hash: certificate.hash,
      },
    ]);
  };

  const handleVerifyCertificate = async (hash: string) => {
    try {
      const result = await certificateService.verifyCertificate(hash);
      setVerificationResult(result);

      if (result) {
        // Update the certification's verified status
        setCertifications((prev) =>
          prev.map((cert) =>
            cert.hash === hash ? { ...cert, verified: true } : cert
          )
        );
      } else {
        // If not found on blockchain, try to store it
        await handleStoreCertificate(hash);
        alert("Certificate stored on blockchain. Please verify again.");
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      setVerificationResult(null);
      alert("Error verifying certificate. Please try again.");
    }
  };

  const generateFileHash = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target?.result;
        if (buffer) {
          // Convert ArrayBuffer to Buffer
          const uint8Array = new Uint8Array(buffer as ArrayBuffer);
          const hash = createHash("sha256").update(uint8Array).digest("hex");
          resolve(hash);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(file);
    try {
      const hash = await generateFileHash(file);
      setGeneratedHash(hash);

      // Add to certifications list as unverified
      setCertifications((prev) => [
        ...prev,
        {
          name: file.name,
          issuer: "TESDA",
          year: new Date().getFullYear().toString(),
          verified: false, // Start as unverified
          hash: hash,
          file: file,
        },
      ]);

      // Try to verify immediately
      const verificationResult = await certificateService.verifyCertificate(
        hash
      );
      if (verificationResult) {
        // If it exists on the blockchain, mark as verified
        setCertifications((prev) =>
          prev.map((cert) =>
            cert.hash === hash ? { ...cert, verified: true } : cert
          )
        );
      } else {
        // If it doesn't exist, store it on the blockchain
        await handleStoreCertificate(hash);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Error processing file. Please try again.");
    } finally {
      setUploadingFile(null);
    }
  };

  const handleStoreCertificate = async (hash: string) => {
    try {
      await certificateService.storeCertificate(hash);
    } catch (error) {
      console.error("Error storing certificate:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl">
      {/* Profile Header */}
      <Card className="p-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <p className="text-muted-foreground">
                    Senior Frontend Developer
                  </p>
                </div>
                <Button onClick={() => setEditMode(!editMode)}>
                  {editMode ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>

              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Manila, Philippines</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+63 912 345 6789</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  Portfolio
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#888888"
                      fillRule="evenodd"
                      d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.5 10.5 0 0 1 12 6.32a10.5 10.5 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"
                    />
                  </svg>
                  GitHub
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#888888"
                      fillRule="evenodd"
                      d="M22.037 22h-4.152v-6.496c0-1.55-.026-3.542-2.157-3.542c-2.16 0-2.49 1.688-2.49 3.43V22H9.09V8.64h3.98v1.827h.058c.553-1.05 1.908-2.158 3.928-2.158c4.204 0 4.98 2.766 4.98 6.364zM4.409 6.816A2.407 2.407 0 0 1 2 4.407a2.408 2.408 0 1 1 2.41 2.408M6.486 22H2.33V8.64h4.156z"
                    />
                  </svg>
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* About Section */}
      <Card className="p-6">
        <CardHeader>
          <h2 className="text-xl font-semibold mb-4">About Me</h2>
        </CardHeader>
        <CardContent>
          {editMode ? (
            <Textarea
              className="min-h-[200px]"
              defaultValue="Passionate frontend developer with 5+ years of experience in building modern web applications. Specialized in React and Next.js development with a strong focus on user experience and performance optimization."
            />
          ) : (
            <p className="text-muted-foreground">
              Passionate frontend developer with 5+ years of experience in
              building modern web applications. Specialized in React and Next.js
              development with a strong focus on user experience and performance
              optimization.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="p-6">
        <CardHeader>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Skills & Endorsements</h2>
            {editMode && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-accent/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{skill.name}</h3>
                  <Badge variant="secondary">{skill.level}</Badge>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm">
                    {skill.endorsements} endorsements
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card className="p-6">
        <CardHeader>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Experience</h2>
            {editMode && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="border-b last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold">{exp.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.period}
                    </p>
                  </div>
                  {editMode && (
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="mt-4 text-muted-foreground">{exp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="p-6">
        <CardHeader>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Education</h2>
            {editMode && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="border-b last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold">{edu.degree}</h3>
                    </div>
                    <p className="text-muted-foreground">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                  {editMode && (
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="mt-4 text-muted-foreground">{edu.achievements}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card className="p-6">
        <CardHeader>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Certifications</h2>
            {editMode && (
              <Button onClick={handleAddCertification}>
                <Plus className="h-4 w-4 mr-2" />
                Add Certificate
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground">{cert.year}</p>
                  {cert.hash && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Hash: {cert.hash.substring(0, 8)}...
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {cert.verified ? (
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Unverified</Badge>
                  )}
                  {editMode && !cert.verified && cert.hash && (
                    <Button
                      onClick={() => handleVerifyCertificate(cert.hash!)}
                      disabled={!cert.hash}
                    >
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <TesdaCertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        onCertificateAdded={handleCertificateAdded}
      />
    </div>
  );
};

export default SeekerProfilePage;
