/** @format */

import { formatCurrency } from "@/_shared";
import { Card } from "@/components/_shared/card";
import { useToast } from "@/components/_shared/toast/use-toast";
import ThunderLoader from "@/components/loader/thunder-loader";
import {
  useGetServiceTypeQuery,
  useRequestFeeMutation,
} from "@/redux/services/request";
import React, { useEffect, useState } from "react";

const ThirdStepForm = ({
  serviceType,
  quantity,
  requestDate,
}: {
  form: any;
  name: string;
  serviceType: string;
  quantity: string;
  requestDate: string | undefined;
  description: string;
  totalAmount: string;
}) => {
  const { toast } = useToast();
  const { data } = useGetServiceTypeQuery();
  const [requestFee, { isLoading: isLoadingMutation }] =
    useRequestFeeMutation();
  const [total, setTotal] = useState<string | null>(null);
  const serviceData = data && data?.data && data?.data?.serviceTypes?.data;
  const selectedServiceType = serviceData?.find(
    (service) => service.id.toString() === serviceType
  );
  const [requestBody, setRequestBody] = useState({
    service_type_id: selectedServiceType?.id || 0,
    quantity: quantity,
    payment_gateway: "paystack",
  });

  useEffect(() => {
    if (selectedServiceType) {
      setRequestBody({
        service_type_id: selectedServiceType.id,
        quantity: quantity,
        payment_gateway: "paystack",
      });
    }
  }, [selectedServiceType, quantity]);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await requestFee(requestBody).unwrap();
        if (response) {
          const totalCost = formatCurrency(
            response?.data?.cost,
            response?.data?.currency
          );
          setTotal(totalCost);
        }
      } catch (err) {
        const errorMessage =
          (err as any)?.data?.message || "Failed . Please try again.";
        toast({
          variant: "destructive",
          title: "Error!",
          description: errorMessage,
        });
      }
    };
    if (requestBody.service_type_id && requestBody.quantity) {
      fetchTotalAmount();
    }
  }, [requestBody]);

  const ReusableCard = ({
    text,
    description,
  }: {
    text: string;
    description: string;
  }) => {
    return (
      <div className="flex border-b py-3 justify-between items-center">
        <p
          className={`text-sm font-light  ${
            text === "Total" ? "" : "text-[#707070]"
          }  `}
        >
          {text}
        </p>
        <p className="text-sm">{description}</p>
      </div>
    );
  };
  return (
    <div>
      <Card className="bg-[#F9F9F9] shadow-sm p-4 border-[#F9F9F9]">
        <h3 className="mb-2 font-medium">Order Summary</h3>
        {isLoadingMutation ? (
          <div className="mt-4 flex justify-center items-center h-full">
            <ThunderLoader />
          </div>
        ) : (
          <div className="flex flex-col ">
            <ReusableCard
              text="Type of Service"
              description={selectedServiceType?.name ?? ""}
            />
            <ReusableCard description={requestDate ?? ""} text="Date" />
            <ReusableCard
              description={total ?? ""}
              text={`${selectedServiceType?.name} fee`}
            />
            <ReusableCard description={total ?? ""} text="Total" />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ThirdStepForm;
