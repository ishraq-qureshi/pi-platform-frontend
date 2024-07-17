"use client";

import * as React from "react";
import { type ChangeEvent, useState } from "react";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import InputHelperHint from "@/components/Layout/InputHelperHint/InputHelperHint";
import tw from "tailwind-styled-components";
import { type ClassValue } from "clsx";

export const inputVariants = cva(
  `
    flex items-center self-stretch
    w-full h-full
    text-black text-sm font-medium leading-tight
    focus:border-none focus:outline-none
    disabled:cursor-not-allowed
  `,
  {
    variants: {
      paletteColor: {
        default: ``,
        error: `caret-[#FF1E49]`,
        success: ``,
        warning: ``,
      },
      variant: {
        outlined: `bg-[#FFFFFF]`,
        filled: `bg-[#F4F6F9] focus-within:bg-[#EBEDF2]`,
      },
    },
    defaultVariants: {
      variant: "outlined",
      paletteColor: "default",
    },
  }
);

export const rootInputVariants = cva(
  `
    flex flex-row self-stretch items-center gap-2.5
    rounded-md border border-solid
    h-12 px-4 py-3
  `,
  {
    variants: {
      paletteColor: {
        default: ``,
        error: `border-[#DD4D45]`,
        success: `border-[#38B487]`,
        warning: `border-[#F09243]`,
      },
      variant: {
        outlined: `bg-white disabled:bg-[#000000]`,
        filled: `bg-[#F4F6F9] focus-within:bg-[#EBEDF2]`,
      },
    },
    defaultVariants: {
      variant: "outlined",
      paletteColor: "default",
    },
    compoundVariants: [
      {
        variant: "outlined",
        paletteColor: "default",
        class:
          "border-[rgba(66,70,79,0.30)] hover:border-black focus-within:bg-white focus-within:border-black",
      },
      {
        variant: "filled",
        paletteColor: "default",
        class: "border-[#F4F6F9] hover:border-[#EBEDF2] focus-within:border-[#EBEDF2]",
      },
    ],
  }
);

export const helperHintVariants = cva(``, {
  variants: {
    paletteColor: {
      default: ``,
      error: `text-[#FF1E49]`,
      success: `text-[#38B487]`,
      warning: `text-[#F09243]`,
    },
    variant: {
      outlined: ``,
      filled: ``,
    },
  },
  defaultVariants: {
    variant: "outlined",
    paletteColor: "default",
  },
});

export const Root = tw("div")`flex flex-col items-start gap-2`;

export const Label = tw("label")`px-1.5 leading-snug font-medium text-base text-black`;

export const Input = tw("input")``;
export const HelperHint = tw(InputHelperHint)`text-sm`;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  /**
   * Label for the field
   */
  labelText?: string | React.ReactNode;
  /**
   * Used to give context about a field's input, such as how the input will be used.
   * If set the value to `null`, the hint block will be disabled
   */
  helperText?: string | React.ReactNode | null;
  /**
   * Determines if the input is required and adds an asterisk next to the label
   */
  required?: boolean;
  /**
   * The default value of the input
   */
  defaultValue?: string;
  /**
   * The value of the input
   */
  value?: string;
  /**
   * Callback function that is called when the input's value changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Explicitly set the input to be in controlled mode
   */
  controlledMode?: boolean;
  /**
   * This can be used to add a prefix to an input. For instance, you can use an icon or text
   */
  startAdornment?: React.JSX.Element;
  /**
   * This can be used to add a suffix to an input. For instance, you can use an icon or text
   */
  endAdornment?: React.JSX.Element;

  /**
   * The class name for the container element
   */
  containerClassName?: ClassValue;
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerClassName,
      className,
      type,
      variant,
      paletteColor,
      helperText,
      labelText,
      required,
      value: controlledValue,
      onChange,
      controlledMode = false,
      startAdornment,
      endAdornment,
      defaultValue = "",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>(defaultValue);

    const isControlled = controlledMode || controlledValue !== undefined;

    const currentValue = isControlled ? controlledValue : internalValue;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const value = event.target.value;

      if (!isControlled) {
        setInternalValue(value);
      }

      onChange?.(event);
    }

    return (
      <Root className={className}>
        {labelText && (
          <Label htmlFor={props.id}>
            {labelText}
            {required && <span>*</span>}
          </Label>
        )}
        <div
          className={cn(
            rootInputVariants({ paletteColor, variant, className: containerClassName }),
            props.disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
          )}
        >
          {startAdornment && (
            <div className={cn(helperHintVariants({ paletteColor, variant }))}>
              {startAdornment}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(inputVariants({ paletteColor, variant }))}
            value={currentValue}
            onChange={handleChange}
            {...props}
          />
          {endAdornment && (
            <div className={cn(helperHintVariants({ paletteColor, variant }))}>{endAdornment}</div>
          )}
        </div>
        {helperText !== null && (
          <InputHelperHint paletteColor={paletteColor}>{helperText}</InputHelperHint>
        )}
      </Root>
    );
  }
);
TextInput.displayName = "TextInput";

export default TextInput;
