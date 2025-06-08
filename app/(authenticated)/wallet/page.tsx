"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  History,
  CreditCard,
  DollarSign,
  ChevronRight,
  Building2,
} from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "received",
    amount: 2500,
    description: "Payment from TechCorp Inc.",
    date: "Today",
    time: "2:30 PM",
  },
  {
    id: 2,
    type: "sent",
    amount: 150,
    description: "Withdrawal to Bank Account",
    date: "Yesterday",
    time: "4:15 PM",
  },
  {
    id: 3,
    type: "received",
    amount: 1800,
    description: "Payment from Design Studio",
    date: "Feb 14",
    time: "11:30 AM",
  },
]

const cards = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "09/24",
    isDefault: false,
  },
]

export default function WalletPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">Manage your payments and transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Money
          </Button>
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Send Money
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7 xl:grid-cols-12">
        {/* Balance Cards */}
        <div className="space-y-6 md:col-span-4 xl:col-span-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Available Balance */}
            <Card className="p-6 bg-primary text-primary-foreground">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    <span className="font-medium">Available Balance</span>
                  </div>
                  <Button variant="secondary" size="sm">
                    Withdraw
                  </Button>
                </div>
                <div>
                  <p className="text-3xl font-bold">$4,150.00</p>
                  <p className="text-sm opacity-90">+$2,500 this month</p>
                </div>
              </div>
            </Card>

            {/* Pending Balance */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    <span className="font-medium">Pending Balance</span>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold">$850.00</p>
                  <p className="text-sm text-muted-foreground">Available in 2-3 days</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment Methods */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Payment Methods</h2>
                <Button variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </div>

              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-accent/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-background">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {card.type} ending in {card.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {card.expiry}
                        </p>
                      </div>
                    </div>
                    {card.isDefault && (
                      <span className="text-sm text-primary">Default</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="p-6 md:col-span-3 xl:col-span-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-accent/50"
                >
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "received"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {transaction.type === "received" ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span>{transaction.time}</span>
                        </div>
                      </div>
                      <p
                        className={`font-medium ${
                          transaction.type === "received"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "received" ? "+" : "-"}$
                        {transaction.amount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
