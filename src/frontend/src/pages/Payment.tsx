import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export default function Payment() {
  const search = useSearch({ from: "/payment" });
  const tutorName = search.tutorName || "Tutor";
  const tutorId = search.tutorId || "unknown";
  const amount = Number(search.amount) || 500;
  const commission = Math.round(amount * 0.1);
  const tutorEarns = amount - commission;

  const { actor } = useActor();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [paid, setPaid] = useState(false);

  const formatCardNumber = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 1500));
      if (actor) {
        await actor.createPayment({
          studentId: "student-me",
          tutorId,
          stripePaymentId: `pi_mock_${Date.now()}`,
          amount: BigInt(amount),
        });
      }
    },
    onSuccess: () => {
      toast.success("Payment successful!");
      setPaid(true);
    },
    onError: () => toast.error("Payment failed. Please try again."),
  });

  const isValid =
    cardNumber.replace(/\s/g, "").length === 16 &&
    expiry.length === 5 &&
    cvv.length >= 3 &&
    name.trim();

  if (paid) {
    return (
      <div
        className="container mx-auto px-4 py-20 max-w-lg text-center"
        data-ocid="payment.success_state"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
        </motion.div>
        <h2 className="font-display text-2xl font-bold mb-3">
          Payment Successful!
        </h2>
        <p className="text-muted-foreground mb-2">
          ₹{amount} paid to {tutorName}.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Tutor receives ₹{tutorEarns} after 10% platform fee (₹{commission}).
        </p>
        <Button asChild>
          <Link to="/messaging" data-ocid="payment.primary_button">
            Message Your Tutor
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <main
      className="container mx-auto px-4 py-10 max-w-4xl"
      data-ocid="payment.page"
    >
      <Button variant="ghost" className="mb-6 gap-2" asChild>
        <Link to="/tutors" search={{}} data-ocid="payment.secondary_button">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </Button>

      <h1 className="font-display text-3xl font-bold mb-8">Secure Payment</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-accent/30">
              <div className="flex justify-between items-center">
                <span className="font-medium">Tutor</span>
                <span>{tutorName}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-muted-foreground text-sm">
                  Session fee
                </span>
                <span className="font-semibold">₹{amount}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Platform fee (10%)
                </span>
                <span className="text-destructive">₹{commission}</span>
              </div>
              <div className="flex justify-between font-semibold text-sm text-green-700">
                <span>Tutor receives</span>
                <span>₹{tutorEarns}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-display font-bold text-lg">
              <span>Total</span>
              <span>₹{amount}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-green-50 rounded-lg">
              <ShieldCheck className="h-4 w-4 text-green-600 shrink-0" />
              <span>Payments are secured with 256-bit SSL encryption</span>
            </div>
            <Badge className="w-full justify-center py-1.5 bg-accent border-0 text-accent-foreground">
              <Lock className="h-3 w-3 mr-1" /> Secure Stripe Payment
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Card Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cardholder Name</Label>
              <Input
                placeholder="Name on card"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-ocid="payment.input"
              />
            </div>
            <div className="space-y-2">
              <Label>Card Number</Label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                data-ocid="payment.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiry</Label>
                <Input
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  data-ocid="payment.input"
                />
              </div>
              <div className="space-y-2">
                <Label>CVV</Label>
                <Input
                  placeholder="123"
                  type="password"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  data-ocid="payment.input"
                />
              </div>
            </div>
            <Button
              className="w-full h-12 gradient-teal text-white border-0 hover:opacity-90 font-semibold"
              disabled={!isValid || mutation.isPending}
              onClick={() => mutation.mutate()}
              data-ocid="payment.submit_button"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                `Pay ₹${amount}`
              )}
            </Button>
            {mutation.isError && (
              <p
                className="text-xs text-destructive text-center"
                data-ocid="payment.error_state"
              >
                Payment failed. Please check your details.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
