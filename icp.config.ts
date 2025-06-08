import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

// Configuration for your ICP canister
export const ICP_CONFIG = {
  // Replace with your canister ID
  canisterId: process.env.NEXT_PUBLIC_ICP_CANISTER_ID || "",
  // Replace with your host URL (use localhost for development)
  host: process.env.NEXT_PUBLIC_ICP_HOST || "http://localhost:8000",
};

// Initialize the auth client
export const initAuth = async () => {
  const authClient = await AuthClient.create();
  return authClient;
};

// Create an agent for making calls to the canister
export const createAgent = async (authClient: AuthClient) => {
  const agent = new HttpAgent({
    host: ICP_CONFIG.host,
    identity: authClient.getIdentity(),
  });

  // Only fetch root key in development
  if (process.env.NODE_ENV === "development") {
    await agent.fetchRootKey();
  }

  return agent;
};

// Create an actor for interacting with your canister
export const createActor = async (authClient: AuthClient) => {
  const agent = await createAgent(authClient);
  
  // Import your canister's interface description
  const idlFactory = await import("./declarations/certificate_canister.did.js");
  
  return Actor.createActor(idlFactory.idlFactory, {
    agent,
    canisterId: ICP_CONFIG.canisterId,
  });
}; 