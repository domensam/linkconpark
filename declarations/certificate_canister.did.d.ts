import { IDL } from "@dfinity/candid";
import { ActorSubclass } from "@dfinity/agent";

export interface CertificateCanister {
  storeCertificate: (hash: string) => Promise<{
    isVerified: boolean;
    timestamp: string;
    blockNumber: string;
    transactionId: string;
  }>;
  
  verifyCertificate: (hash: string) => Promise<{
    isVerified: boolean;
    timestamp: string;
    blockNumber: string;
    transactionId: string;
  }>;
}

export const idlFactory: IDL.InterfaceFactory;
export type CertificateCanisterActor = ActorSubclass<CertificateCanister>; 