/** @format */

import { useState, useEffect } from "react";
import { useVerifyPaymentQuery } from "../services/booking";
import { useToast } from "@/components/_shared/toast/use-toast";

interface UseVerifyPaymentResult {
  verificationData: any;
  isError: boolean;
  error: any;
}

export const useVerifyPayment = (): UseVerifyPaymentResult => {
  const { toast } = useToast();
  const [trxrefParam, setTrxrefParam] = useState<string | null>(null);
  const {
    data: verificationData,
    isError,
    error,
  } = useVerifyPaymentQuery(trxrefParam ?? "", {
    skip: !trxrefParam,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const trxref = url.searchParams.get("trxref");
      if (trxref) {
        setTrxrefParam(trxref);
      }
    }
  }, []);

  useEffect(() => {
    if (verificationData) {
      toast({
        variant: "default",
        title: "Payment Verified",
        description: "Your payment was successfully verified.",
      });
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("trxref");
      newUrl.searchParams.delete("reference");
      window.history.replaceState(null, "", newUrl.toString());
    }

    if (isError) {
      const errorMessage =
        (error as any)?.data?.message || "Verification failed.";
      toast({
        variant: "destructive",
        title: "Verification Error",
        description: errorMessage,
      });
    }
  }, [verificationData, isError, error]);

  return { verificationData, isError, error };
};
