"use client"

import Button from "@/components/Layout/Button/Button";
import TextInput from "@/components/Layout/TextInput/TextInput";
import useToast from "@/hooks/useToast";
import { useForgotPasswordMutation } from "@/redux/api/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface ForgotPasswordError {
  data: {
    message: string;
  }
}

const validationSchema = z.object({
  email: z.string().email().min(1, {message: "Field is required"}),  
})

type ValidationSchema = z.infer<typeof validationSchema>;

export default function ForgotPasswordPage () {  

  const [sendRestLink, { isLoading, isError, error }] = useForgotPasswordMutation();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  })  

  const onSubmit: SubmitHandler<ValidationSchema> = async (formData) => {
    try {
      const response = await sendRestLink({
        email: formData.email
      }).unwrap();

      toast({
        variant: "positive",
        message: response.message
      })
    } catch (err: unknown) {
        const error = err as ForgotPasswordError;        
        toast({
          variant: "destructive",
          message: error.data.message
        })
    }
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-antiqueWhite">
      <div className="w-[667px] bg-white px-5 py-5 rounded-md flex flex-col gap-4 shadow-md">
        <h2 className="text-center text-2xl font-medium">Forgot Password</h2>
        <div>
          <TextInput
            { ...register("email") }
            type="email"
            helperText={errors.email ? errors.email.message : null}
            labelText="Email"
            placeholder="Enter your email"
            paletteColor={errors.email ? "error" : "default"}
          />
        </div>        
        <div className="flex items-center justify-between items-end">
          <Link href={"/login"} className="text-black text-opacity-50 text-sm hover:text-opacity-100">Back to login</Link>          
          <Button className="w-[150px] text-lg py-2" isLoading={isLoading} onClick={() => handleSubmit(onSubmit)()}>
            Submit
          </Button>
        </div>
      </div>
   </div>
  );
}