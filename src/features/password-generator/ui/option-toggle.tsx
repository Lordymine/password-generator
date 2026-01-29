import * as React from "react";
import { Switch } from "@radix-ui/react-switch";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/shared/ui/lib/utils";

interface OptionToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function OptionToggle({ 
  id, 
  label, 
  description,
  checked, 
  onChange, 
  disabled = false 
}: OptionToggleProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  
  return (
    <div 
      className={cn(
        "flex items-center justify-between gap-4 py-1.5 px-2 rounded-lg",
        "transition-colors duration-200",
        !disabled && "hover:bg-slate-50 dark:hover:bg-slate-800/50",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <div className="flex-1 min-w-0">
        <Label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-slate-900 dark:text-slate-100",
            "cursor-pointer select-none",
            disabled && "cursor-not-allowed"
          )}
        >
          {label}
        </Label>
        {description && (
          <p 
            id={descriptionId}
            className="text-xs text-slate-500 dark:text-slate-400 mt-0.5"
          >
            {description}
          </p>
        )}
      </div>
      
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-describedby={descriptionId}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
          "border-2 border-transparent",
          "transition-colors duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-300 dark:bg-slate-600"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg",
            "ring-0 transition-transform duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </Switch>
    </div>
  );
}
