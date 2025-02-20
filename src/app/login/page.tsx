"use client";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SnackbarAlert from "../Snackbar";

interface LoginDataType {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>();
  const router = useRouter();

  const onSubmit = (data: LoginDataType) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const matchedUser = storedUsers.find(
      (user: LoginDataType) =>
        user.email === data.email && user.password === data.password
    );

    if (matchedUser) {
      console.log("Login successful:", matchedUser);
      setOpen(true);
      setTimeout(() => router.push("/"), 2000);
    } else {
      setErrorOpen(true);
    }
  };

  const [open, setOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-white/95">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-lg text-center text-gray-600 mb-4 ">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            sx={{marginBottom:"10px"}}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            sx={{marginBottom:"10px"}}
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            className="!bg-gradient-to-r !from-blue-600 !to-purple-600 !py-3 !text-lg !font-semibold !rounded-lg !shadow-lg hover:!shadow-xl transition-shadow duration-300"
          >
            Login
          </Button>
        </form>
      </div>
      <SnackbarAlert
        open={open}
        message="Login successful"
        onClose={() => setOpen(false)}
        severity="success"
      />
      <SnackbarAlert
        open={errorOpen}
        message="Invalid credentials"
        onClose={() => setErrorOpen(false)}
        severity="error"
      />
    </div>
  );
};

export default LoginPage;
