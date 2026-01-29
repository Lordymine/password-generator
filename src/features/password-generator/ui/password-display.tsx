import * as React from "react";
import { Copy, RefreshCw, Check } from "lucide-react";
import { Button } from "@/shared/ui/components/button";
import { cn } from "@/shared/ui/lib/utils";

interface PasswordDisplayProps {
  password: string;
  onCopy: () => void;
  onRegenerate: () => void;
  copying: boolean;
}

export function PasswordDisplay({ password, onCopy, onRegenerate, copying }: PasswordDisplayProps) {
  const hasPassword = password.length > 0;
  
  return (
    <div className="relative">
      {/* Password Display Area */}
      <div
        role="region"
        aria-label="Generated password"
        aria-live="polite"
        className={cn(
          "min-h-[72px] w-full rounded-xl border-2 p-4 font-mono text-lg font-semibold",
          "transition-all duration-200",
          "flex items-center",
          hasPassword 
            ? "border-slate-300 bg-slate-50 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" 
            : "border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800",
          "focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10",
          "break-all"
        )}
      >
        <span className={cn(!hasPassword && "italic")}>
          {hasPassword ? password : 'Click generate to create a password'}
        </span>
      </div>
      
      {/* Action Buttons */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onRegenerate}
          className={cn(
            "h-10 w-10 p-0 rounded-lg",
            "hover:bg-slate-200 dark:hover:bg-slate-700",
            "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          )}
          aria-label="Generate new password"
          title="Generate new password"
        >
          <RefreshCw className="h-5 w-5 text-slate-600 dark:text-slate-300" aria-hidden="true" />
        </Button>
        
        <Button
          type="button"
          size="sm"
          variant={copying ? "default" : "ghost"}
          onClick={onCopy}
          disabled={!hasPassword || copying}
          className={cn(
            "h-10 w-10 p-0 rounded-lg transition-all duration-200",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            !copying && "hover:bg-slate-200 dark:hover:bg-slate-700",
            copying && "bg-green-600 hover:bg-green-700 text-white"
          )}
          aria-label={copying ? "Password copied" : "Copy password to clipboard"}
          aria-pressed={copying}
          title={copying ? "Copied!" : "Copy to clipboard"}
        >
          {copying ? (
            <Check className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Copy className="h-5 w-5 text-slate-600 dark:text-slate-300" aria-hidden="true" />
          )}
        </Button>
      </div>
    </div>
  );
}
