/** @format */
("");
import { Search } from "lucide-react";
import React from "react";
import { Input } from "../_shared/input";
import { DatePicker } from "../date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_shared/select";
import { Separator } from "../_shared/separator";
import { Button } from "../_shared/button";
import { Label } from "../_shared/label";

const SearchDash = ({
  location,
  setLocation,
  setNumOfRooms,
  from,
  to,
  setDate,
  handleSearch,
  setFrom,
  setTo,
}: any) => {
  return (
    <div className="bg-[#f5f6ff] w-5/6 mx-auto rounded-full flex items-center  h-20 shadow-sm">
      <div className="flex justify-between h-full flex-1 items-center">
        <div className="flex-1 gap-3 flex justify-between px-6">
          <div className="flex gap-4 w-full items-center">
            <Search size={20} />
            <div className="w-full">
              <Input
                placeholder="Location"
                className="w-full text-gray-100 border-none shadow-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Label className="text-xs">Where would you love to stay</Label>
            </div>
          </div>
          <Separator orientation="vertical" className=" bg-black/10  h-20" />
          <div className="w-full flex flex-col justify-center">
            <Select onValueChange={(value) => setNumOfRooms(value)}>
              <SelectTrigger className="border-none shadow-none text-gray-100">
                <SelectValue
                  placeholder="Choose number of rooms"
                  className="text-gray-100"
                />
              </SelectTrigger>

              <SelectContent className="border-none">
                {[1, 2, 3, 4, 5].map((room) => (
                  <SelectItem
                    key={room}
                    value={room.toString()}
                    className="border-none"
                  >
                    {room} Room{room > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
              <Label className="text-xs mt-2">Select Number of Rooms</Label>
            </Select>
          </div>
          <Separator orientation="vertical" className=" bg-black/10  h-20" />
          <section className="pt-2 flex items-center">
            <section>
              <p className="text-gray-100 text-xs">From</p>
              <DatePicker
                className="w-32 border-none mt-0"
                date={from}
                setDate={setFrom}
                removeBg={true}
                placeholder="dd/mm/yyyy"
                rightIcon
                showIcon={false}
              />
            </section>
            <section>
              <p className="text-gray-100 text-xs">To</p>
              <DatePicker
                className="w-32 border-none mt-0"
                date={to}
                setDate={setTo}
                placeholder="dd/mm/yyyy"
                removeBg={true}
                rightIcon
                showIcon={false}
              />
            </section>
          </section>
        </div>
        <div className="h-full cursor-pointer">
          <Button
            className="bg-[#FFD772] rounded-l-none text-black h-full w-44"
            onClick={handleSearch}
          >
            SEARCH
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchDash;
