/** @format */

import React, { useEffect, useState } from "react";

const useCheckAvaliability = ({
  bookedDates,
  blockedDates,
}: {
  blockedDates: string[];
  bookedDates: string[];
}) => {
  const [availableChecked, setAvailableChecked] = useState(false);
  const [unavailableChecked, setUnavailableChecked] = useState(false);
  const [filteredDates, setFilteredDates] = useState<Date[]>([]);

  const allUnavailableDates = [...bookedDates, ...blockedDates];
  const handleAvailableToggle = (checked: boolean) => {
    if (checked) {
      setAvailableChecked(true);
      setUnavailableChecked(false);
    } else {
      setAvailableChecked(false);
    }
  };
  const handleUnavailableToggle = (checked: boolean) => {
    if (checked) {
      setUnavailableChecked(true);
      setAvailableChecked(false);
    } else {
      setUnavailableChecked(false);
    }
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filterDates = () => {
    let filtered: Date[] = [];

    if (availableChecked) {
      filtered =
        blockedDates.length === 0
          ? []
          : blockedDates
              .filter((date) => !allUnavailableDates.includes(date))
              .map((date) => new Date(date));
    }

    if (unavailableChecked) {
      filtered = [
        ...filtered,
        ...allUnavailableDates.map((date) => new Date(date)),
      ];
    }
    setFilteredDates(filtered);
  };
  useEffect(() => {
    filterDates();
  }, [availableChecked, unavailableChecked]);

  return {
    state: {
      filteredDates,
      availableChecked,
      unavailableChecked,
    },
    actions: {
      handleAvailableToggle,
      handleUnavailableToggle,
    },
  };
};

export default useCheckAvaliability;
