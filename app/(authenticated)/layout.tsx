import type React from "react"
import { AuthenticatedLayout } from "@/components/layouts/authenticated-layout"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, you would get the user type from your auth context/session
  const userType = "seeker" // or "provider"

  return <AuthenticatedLayout userType={userType}>{children}</AuthenticatedLayout>
}

