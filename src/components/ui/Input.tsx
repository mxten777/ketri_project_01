import { forwardRef, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * Input Component
 * 상태값 규칙 강제: hover/active/disabled/focus
 */

const inputVariants = cva(
  [
    "w-full rounded-lg border bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]",
    "transition-all duration-base",
    "placeholder:text-[var(--color-text-tertiary)]",
    // Focus State (접근성)
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 focus:border-transparent",
    // Disabled State
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-bg-secondary)]",
  ],
  {
    variants: {
      size: {
        sm: "h-[var(--input-height-sm)] px-3 text-body-sm",  // 40px
        md: "h-[var(--input-height-md)] px-4 text-body-md",  // 48px
        lg: "h-[var(--input-height-lg)] px-4 text-body-lg",  // 56px
      },
      variant: {
        default: "border-[var(--color-border)] hover:border-[var(--color-border-hover)]",
        error: "border-error-500 focus:ring-error-500",
        success: "border-success-500 focus:ring-success-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      variant,
      label,
      error,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorVariant = error ? "error" : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-label-md text-[var(--color-text-secondary)] mb-2"
          >
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={cn(inputVariants({ size, variant: errorVariant }), className)}
          {...props}
        />
        
        {error && (
          <p className="mt-2 text-body-sm text-error-500" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-2 text-body-sm text-[var(--color-text-tertiary)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
