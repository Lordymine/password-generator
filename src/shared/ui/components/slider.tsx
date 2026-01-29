// Dependencies needed: @radix-ui/react-slider
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/shared/ui/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    label?: string;
    showValue?: boolean;
  }
>(({ className, label, showValue = true, ...props }, ref) => {
  const [value, setValue] = React.useState(props.defaultValue || props.value || [0]);
  
  React.useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    props.onValueChange?.(newValue);
  };

  const currentValue = Array.isArray(value) ? value[0] : value;
  const sliderId = React.useId();
  const labelId = label ? `${sliderId}-label` : undefined;
  const valueId = `${sliderId}-value`;

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex items-center justify-between">
        {label && (
          <Label 
            id={labelId}
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </Label>
        )}
        
        {showValue && (
          <output 
            id={valueId}
            htmlFor={sliderId}
            className="min-w-[3rem] text-center font-mono text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md"
            aria-live="polite"
          >
            {currentValue}
          </output>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium w-6">
          {props.min}
        </span>
        
        <SliderPrimitive.Root
          ref={ref}
          id={sliderId}
          className="relative flex w-full touch-none select-none items-center"
          aria-labelledby={labelId}
          aria-valuetext={`${currentValue} characters`}
          {...props}
          onValueChange={handleValueChange}
        >
          <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <SliderPrimitive.Range className="absolute h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(
              "block h-6 w-6 rounded-full border-2 border-white bg-blue-600 shadow-md",
              "transition-all duration-150 ease-out",
              "hover:scale-110 hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30",
              "active:scale-95",
              "disabled:pointer-events-none disabled:opacity-50",
              "dark:border-slate-900 dark:bg-blue-500"
            )}
            aria-label={label ? `${label} slider handle` : 'Slider handle'}
          />
        </SliderPrimitive.Root>
        
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium w-8 text-right">
          {props.max}
        </span>
      </div>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
