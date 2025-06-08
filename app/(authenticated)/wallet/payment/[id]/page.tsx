import { Card } from "@/components/ui/card";

// This function is required for static export
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

// @ts-ignore: Next.js static export type workaround
export default function PaymentPage({ params }) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
        <p>Payment ID: {id}</p>
      </Card>
    </div>
  );
}
