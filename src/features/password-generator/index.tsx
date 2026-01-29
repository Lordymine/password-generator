"use client";

import * as React from "react";
import { useToast } from "@/shared/hooks/use-toast";
import { generatePassword, calculateCrackTime, type PasswordOptions, type GeneratedPassword } from "@/domains/password/password-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/components/card";
import { Button } from "@/shared/ui/components/button";
import { Slider } from "@/shared/ui/components/slider";
import { cn } from "@/shared/ui/lib/utils";
import { PasswordDisplay } from "./ui/password-display";
import { StrengthIndicator } from "./ui/strength-indicator";
import { OptionToggle } from "./ui/option-toggle";

export function PasswordGeneratorFeature() {
  const { toasts, show } = useToast();
  
  const [options, setOptions] = React.useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  });

  const [result, setResult] = React.useState<GeneratedPassword | null>(null);
  const [copying, setCopying] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

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
    <Card className="w-full max-w-xl mx-auto shadow-lg border-slate-200 dark:border-slate-700">
      {/* Screen reader announcement */}
      <div 
        id="password-announcement" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      />
      
      <CardHeader className="py-3">
        <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Password Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 py-2">
        {/* Password Display */}
        <section aria-label="Generated password">
          <PasswordDisplay
            password={result?.password || ""}
            onCopy={handleCopy}
            onRegenerate={handleRegenerate}
            copying={copying}
          />
        </section>

        {/* Strength Indicator */}
        {result && (
          <section aria-label="Password strength">
            <StrengthIndicator
              strength={result.strength}
              entropy={result.entropy}
            />
          </section>
        )}

        {/* Length Slider */}
        <section aria-label="Password length">
          <Slider
            label="Password Length"
            min={4}
            max={128}
            step={1}
            value={[options.length]}
            onValueChange={([value]) => updateOption("length", value)}
            showValue
          />
        </section>

        {/* Character Options */}
        <section aria-label="Character options">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase mb-1">
            Character Types
          </p>
          <div className="space-y-0">
            <OptionToggle
              id="uppercase"
              label="Uppercase Letters (A-Z)"
              checked={options.includeUppercase}
              onChange={(checked) => updateOption("includeUppercase", checked)}
            />
            <OptionToggle
              id="lowercase"
              label="Lowercase Letters (a-z)"
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
        </section>

        {/* Advanced Options */}
        <section aria-label="Advanced options">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase mb-1">
            Advanced Options
          </p>
          <div className="space-y-0">
            <OptionToggle
              id="exclude-similar"
              label="Exclude Similar (i, l, 1, O, 0)"
              checked={options.excludeSimilar}
              onChange={(checked) => updateOption("excludeSimilar", checked)}
            />
            <OptionToggle
              id="exclude-ambiguous"
              label="Exclude Ambiguous"
              checked={options.excludeAmbiguous}
              onChange={(checked) => updateOption("excludeAmbiguous", checked)}
            />
          </div>
        </section>

        {/* Generate Button */}
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="w-full h-10 font-semibold transition-all duration-200"
        >
          {isGenerating ? "Generating..." : "Generate Password"}
        </Button>

        {/* Crack Time */}
        {crackTime && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            Estimated time to crack: <span className="font-semibold text-slate-700 dark:text-slate-300">{crackTime}</span>
          </p>
        )}
      </CardContent>

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
    </Card>
  );
}
