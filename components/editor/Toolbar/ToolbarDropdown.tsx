import { Select, SelectContent } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import React from "react";

export const ToolbarDropdown = ({ title, value, onChange, children }: any) => {
  return (
    <div>
      <Select name={title} value={value} onValueChange={() => onChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
};
