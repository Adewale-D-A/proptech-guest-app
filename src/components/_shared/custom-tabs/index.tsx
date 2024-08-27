/** @format */

import { cn } from "@/_shared/cn";
import React from "react";
import { BadgePercent } from "lucide-react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  selectedTabIndex: number;
  onTabClick: (index: number) => void;
  classNames?: string;
  onChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  selectedTabIndex,
  onTabClick,
  classNames,
  onChange,
}) => {
  return (
    <div className={`w-full ${classNames}`}>
      <div
        className="relative  bg-custom-background-80  grid"
        role="tablist"
        aria-orientation="horizontal"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
      >
        <div
          className="absolute top-1/2 left-[2px] bg-primary-0   transition-all duration-500 border-b border-primary-1 ease-in-out "
          style={{
            height: "calc(100% - 2px)",
            width: `calc(100% / ${tabs.length} - 1px)`,
            transform: `translate(${selectedTabIndex * 100}%, -50%)`,
          }}
        ></div>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={cn(
              "relative z-[1]  text-sm rounded-[3px] py-1.5 focus:outline-none transition duration-500  ",
              {
                "text-primary-1": selectedTabIndex === index,
                "text-[#9B9B9B] hover:text-custom-text-300":
                  selectedTabIndex !== index,
              }
            )}
            id={`tab-${index}`}
            role="tab"
            type="button"
            aria-selected={selectedTabIndex === index}
            tabIndex={selectedTabIndex === index ? 0 : -1}
            onClick={() => {
              onTabClick(index);
              if (onChange) onChange(tab.id);
            }}
          >
            <div className="flex items-center gap-4 justify-center">
              <BadgePercent />
              <span className="scale-110">{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
