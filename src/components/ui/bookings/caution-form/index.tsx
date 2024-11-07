/** @format */

import { Button } from "@/components/_shared/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/_shared/form";
import { Input } from "@/components/_shared/input";
import { Label } from "@/components/_shared/label";
import { LoadingButton } from "@/components/_shared/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import Loading from "@/components/loader/loading";

import React, { Dispatch, SetStateAction, useMemo } from "react";

const CautionForm = ({
  banksData,
  form,
  setSelectedBank,
  verifyBankLoading,
  verifyError,
  isCautionLoading,
}: {
  banksData: Bank[];
  form: any;
  setSelectedBank: Dispatch<SetStateAction<{ code: string; name: string }>>;
  verifyBankLoading: boolean;
  verifyError: any;
  isCautionLoading: boolean;
}) => {
  const uniqueBanksData = useMemo(() => {
    return banksData.filter(
      (bank, index, self) =>
        index === self.findIndex((b) => b.code === bank.code)
    );
  }, [banksData]);

  const accountNumber = form.watch("account_number");
  const accountName = form.watch("account_name");

  return (
    <section className="p-4">
      <div className="flex flex-col gap-4">
        <section>
          <Label className="font-normal">Bank Name</Label>
          <FormField
            control={form.control}
            name="bank_name"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    const selectedBankObj = uniqueBanksData.find(
                      (bank) => String(bank.code) === value
                    );

                    if (selectedBankObj) {
                      field.onChange(value);
                      setSelectedBank({
                        code: selectedBankObj.code,
                        name: selectedBankObj.name,
                      }); // Store both code and name
                    }
                  }}
                >
                  <SelectTrigger className="h-10 w-full border-black/10 shadow-none mt-2">
                    <SelectValue
                      placeholder="Select bank"
                      className="text-xs"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueBanksData.map((bank) => (
                      <SelectItem key={bank.code} value={String(bank.code)}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs text-red-500 font-light" />
              </FormItem>
            )}
          />
        </section>
        <section>
          <Label className="font-normal">Account Number</Label>
          <FormField
            control={form.control}
            name="account_number"
            render={({ field }) => (
              <FormItem>
                <FormControl className="bg-transparent mt-2">
                  <Input
                    className=" font-light w-full  h-10 "
                    placeholder="Enter name "
                    {...field}
                    maxLength={10}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 font-light" />
              </FormItem>
            )}
          />
        </section>
        <section className="relative">
          <Label className="font-normal ">Account Name</Label>
          <FormField
            control={form.control}
            name="account_name"
            render={({ field }) => (
              <FormItem>
                <FormControl className="bg-transparent mt-2">
                  <Input
                    className=" font-light text-black w-full  h-10 "
                    placeholder="Enter name "
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 font-light" />
              </FormItem>
            )}
          />
          {verifyBankLoading && (
            <section className="absolute top-11 right-2">
              <Loading />
            </section>
          )}
          {verifyError && (
            <section>
              <p className="text-xs font-light mt-2 text-red-500">
                {verifyError?.data?.debug}
              </p>
            </section>
          )}
        </section>
      </div>
      <LoadingButton
        className="w-full mt-16"
        type="submit"
        disabled={!accountNumber || !accountName}
        loading={isCautionLoading}
      >
        Initiate Refund
      </LoadingButton>
    </section>
  );
};

export default CautionForm;
