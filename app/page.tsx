"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

export default function UserTypePage() {
  const router = useRouter();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-12 text-center"
        >
          <motion.div variants={item} className="space-y-4">
            <Image
              src="/linkconpark-icon+title.png"
              alt="LinkConPark"
              width={160}
              height={48}
              className="h-12 w-auto mx-auto hover:scale-105 transition-transform duration-300"
              priority
            />
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
              Your Skills, Your Future
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Connect with top talent or find your next opportunity in our
              modern skills marketplace
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto"
          >
            <Card
              className="group relative overflow-hidden p-6 backdrop-blur-sm bg-background/60 hover:bg-background/80 transition-colors border-primary/10 hover:border-primary cursor-pointer"
              onClick={() => router.push("/onboarding/seeker")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Find Work</h2>
                <p className="text-muted-foreground">
                  Showcase your skills and connect with businesses looking for
                  talent
                </p>
                <Button
                  variant="ghost"
                  className="group-hover:text-primary transition-colors"
                >
                  Get Started →
                </Button>
              </div>
            </Card>

            <Card
              className="group relative overflow-hidden p-6 backdrop-blur-sm bg-background/60 hover:bg-background/80 transition-colors border-primary/10 hover:border-primary cursor-pointer"
              onClick={() => router.push("/onboarding/provider")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Hire Talent</h2>
                <p className="text-muted-foreground">
                  Find skilled professionals to help grow your business
                </p>
                <Button
                  variant="ghost"
                  className="group-hover:text-primary transition-colors"
                >
                  Get Started →
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-background/60 backdrop-blur-sm p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">10k+</h3>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">95%</h3>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">24/7</h3>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
