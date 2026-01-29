"use client";

import * as React from "react";
import { useToast } from "@/shared/hooks/use-toast";
import { generatePassword, calculateCrackTime, type PasswordOptions, type GeneratedPassword } from "@/domains/password/password-generator";
import { Button } from "@/shared/ui/components/button";
import { Slider } from "@/shared/ui/components/slider";
import { cn } from "@/shared/ui/lib/utils";
import { PasswordDisplay } from "./ui/password-display";
import { StrengthIndicator } from "./ui/strength-indicator";
import { OptionToggle } from "./ui/option-toggle";
import { Settings2, ChevronDown, ChevronUp } from "lucide-react";

export function PasswordGeneratorFeature() {
  const { toasts, show } = useToast();
  
  const [options, setOptions] = React.useState<PasswordOptions>(() => ({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  }));

  const [result, setResult] = React.useState<GeneratedPassword | null>(null);
  const [copying, setCopying] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  const handleGenerate = React.useCallback(async () => {
    setIsGenerating(true);
    try {
      const newResult = generatePassword(options);
      setResult(newResult);
      
      // Announce to screen readers
      const announcement = document.getElementById('password-announcement');
      if (announcement) {
        announcement.textContent = `New password generated. Strength: ${newResult.strength}`;
      }
    } catch (error) {
      show({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate password",
        type: "error",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [options, show]);

  const handleCopy = React.useCallback(async () => {
    if (!result?.password) return;
    
    setCopying(true);
    const success = await import("@/shared/ui/lib/utils").then(m => m.copyToClipboard(result.password));
    
    if (success) {
      show({
        title: "Copied!",
        description: "Password copied to clipboard",
        type: "success",
      });
    } else {
      show({
        title: "Failed to copy",
        description: "Please copy manually",
        type: "error",
      });
    }
    
    setTimeout(() => setCopying(false), 2000);
  }, [result, show]);

  const handleRegenerate = React.useCallback(() => {
    handleGenerate();
  }, [handleGenerate]);

  React.useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const updateOption = <K extends keyof PasswordOptions>(
    key: K,
    value: PasswordOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  // Ensure at least one option is selected
  React.useEffect(() => {
    const hasSelectedType = 
      options.includeUppercase || 
      options.includeLowercase || 
      options.includeNumbers || 
      options.includeSymbols;
    
    if (!hasSelectedType) {
      updateOption("includeLowercase", true);
    }
  }, [options.includeUppercase, options.includeLowercase, options.includeNumbers, options.includeSymbols]);

  const crackTime = result ? calculateCrackTime(result.entropy) : null;

  // Check if only lowercase is selected (to show warning)
  const isOnlyLowercase = 
    options.includeLowercase && 
    !options.includeUppercase && 
    !options.includeNumbers && 
    !options.includeSymbols;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Screen reader announcement */}
      <div 
        id="password-announcement" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      />
      
      {/* Main Password Display - Always Visible */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
        {/* Password Display */}
        <div className="mb-4">
          <PasswordDisplay
            password={result?.password || ""}
            onCopy={handleCopy}
            onRegenerate={handleRegenerate}
            copying={copying}
          />
        </div>

        {/* Strength Indicator */}
        {result && (
          <div className="mb-4">
            <StrengthIndicator
              strength={result.strength}
              entropy={result.entropy}
            />
          </div>
        )}

        {/* Crack Time */}
        {crackTime && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
            Estimated time to crack: <span className="font-semibold text-slate-700 dark:text-slate-300">{crackTime}</span>
          </p>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="flex-1 h-11 font-semibold"
          >
            {isGenerating ? "Generating..." : "Generate New Password"}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "h-11 px-3",
              showSettings && "bg-slate-100 dark:bg-slate-800"
            )}
            aria-expanded={showSettings}
            aria-controls="advanced-settings"
          >
            <Settings2 className="h-4 w-4 mr-2" />
            Settings
            {showSettings ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </Button>
        </div>

        {/* Advanced Settings - Collapsible */}
        {showSettings && (
          <div 
            id="advanced-settings"
            className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4"
          >
            {/* Length Slider */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                Password Length: <span className="text-blue-600 dark:text-blue-400 font-mono">{options.length}</span>
              </label>
              <Slider
                min={4}
                max={128}
                step={1}
                value={[options.length]}
                onValueChange={([value]) => updateOption("length", value)}
                showValue={false}
              />
            </div>

            {/* Character Options */}
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase mb-2">
                Character Types
              </p>
              <div className="space-y-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
                <OptionToggle
                  id="uppercase"
                  label="Uppercase (A-Z)"
                  checked={options.includeUppercase}
                  onChange={(checked) => updateOption("includeUppercase", checked)}
                />
                <OptionToggle
                  id="lowercase"
                  label="Lowercase (a-z)"
                  checked={options.includeLowercase}
                  onChange={(checked) => updateOption("includeLowercase", checked)}
                  disabled={isOnlyLowercase}
                />
                <OptionToggle
                  id="numbers"
                  label="Numbers (0-9)"
                  checked={options.includeNumbers}
                  onChange={(checked) => updateOption("includeNumbers", checked)}
                />
                <OptionToggle
                  id="symbols"
                  label="Symbols (!@#$%^&*)"
                  checked={options.includeSymbols}
                  onChange={(checked) => updateOption("includeSymbols", checked)}
                />
              </div>
            </div>

            {/* Advanced Options */}
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase mb-2">
                Advanced
              </p>
              <div className="space-y-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
                <OptionToggle
                  id="exclude-similar"
                  label="Exclude similar (i, l, 1, O, 0)"
                  checked={options.excludeSimilar}
                  onChange={(checked) => updateOption("excludeSimilar", checked)}
                />
                <OptionToggle
                  id="exclude-ambiguous"
                  label="Exclude ambiguous"
                  checked={options.excludeAmbiguous}
                  onChange={(checked) => updateOption("excludeAmbiguous", checked)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toasts - Accessible */}
      {toasts.length > 0 && (
        <div 
          className="fixed bottom-4 right-4 space-y-2 z-50"
          role="region"
          aria-label="Notifications"
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              role="status"
              aria-live="polite"
              className={cn(
                "rounded-xl border-2 px-4 py-3 shadow-lg min-w-[300px]",
                "transform transition-all duration-300",
                "animate-in slide-in-from-right-4",
                toast.type === "success" 
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                  : "border-red-500 bg-red-50 dark:bg-red-900/20"
              )}
            >
              <div className={cn(
                "text-sm font-semibold",
                toast.type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
              )}>
                {toast.title}
              </div>
              {toast.description && (
                <div className={cn(
                  "text-xs mt-0.5",
                  toast.type === "success" ? "text-green-600 dark:text-green-300" : "text-red-600 dark:text-red-300"
                )}>
                  {toast.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
