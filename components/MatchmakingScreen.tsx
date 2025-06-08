import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MatchmakingScreenProps {
  userType: "seeker" | "provider";
}

export default function MatchmakingScreen({
  userType,
}: MatchmakingScreenProps) {
  const router = useRouter();
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Simulate AI matchmaking process
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 5000); // Redirect after 5 seconds

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(dotsInterval);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-16 w-16 text-primary mx-auto" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            AI is matchmaking you to the perfect{" "}
            {userType === "seeker" ? "job" : "candidate"}
          </h1>
          <p className="text-muted-foreground text-lg">
            Analyzing your profile and preferences{dots}
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150" />
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300" />
          </div>
          <p className="text-sm text-muted-foreground">
            {userType === "seeker"
              ? "Finding opportunities that match your skills and experience"
              : "Searching for qualified professionals that fit your requirements"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
