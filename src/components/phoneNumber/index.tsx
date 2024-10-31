/** @format */

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../_shared/select";

import { CountryType } from "@/types/type";
import { countries } from "@/_shared/countries";
import { Input } from "../_shared/input";

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  includePlusPrefix?: boolean;
  classNames?: string;
  showDivider?: boolean;
  showFlag?: boolean;
  required?: boolean;
  noRadius?: boolean;
  inputClassName?: string;
  selectClassName?: string;
  disabled?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  includePlusPrefix = false,
  classNames,
  showDivider = true,
  showFlag = true,
  required = true,
  noRadius,
  inputClassName,
  selectClassName,
  disabled,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    countries.find((country) => country.code === "NG") || countries[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const formattedPhoneNumber = `${includePlusPrefix ? "+" : ""}${
      selectedCountry.phone
    }${phoneNumber}`;
    onChange(formattedPhoneNumber);
  }, [selectedCountry, phoneNumber, onChange, includePlusPrefix]);

  const handleCountryChange = (value: string) => {
    const country = countries.find((c) => c.code === value);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value.replace(/\D/g, "");
    setPhoneNumber(phone);
  };

  return (
    <div
      className={`flex border w-full rounded-full items-center  ${classNames}`}
    >
      <Select value={selectedCountry.code} onValueChange={handleCountryChange}>
        <SelectTrigger
          className={` ${
            includePlusPrefix ? "w-32" : !showFlag ? "w-20" : "w-[130px]"
          }  ${
            selectClassName
              ? selectClassName
              : "border-none  rounded-l-full border-r-2"
          }    `}
        >
          <SelectValue>
            <div className="flex items-center ">
              {showFlag && (
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                  alt={selectedCountry.label}
                  className="mr-1 "
                />
              )}
              <span className="flex text-xs items-center">
                {includePlusPrefix ? "+" : ""} {selectedCountry.phone}
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {countries.map((country: CountryType) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center">
                <img
                  loading="lazy"
                  width="24"
                  srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                  alt={country.label}
                  className="mr-2"
                />
                <span>
                  {country.label} ({country.phone})
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={value.replace(
          `${includePlusPrefix ? "+" : ""}${selectedCountry.phone}`,
          ""
        )}
        onChange={handleInputChange}
        placeholder="000-000-0000"
        className={`border-0 h-10 ${
          showDivider ? "border-l rounded-l-none" : ""
        } px-2  ${inputClassName} `}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneNumberInput;
