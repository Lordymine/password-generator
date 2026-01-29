import * as React from "react";
import { cn } from "@/shared/ui/lib/utils";

interface StrengthIndicatorProps {
  strength: 'weak' | 'medium' | 'strong' | null;
  entropy: number;
}

export function StrengthIndicator({ strength, entropy }: StrengthIndicatorProps) {
  if (!strength) return null;

  const config = {
    weak: {
      label: "Weak Password",
      shortLabel: "Weak",
      color: "bg-red-500",
      width: "w-[33%]",
      textColor: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      value: 33,
    },
    medium: {
      label: "Medium Password",
      shortLabel: "Medium",
      color: "bg-amber-500",
      width: "w-[66%]",
      textColor: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      value: 66,
    },
    strong: {
      label: "Strong Password",
      shortLabel: "Strong",
      color: "bg-emerald-500",
      width: "w-full",
      textColor: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      value: 100,
    },
  };

  const current = config[strength];

  return (
    <div 
      className="space-y-3"
      role="region"
      aria-label="Password strength indicator"
    >
      {/* Label Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span 
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide",
              current.bgColor,
              current.textColor
            )}
          >
            {current.shortLabel}
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {current.label}
          </span>
        </div>
        <span 
          className="text-sm text-slate-500 dark:text-slate-400 font-mono"
          aria-label={`Entropy: ${entropy.toFixed(1)} bits`}
        >
          {entropy.toFixed(1)} bits
        </span>
      </div>

      {/* Progress Bar */}
      <div 
        className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={current.value}
        aria-label={`Password strength: ${current.label}`}
      >
        {/* Background track segments */}
        <div className="absolute inset-0 flex">
          <div className="w-1/3 h-full border-r border-white/20 dark:border-black/20" />
          <div className="w-1/3 h-full border-r border-white/20 dark:border-black/20" />
          <div className="w-1/3 h-full" />
        </div>
        
        {/* Animated fill */}
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out relative",
            current.color
          )}
          style={{ width: `${current.value}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      {/* Helper text */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {strength === 'weak' && "Consider increasing length and adding more character types."}
        {strength === 'medium' && "Good, but could be stronger with more length or variety."}
        {strength === 'strong' && "Excellent! This password is very secure."}
      </p>
    </div>
  );
}
