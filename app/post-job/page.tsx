"use client";
import {
  CalendarIcon,
  MapPin,
  DollarSignIcon,
  User,
  Settings,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TesdaCertificateModal from "@/components/TesdaCertificateModal";
import { useState } from "react";
import { AuthenticatedLayout } from "@/components/layouts/authenticated-layout";

const PostJobPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handler for file upload
  const handlePreviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AuthenticatedLayout userType="provider">
      <div className="container">
        <h1>Publish a new Project</h1>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="projectName">Project Name</Label>
            <div className="flex items-center">
              <Input
                type="text"
                id="projectName"
                placeholder="Project Name"
                className="h-9"
              />
              <Button variant="ghost" size="icon" className="ml-2">
                +
              </Button>
              <Button variant="ghost" size="icon" className="ml-2">
                <Camera className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              className="h-24"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="startDate">Date of Start (MM/DD/YY)</Label>
            <div className="flex items-center">
              <Input
                type="date"
                id="startDate"
                placeholder="Date of Start (MM/DD/YY)"
                className="h-9"
              />
              <CalendarIcon className="h-5 w-5 ml-2" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Site/Project Location</Label>
            <div className="flex items-center">
              <Input
                type="text"
                id="location"
                placeholder="Site/Project Location"
                className="h-9"
              />
              <MapPin className="h-5 w-5 ml-2" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="budget">Price/Budget Range (PHP)</Label>
            <div className="flex items-center">
              <Input
                type="text"
                id="budget"
                placeholder="Price/Budget Range (PHP)"
                className="h-9"
              />
              <DollarSignIcon className="h-5 w-5 ml-2" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Pick workers needed:</Label>
            <div className="flex items-center">
              <span>Pick workers needed:</span>
              {/* Implement worker selection buttons/dropdowns here */}
              <User className="h-5 w-5 ml-2" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Pick preferred TESDA Certificates:</Label>
            <div className="flex items-center">
              <span>Pick preferred TESDA Certificates:</span>
              {/* Implement TESDA certificate selection buttons/dropdowns here */}
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={openModal}
              >
                <Settings className="h-5 w-5 mr-2" />
                Select Certificates
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jobPreview">Job Preview Image</Label>
            <Input
              type="file"
              id="jobPreview"
              onChange={handlePreviewImageChange}
              className="h-9"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </div>
          <Button className="bg-green-500 text-white">PUBLISH</Button>
        </div>
        <TesdaCertificateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCertificateAdded={(certificate) => {
            console.log("Certificate added:", certificate);
          }}
        />
      </div>
    </AuthenticatedLayout>
  );
};

export default PostJobPage;
