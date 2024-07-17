"use client"

import Button from "@/components/Layout/Button/Button";
import TextInput from "@/components/Layout/TextInput/TextInput";
import useToast from "@/hooks/useToast";
import { useResetPasswordMutation } from "@/redux/api/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface ResetPasswordError {
  data: {
    message: string;
  }
}

const validationSchema = z.object({
  email: z.string().email().min(1, {message: "Field is required"}),
  password: z.string().min(8, {message: "Minimum 8 characters password"}),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Confirm password should match password",
  path: ["confirmPassword"]
})

type ValidationSchema = z.infer<typeof validationSchema>;

export default function ResetPasswordPage () {  

  const router = useRouter();

  const [handleResetPassword, { isLoading, isError, error }] = useResetPasswordMutation();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const adminEmail = searchParams.get("email");

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),    
    values: {
      email: adminEmail ?? "",  
      password: "",
      confirmPassword: ""    
    }
  })  

  const onSubmit: SubmitHandler<ValidationSchema> = async (formData) => {
    try {
      if(!token) {
        toast({
          variant: "destructive",
          message: "Reset token is not set"
        });
        return false;
      }
      const response = await handleResetPassword({
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        token
      }).unwrap();

      toast({
        variant: "positive",
        message: response.message
      });

      router.push("/login");

    } catch (err: unknown) {
        const error = err as ResetPasswordError;        
        toast({
          variant: "destructive",
          message: error.data.message
        })
    }
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-antiqueWhite">
      <div className="w-[667px] bg-white px-5 py-5 rounded-md flex flex-col gap-4 shadow-md">
        <h2 className="text-center text-2xl font-medium">Reset Password</h2>
        <div>
          <TextInput
            { ...register("email") }
            type="email"
            value={adminEmail ?? ""}
            helperText={errors.email ? errors.email.message : null}
            labelText="Email"
            placeholder="Enter your email"
            paletteColor={errors.email ? "error" : "default"}
            disabled
          />
        </div>
        <div>
          <TextInput
            { ...register("password") }
            type="password"
            helperText={errors.password ? errors.password.message : null}
            labelText="Password"
            placeholder="Enter your password"
            paletteColor={errors.password ? "error" : "default"}
          />
        </div>
        <div>
          <TextInput
            { ...register("confirmPassword") }
            type="password"
            helperText={errors.confirmPassword ? errors.confirmPassword.message : null}
            labelText="Confirm Password"
            placeholder="Enter your confirm password"
            paletteColor={errors.confirmPassword ? "error" : "default"}
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