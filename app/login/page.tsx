"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import useDataStore from "@/store/useDataStore";
import tokenManager from "@/api/tokenManager";
import { useRouter } from "next/navigation";
import InputField from "@/components/global/inputs/InputField";
import Button from "@/components/global/Button";

// Zod validation schema with updated password rules
const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot be longer than 20 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .max(50, "Password cannot be longer than 50 characters"),
});

type FormData = z.infer<typeof schema>;

const MOCK_USERS = [
  { username: "admin", password: "Admin123.", role: "admin" },
  { username: "editor", password: "Editor123.", role: "editor" },
];

const LoginPage = () => {
  const setUser = useDataStore((state) => state.setUser);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues:{
      username: "",
      password:""
    },
    mode: "onChange"
  });

  const onSubmit = (data: FormData) => {
    const user = MOCK_USERS.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (!user) {
      toast.error("Invalid username or password");
      return;
    }

    setUser({ username: user.username, role: user.role as "admin" | "editor" });
    tokenManager.setUser({
      username: user.username,
      role: user.role as "admin" | "editor",
    });
    toast.success("Logged in successfully");
    router.push("/dashboard");
  };

  return (
    <section className="h-screen w-full bg-black/50 flex items-center justify-center bg-blur-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={twMerge(
          "bg-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-3"
        )}
      >
        <h1 className="text-3xl text-center font-semibold mb-6 text-blue-500">
          Welcome Back!
        </h1>

        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <InputField
              label="Username"
              type="text"
              placeholder="Enter your username"
              error={errors.username?.message}
              {...field}
              classNames=""
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              visibilityToggle={true}
              {...field}
              classNames=""
            />
          )}
        />

        <Button
          type="submit"
          label="Login"
          buttonType="primary"
          classNames="w-full py-3 mt-4"
          isLoading={isSubmitting}
          isDisabled={!isValid}
        />
      </form>
    </section>
  );
};

export default LoginPage;
