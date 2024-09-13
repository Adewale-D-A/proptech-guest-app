/** @format */

"use client";

import * as React from "react";
import { TimePicker as TimePickerComponent } from "react-time-picker";

type TimePickerProps = {
  selected: string;
  onChange: (time: string | null) => void;
};

export function TimePicker({ selected, onChange }: TimePickerProps) {
  return (
    <TimePickerComponent
      value={selected}
      onChange={onChange}
      format="HH:mm"
      className="w-96 border"
    />
  );
}
