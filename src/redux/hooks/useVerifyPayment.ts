/** @format */

import { useState, useEffect } from "react";
import { useVerifyPaymentQuery } from "../services/booking";
import { useToast } from "@/components/_shared/toast/use-toast";
import { errorHandler } from "@/_shared/constants";
import { useRouter } from "next/navigation";

interface UseVerifyPaymentResult {
  verificationData: any;
  isError: boolean;
  error: any;
}

export const useVerifyPayment = (): UseVerifyPaymentResult => {
  const { toast } = useToast();
  const router = useRouter();
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
      errorHandler(isError as any);
    }
  }, [verificationData, isError, error]);

 useEffect(() => {
  console.log('Navigation Effect:', {
    hasVerificationData: !!verificationData,
    //@ts-ignore
    verificationData: verificationData?.data?.booking?.id,
  
    currentUrl: window.location.href
  });

   if (//@ts-ignore
     verificationData?.data?.booking?.id) {
     
     console.log(//@ts-ignore
       'Navigating to bookings with ID:', verificationData?.data?.booking?.id);
     router.push(//@ts-ignore
       `/bookings?id=${verificationData?.data?.booking.id}`);
  }
}, [verificationData, router]);

  return { verificationData, isError, error };
};
