"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Calendar,
  HomeIcon,
  Menu,
  MessageSquare,
  Search,
  Wallet,
  User,
  PlusIcon,
  X,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignOutButton } from "../sign-out-button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  userType: "seeker" | "provider";
}

export function AuthenticatedLayout({
  children,
  userType,
}: AuthenticatedLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems =
    userType === "seeker"
      ? [
          { icon: HomeIcon, label: "Home", href: "/dashboard/seeker" },
          { icon: Calendar, label: "Calendar", href: "/calendar" },
          { icon: Search, label: "Search Jobs", href: "/job-search" },
          { icon: MessageSquare, label: "Chat", href: "/dashboard/chat" },
          { icon: Wallet, label: "Wallet", href: "/wallet" },
          { icon: User, label: "Profile", href: "/profile/seeker" },
        ]
      : [
          { icon: HomeIcon, label: "Home", href: "/dashboard/provider" },
          { icon: Calendar, label: "Calendar", href: "/calendar" },
          { icon: PlusIcon, label: "Post Job", href: "/post-job" },
          { icon: MessageSquare, label: "Chat", href: "/dashboard/chat" },
          { icon: Wallet, label: "Wallet", href: "/wallet" },
          { icon: User, label: "Profile", href: "/profile/provider" },
        ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-lg border-b shadow-sm"
            : "bg-white"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between mb-4">
                        <Link href="/" className="flex items-center space-x-2">
                          <span className="font-bold text-xl">LinkConPark</span>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src="/placeholder-avatar.jpg"
                            alt="User"
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">
                            john@example.com
                          </p>
                        </div>
                      </div>
                    </div>
                    <nav className="flex-1 overflow-y-auto">
                      <div className="p-4">
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          Navigation
                        </div>
                        <ul className="space-y-1">
                          {navigationItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                                    isActive
                                      ? "bg-primary text-primary-foreground"
                                      : "hover:bg-gray-100"
                                  )}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <item.icon className="h-5 w-5" />
                                  <span>{item.label}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </nav>
                    <div className="p-4 border-t space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </Button>
                      <SignOutButton className="w-full justify-start" />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl hidden md:inline-block">
                  LinkConPark
                </span>
                <span className="font-bold text-xl md:hidden">LCP</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${userType}`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton className="w-full" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={cn(
            "container mx-auto px-4 overflow-hidden transition-all duration-300",
            isSearchOpen ? "h-16 opacity-100" : "h-0 opacity-0"
          )}
        >
          <div className="py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 bg-gray-50"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="rounded-xl bg-white shadow-sm border p-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigationItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
