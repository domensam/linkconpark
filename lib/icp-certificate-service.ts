import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../certificate_canister/src/declarations/certificate_canister_backend/certificate_canister_backend.did.js";

export interface Certificate {
  hash: string;
  timestamp: bigint;
  owner: string;
}

export class ICPCertificateService {
  private agent: HttpAgent;
  private actor: any;

  constructor() {
    this.agent = new HttpAgent({
      host: process.env.NEXT_PUBLIC_ICP_HOST || "http://localhost:4943",
    });

    // Create actor with the canister ID
    this.actor = Actor.createActor(idlFactory, {
      agent: this.agent,
      canisterId: process.env.NEXT_PUBLIC_CERTIFICATE_CANISTER_ID!,
    });
  }

  async storeCertificate(hash: string): Promise<void> {
    try {
      await this.actor.storeCertificate(hash);
    } catch (error) {
      console.error("Error storing certificate:", error);
      throw error;
    }
  }

  async verifyCertificate(hash: string): Promise<Certificate | null> {
    try {
      const result = await this.actor.verifyCertificate(hash);
      return result[0] ? {
        hash: result[0].hash,
        timestamp: result[0].timestamp,
        owner: result[0].owner.toString(),
      } : null;
    } catch (error) {
      console.error("Error verifying certificate:", error);
      throw error;
    }
  }

  async getCertificates(): Promise<[string, Certificate][]> {
    try {
      const result = await this.actor.getCertificates();
      return result.map(([hash, cert]: [string, any]) => [
        hash,
        {
          hash: cert.hash,
          timestamp: cert.timestamp,
          owner: cert.owner.toString(),
        },
      ]);
    } catch (error) {
      console.error("Error getting certificates:", error);
      throw error;
    }
  }
} 