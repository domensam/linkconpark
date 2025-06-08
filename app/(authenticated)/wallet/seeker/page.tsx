"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Mock data for seeker transactions
const mockTransactions = {
  upcoming: [
    {
      id: 1,
      job: "Construction Site Work",
      company: "ABC Construction",
      amount: 5000,
      date: "2024-02-20",
      status: "Pending",
    },
  ],
  past: [
    {
      id: 2,
      job: "Electrical Work",
      company: "XYZ Electrical",
      amount: 3000,
      date: "2024-02-15",
      status: "Completed",
    },
    {
      id: 3,
      job: "Plumbing Work",
      company: "123 Plumbing",
      amount: 2500,
      date: "2024-02-10",
      status: "Completed",
    },
  ],
}

export default function SeekerWalletPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Manage your earnings and transactions</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
            <h2 className="text-3xl font-bold">₱10,500.00</h2>
          </div>
          <Button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Withdraw
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {mockTransactions.upcoming.map((transaction) => (
            <Link key={transaction.id} href={`/wallet/payment/${transaction.id}`}>
              <Card className="p-4 cursor-pointer">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{transaction.job}</p>
                    <p className="text-sm text-muted-foreground">{transaction.company}</p>
                    <p className="text-sm">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₱{transaction.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{transaction.status}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {mockTransactions.past.map((transaction) => (
            <Link key={transaction.id} href={`/wallet/payment/${transaction.id}`}>
              <Card className="p-4 cursor-pointer">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{transaction.job}</p>
                    <p className="text-sm text-muted-foreground">{transaction.company}</p>
                    <p className="text-sm">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₱{transaction.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{transaction.status}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
