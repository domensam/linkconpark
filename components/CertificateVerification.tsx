import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface CertificateVerificationProps {
  certificateHash?: string;
  onVerificationComplete: (isVerified: boolean) => void;
}

// Mock blockchain verification service
const mockBlockchainService = {
  verifyCertificate: async (
    hash: string
  ): Promise<{
    isVerified: boolean;
    timestamp: string;
    blockNumber: string;
    transactionId: string;
  }> => {
    // Simulate blockchain verification delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock verification result
    return {
      isVerified: true,
      timestamp: new Date().toISOString(),
      blockNumber: "0x" + Math.random().toString(16).slice(2, 10),
      transactionId: "0x" + Math.random().toString(16).slice(2, 42),
    };
  },
};

export function CertificateVerification({
  certificateHash,
  onVerificationComplete,
}: CertificateVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isVerified: boolean;
    timestamp: string;
    blockNumber: string;
    transactionId: string;
  } | null>(null);

  const handleVerify = async () => {
    if (!certificateHash) return;

    setIsVerifying(true);
    try {
      const result = await mockBlockchainService.verifyCertificate(
        certificateHash
      );
      setVerificationResult(result);
      onVerificationComplete(result.isVerified);
    } catch (error) {
      console.error("Verification failed:", error);
      setVerificationResult({
        isVerified: false,
        timestamp: new Date().toISOString(),
        blockNumber: "N/A",
        transactionId: "N/A",
      });
      onVerificationComplete(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Certificate Verification</h3>
        <p className="text-sm text-muted-foreground">
          Verify the authenticity of the uploaded certificate using blockchain
          technology
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>Certificate Hash</Label>
          <Input
            value={certificateHash || ""}
            readOnly
            placeholder="Certificate hash will appear here after upload"
          />
        </div>

        <Button
          onClick={handleVerify}
          disabled={!certificateHash || isVerifying}
          className="w-full"
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Certificate"
          )}
        </Button>

        {verificationResult && (
          <div className="space-y-4 p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              {verificationResult.isVerified ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">
                {verificationResult.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timestamp:</span>
                <span>
                  {new Date(verificationResult.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Block Number:</span>
                <span className="font-mono">
                  {verificationResult.blockNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-xs">
                  {verificationResult.transactionId}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
