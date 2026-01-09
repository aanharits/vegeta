"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "@/validations/auth-validations";
import { RegisterForm } from "@/types/auth";
import { useRegisterMutation } from "@/services/auth";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(SignUpSchema),
  });

  const [registerMutation] = useRegisterMutation();

  const onSubmit = async(data: RegisterForm) => {
    try {
      const res = await registerMutation(data).unwrap();
      
      if (res.success) {
        const user = await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: searchParams.get("callbackUrl") || "/",
          redirect: false,
        });
        
        router.push(user?.url || "/");
      } else {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Please check your email and password",
            duration: 2000,
          });
        }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[100%] gap-4">
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 mt-14 text-center">
        Buat akun baru
      </div>
      <div className="w-[100%] relative flex flex-col gap-1">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type="text"
          placeholder="Nama Lengkap"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          className="w-[100%] p-4 rounded-sm mt-2"
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          className="w-[100%] p-4 rounded-sm mt-2"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          suffix="Eye"
          onPressSuffix={() => setShowPassword(!showPassword)}
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          className="w-[100%] p-4 rounded-sm mt-2"
          type={showConfirmationPassword ? "text" : "password"}
          placeholder="Konfirmasi Kata Sandi"
          suffix="Eye"
          onPressSuffix={() =>
            setShowConfirmationPassword(!showConfirmationPassword)
          }
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Button
        type="submit"
        className={cn("w-[320px] bg-leaf mt-6 mx-auto", hover.shadow)}
      >
        Buat Akun
      </Button>
    </form>
  );
}

export default SignUpForm;
