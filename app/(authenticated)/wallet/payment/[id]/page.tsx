"use client"

import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"

// For demonstration, a mock payment details lookup.
const mockPaymentDetails: Record<number, any> = {
  1: { id: 1, job: "Construction Site Work", company: "ABC Construction", amount: 5000, date: "2024-02-20", status: "Pending", description: "Deposit for ongoing work.", paymentProvider: "Maya" },
  2: { id: 2, job: "Electrical Work", company: "XYZ Electrical", amount: 3000, date: "2024-02-15", status: "Completed", description: "Full payment received.", paymentProvider: "GCash" },
  3: { id: 3, job: "Plumbing Work", company: "123 Plumbing", amount: 2500, date: "2024-02-10", status: "Completed", description: "Payment completed successfully.", paymentProvider: "Bank Transfer" },
  4: { id: 4, job: "New Project Deposit", company: "Innovative Builders", amount: 8000, date: "2024-03-05", status: "Pending", description: "Initial deposit for new project.", paymentProvider: "Cash" },
  5: { id: 5, job: "Project Final Payment", company: "Quality Contractors", amount: 12000, date: "2024-02-28", status: "Completed", description: "Final settlement payment.", paymentProvider: "Paypal" },
}

export default function PaymentDetailsPage() {
  const params = useParams() as { id: string }
  const paymentId = Number(params.id)
  const details = mockPaymentDetails[paymentId]

  if (!details) {
    return <p>Payment not found.</p>
  }

  return (
    <Card className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div>
        <strong>Job:</strong> {details.job}
      </div>
      <div>
        <strong>Company:</strong> {details.company}
      </div>
      <div>
        <strong>Amount:</strong> ₱{details.amount.toLocaleString()}
      </div>
      <div>
        <strong>Date:</strong> {details.date}
      </div>
      <div>
        <strong>Status:</strong> {details.status}
      </div>
      <div>
        <strong>Description:</strong> {details.description}
      </div>
      <div>
        <strong>Payment Provider:</strong> {details.paymentProvider}
      </div>
    </Card>
  )
}
