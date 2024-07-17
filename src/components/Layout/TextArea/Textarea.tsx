import * as React from "react";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import tw from "tailwind-styled-components";

import InputHelperHint from "@/components/Layout/InputHelperHint/InputHelperHint";

export const inputVariants = cva(
  `
      flex min-h-[80px] w-full
      rounded-md border border-solid
      px-3 py-2
      text-black text-sm font-medium leading-tight
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
    `,
  {
    variants: {
      paletteColor: {
        default: ``,
        error: `border-[#DD4D45] caret-[#FF1E49]`,
        success: `border-[#38B487]`,
        warning: `border-[#F09243]`,
      },
      variant: {
        outlined: `bg-[#FFFFFF]`,
        filled: `bg-[#F4F6F9] focus:bg-[#EBEDF2]`,
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
        class: "border-[rgba(66,70,79,0.30)] hover:border-black focus:border-black focus:bg-white",
      },
      {
        variant: "filled",
        paletteColor: "default",
        class: "border-[#F4F6F9] hover:border-[#EBEDF2] focus:border-[#EBEDF2]",
      },
    ],
  }
);

export const Root = tw("div")`flex flex-col items-start gap-2 self-stretch `;
export const Label = tw("label")`px-1.5 leading-snug font-semibold text-base text-zinc-700 text-opacity-70`;
export const HelperHint = tw(InputHelperHint)``;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  /**
   * Label for the field
   */
  labelText?: string;

  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  controlledMode?: boolean;
  /**
   * Used to give context about a field's input, such as how the input will be used.
   * If set the value to `null`, the hint block will be disabled
   */
  helperText?: string | React.ReactNode | null;

  inputClassname?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      paletteColor,
      labelText,
      helperText,
      value: controlledValue,
      onChange,
      controlledMode = false,
      inputClassname,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>("");

    const isControlled = controlledMode || controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      const value = event.target.value;

      if (!isControlled) {
        setInternalValue(value);
      }

      onChange?.(event);
    }

    return (
      <Root className={className}>
        {labelText && <Label htmlFor={props.id}>{labelText}</Label>}
        <textarea
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          className={cn(inputVariants({ paletteColor, variant }), inputClassname)}
          {...props}
        />
        {helperText !== null && <HelperHint paletteColor={paletteColor}>{helperText}</HelperHint>}
      </Root>
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
