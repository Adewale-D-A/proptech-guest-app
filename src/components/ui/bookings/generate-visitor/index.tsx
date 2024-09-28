/** @format */

import { nameSchema } from "@/_shared/validate";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_shared/form";
import { Input } from "@/components/_shared/input";
import { Label } from "@/components/_shared/label";
import { LoadingButton } from "@/components/_shared/loading-button";
import { useToast } from "@/components/_shared/toast/use-toast";
import { useGenerateCodeMutation } from "@/redux/services/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const GenerateVisitor = ({
  onClick,
  onClose,
  bookingId,
  setVisitorCode,
}: {
  onClose: () => void;
  onClick: () => void;
  bookingId: number | null;
  setVisitorCode: (val: string) => void;
}) => {
  const { toast } = useToast();
  const [generateCode, { isLoading }] = useGenerateCodeMutation();
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof nameSchema>) => {
    const payload = {
      ...values,
      booking_id: Number(bookingId),
    };
    try {
      const response = await generateCode(payload).unwrap();
      setVisitorCode(response?.data?.visitor_code);
      toast({
        variant: "default",
        title: response?.message,
      });
      onClose();
      onClick();
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message ||
        "Failed to generate code. Please try again.";
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
      onClose();
    }
  };
  return (
    <div>
      <div className="flex items-center border-b p-4 justify-between">
        <h1>Generate Visitors code</h1>
        <X
          className="text-gray-100 cursor-pointer"
          size={18}
          onClick={onClose}
        />
      </div>
      <section className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-light">
                    Visitors Name
                  </FormLabel>
                  <FormControl className="bg-transparent">
                    <Input
                      className="bg-white font-light w-full"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 font-light" />
                </FormItem>
              )}
            />
            <LoadingButton
              loading={isLoading}
              className="w-full mt-6"
              type="submit"
            >
              Generate Code
            </LoadingButton>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default GenerateVisitor;
