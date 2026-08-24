import React, { useState, useMemo } from "react";
import { icons } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

export const IconPicker = ({ value, onChange }: IconPickerProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const iconNames = useMemo(() => Object.keys(icons), []);

  const filteredIcons = useMemo(() => {
    return iconNames
      .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 50);
  }, [iconNames, search]);

  const SelectedIcon = icons[value as keyof typeof icons] ?? icons.Anvil;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="flex items-center gap-2 w-full px-3 py-2 border rounded-md bg-white text-left shadow-sm"
          >
            <SelectedIcon className="w-5 h-5" />
            <span className="truncate flex-1">{value || "Select icon"}</span>
          </button>
        }
      ></PopoverTrigger>

      <PopoverContent className="w-64 p-2" align="start">
        <Input
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          className="mb-2"
        />
        <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
          {filteredIcons.map((name) => {
            const IconComponent = icons[name as keyof typeof icons];
            if (!IconComponent) return null;
            return (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => {
                  onChange(name);
                  setIsOpen(false);
                }}
                className={`p-2 rounded hover:bg-gray-100 flex items-center justify-center ${
                  value === name
                    ? "bg-blue-50 text-blue-600 ring-1 ring-blue-500"
                    : ""
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
