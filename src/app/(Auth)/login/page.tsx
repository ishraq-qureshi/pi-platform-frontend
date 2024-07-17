"use client"

import Button from "@/components/Layout/Button/Button";
import TextInput from "@/components/Layout/TextInput/TextInput";
import useToast from "@/hooks/useToast";
import { useLoginMutation } from "@/redux/api/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface LoginError {
  data: {
    message: string;
  }
}

const validationSchema = z.object({
  email: z.string().email().min(1, {message: "Field is required"}),
  password: z.string().min(1, {message: "Field is required"}),
})

type ValidationSchema = z.infer<typeof validationSchema>;

export default function LoginPage () {

  const router = useRouter();

  const [login, { isLoading, isError, error }] = useLoginMutation();

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
      await login({
        email: formData.email,
        password: formData.password
      }).unwrap();

      router.push("/dashboard");

    } catch (err: unknown) {
        const loginErr = err as LoginError;
        console.log("loginErr", loginErr)
        toast({
          variant: "destructive",
          message: loginErr.data.message
        })
    }
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-antiqueWhite">
      <div className="w-[667px] bg-white px-5 py-5 rounded-md flex flex-col gap-4 shadow-md">
        <h2 className="text-center text-2xl font-medium">Welcome Admin</h2>
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
        <div className="flex items-center justify-between items-end">
          <Link href={"/forgot-password"} className="text-black text-opacity-50 text-sm hover:text-opacity-100">Forget Password?</Link>
          <Button
            isLoading={isLoading}
            className="w-[200px] text-lg py-2"
            onClick={() => handleSubmit(onSubmit)()}>
            Login
          </Button>
        </div>
      </div>
   </div>
  );
}