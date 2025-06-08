import { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface InternetIdentityLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (principal: string) => void;
  userType: "seeker" | "provider";
}

export function InternetIdentityLogin({
  isOpen,
  onClose,
  onSuccess,
  userType,
}: InternetIdentityLoginProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const authClient = await AuthClient.create();

      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toText();
          onSuccess(principal);
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
            Sign in to Continue
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              {userType === "seeker"
                ? "Sign in to start your journey as a skilled professional"
                : "Sign in to begin hiring top talent for your business"}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              {isLoading ? "Connecting..." : "Sign in with Internet Identity"}
            </Button>
          </motion.div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Secure, decentralized authentication powered by Internet Computer
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
