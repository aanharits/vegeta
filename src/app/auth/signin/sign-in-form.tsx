"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "@/validations/auth-validations";
import { LoginForm } from "@/types/auth";

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("data: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[100%] gap-4">
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Masuk akun anda
      </div>
      <div className="w-[100%] relative flex flex-col gap-1 mt-4">
        <Input
          className="w-[100%] p-4 rounded"
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          className="w-[100%] p-4 rounded-sm mt-4"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          suffix="Eye"
          onPressSuffix={() => setShowPassword(!showPassword)}
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      <Button
        className={cn("w-[320px] bg-leaf mt-6 mx-auto", hover.shadow)}
        type="submit"
      >
        Masuk
      </Button>
    </form>
  );
}

export default SignInForm;
