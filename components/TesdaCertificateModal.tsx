"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileCheck, Loader2 } from "lucide-react";
import { CertificateVerification } from "./CertificateVerification";
import { CertificateService } from "@/lib/certificate-service";

interface TesdaCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TesdaCertificateModal({
  isOpen,
  onClose,
}: TesdaCertificateModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [certificateHash, setCertificateHash] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsUploading(true);

    try {
      // Generate hash for the certificate
      const hash = await CertificateService.generateCertificateHash(
        selectedFile
      );
      setCertificateHash(hash);

      // Store hash on blockchain (mock)
      await CertificateService.storeOnBlockchain(hash);
    } catch (error) {
      console.error("Error processing certificate:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleVerificationComplete = (verified: boolean) => {
    setIsVerified(verified);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>TESDA Certificate Verification</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="certificate">Upload TESDA Certificate</Label>
              <div className="relative">
                <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="certificate"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="pl-10"
                  disabled={isUploading}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Upload your TESDA certificate (PDF or Image)
              </p>
            </div>

            {isUploading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2">Processing certificate...</span>
              </div>
            )}

            {certificateHash && (
              <CertificateVerification
                certificateHash={certificateHash}
                onVerificationComplete={handleVerificationComplete}
              />
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose} disabled={!isVerified}>
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
