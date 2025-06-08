import { createHash } from 'crypto';
import { initAuth, createActor } from '../icp.config';

export interface CertificateVerificationResult {
  isVerified: boolean;
  timestamp: string;
  blockNumber: string;
  transactionId: string;
}

// Define the type for the ICP canister result
interface ICPCanisterResult {
  timestamp: string;
  blockNumber: string;
  transactionId: string;
  isVerified?: boolean;
}

export class ICPCertificateService {
  // Generate a hash for the certificate file
  static async generateCertificateHash(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const buffer = event.target?.result as ArrayBuffer;
          const hash = createHash('sha256')
            .update(Buffer.from(buffer))
            .digest('hex');
          resolve(hash);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  }

  // Store certificate hash on ICP
  static async storeOnBlockchain(hash: string): Promise<CertificateVerificationResult> {
    try {
      const authClient = await initAuth();
      const actor = await createActor(authClient);
      
      // Call your ICP canister's storeCertificate method
      const result = await actor.storeCertificate(hash) as ICPCanisterResult;
      
      return {
        isVerified: true,
        timestamp: result.timestamp,
        blockNumber: result.blockNumber,
        transactionId: result.transactionId
      };
    } catch (error) {
      console.error('Error storing certificate on ICP:', error);
      throw error;
    }
  }

  // Verify certificate on ICP
  static async verifyOnBlockchain(hash: string): Promise<CertificateVerificationResult> {
    try {
      const authClient = await initAuth();
      const actor = await createActor(authClient);
      
      // Call your ICP canister's verifyCertificate method
      const result = await actor.verifyCertificate(hash) as ICPCanisterResult;
      
      return {
        isVerified: result.isVerified ?? false,
        timestamp: result.timestamp,
        blockNumber: result.blockNumber,
        transactionId: result.transactionId
      };
    } catch (error) {
      console.error('Error verifying certificate on ICP:', error);
      throw error;
    }
  }
} 