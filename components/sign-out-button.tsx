"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SignOutButtonProps {
  className?: string;
}

export function SignOutButton({ className }: SignOutButtonProps) {
  const router = useRouter();

  const handleSignOut = () => {
    // Perform sign-out logic here (e.g., clear cookies, local storage)
    // For now, just redirect to the home page
    router.push("/");
  };

  return (
    <Button onClick={handleSignOut} className={cn(className)}>
      Sign Out
    </Button>
  );
}
