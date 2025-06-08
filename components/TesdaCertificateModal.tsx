"use client";
import React, { useState } from "react";
import { createHash } from "crypto";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileCheck, Loader2, AlertCircle } from "lucide-react";
import { ICPCertificateService } from "@/lib/icp-certificate-service";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TesdaCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCertificateAdded?: (certificate: {
    name: string;
    hash: string;
    verified: boolean;
  }) => void;
}

export default function TesdaCertificateModal({
  isOpen,
  onClose,
  onCertificateAdded,
}: TesdaCertificateModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [certificateName, setCertificateName] = useState("");
  const [certificateHash, setCertificateHash] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "checking" | "not_found" | "verified"
  >("idle");
  const [certificateService] = useState(() => new ICPCertificateService());

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsUploading(true);
    setVerificationStatus("idle");
    setIsVerified(false);

    try {
      // Generate hash for the certificate
      const hash = await generateFileHash(selectedFile);
      setCertificateHash(hash);

      // Check if the certificate exists on the blockchain
      setVerificationStatus("checking");
      const existingCertificate = await certificateService.verifyCertificate(
        hash
      );

      if (existingCertificate) {
        setVerificationStatus("verified");
        setIsVerified(true);
      } else {
        setVerificationStatus("not_found");
        setIsVerified(false);
      }
    } catch (error) {
      console.error("Error processing certificate:", error);
      setVerificationStatus("idle");
    } finally {
      setIsUploading(false);
    }
  };

  const generateFileHash = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target?.result;
        if (buffer) {
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

  const handleConfirm = () => {
    if (isVerified && certificateName && certificateHash) {
      onCertificateAdded?.({
        name: certificateName,
        hash: certificateHash,
        verified: true,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add TESDA Certificate</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="certificateName">Certificate Name</Label>
              <Input
                id="certificateName"
                value={certificateName}
                onChange={(e) => setCertificateName(e.target.value)}
                placeholder="Enter certificate name"
              />
            </div>

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
                <span className="ml-2">Verifying certificate...</span>
              </div>
            )}

            {certificateHash && verificationStatus === "not_found" && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This certificate is not found on the blockchain. Please ensure
                  you have a valid certificate.
                </AlertDescription>
              </Alert>
            )}

            {certificateHash && verificationStatus === "verified" && (
              <Alert>
                <AlertDescription className="text-green-600">
                  ✓ Certificate verified on the blockchain
                </AlertDescription>
              </Alert>
            )}

            {certificateHash && (
              <div className="text-sm text-muted-foreground">
                Certificate Hash: {certificateHash.substring(0, 16)}...
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!isVerified || !certificateName}
            >
              Add Certificate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
