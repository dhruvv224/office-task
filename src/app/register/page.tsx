"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import { useForm, Controller, set } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import Grow, { GrowProps } from '@mui/material/Grow';
import SnackbarAlert from "../Snackbar";

export default function RegisterPage() {
  // Define User Data Type
  interface UserDataType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNo: string;
    dateOfbirth: string;
    confirmPassword: string;
    gender: string;
    address: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<UserDataType>();

  const onSubmit = (data: UserDataType) => {
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    existingUsers.push(data);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    console.log("User saved:", data);
    setOpen(true);
  };

  const textFieldStyles = {
    borderRadius: "20px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& input": {
      color: "white",
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px black inset",
        WebkitTextFillColor: "white",
      },
      "&:-webkit-autofill:focus": {
        WebkitBoxShadow: "0 0 0 1000px black inset !important",
        WebkitTextFillColor: "white !important",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white",
    },
  };
  const [open, setOpen] =useState<boolean>(false);

  return (
    <div className="md:flex min-h-screen bg-black items-center justify-center p-4 overflow-y-auto">
      {/* Left Side - Image Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex md:flex-row md:w-1/2 items-center justify-center rounded-lg shadow-lg p-4 w-full"
      >
        <img
          src="/4669613.jpg"
          alt="Decorative"
          className="w-full h-auto md:h-full object-cover rounded-2xl"
        />
      </motion.div>

      {/* Right Side - Register Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="register page flex flex-col items-center justify-center w-full md:w-1/2 p-8 rounded-lg shadow-2xl"
      >
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-black bg-opacity-50 backdrop-blur-md">
          <h2 className="text-4xl font-sans font-semibold text-white mb-4">
            Register Page
          </h2>
          <p className="text-base md:text-xl text-gray-300 mb-6">
            Enter your details and register to join us!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              {...register("firstName", {
                required: "First Name is required",
              })}
              error={!!errors.firstName}
              helperText={
                errors.firstName?.message
                  ? String(errors.firstName.message)
                  : ""
              }
              sx={textFieldStyles}
            />

            {/* Last Name Field */}
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              {...register("lastName", { required: "Last Name is required" })}
              error={!!errors.lastName}
              helperText={
                errors.lastName?.message
                  ? String(errors.lastName.message)
                  : ""
              }
              sx={textFieldStyles}
            />

            {/* Email Field */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                  message: "Invalid Email",
                },
              })}
              error={!!errors.email}
              helperText={
                errors.email?.message ? String(errors.email.message) : ""
              }
              sx={textFieldStyles}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              error={!!errors.password}
              helperText={
                errors.password?.message ? String(errors.password.message) : ""
              }
              sx={textFieldStyles}
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword?.message
                  ? String(errors.confirmPassword.message)
                  : ""
              }
              sx={textFieldStyles}
            />

            {/* Phone Number Field */}
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              {...register("phoneNo", { required: "Phone Number is required" })}
              error={!!errors.phoneNo}
              helperText={
                errors.phoneNo?.message ? String(errors.phoneNo.message) : ""
              }
              sx={textFieldStyles}
            />

            {/* Address Field */}
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              {...register("address", { required: "Address is required" })}
              error={!!errors.address}
              helperText={
                errors.address?.message ? String(errors.address.message) : ""
              }
              sx={textFieldStyles}
            />

            {/* Date of Birth Field */}
            <div className="flex items-center justify-between w-full">
              <label
                htmlFor="dob"
                className="text-white text-[18px] font-normal"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                {...register("dateOfbirth", {
                  required: "Date of Birth is required",
                  validate: (value) => {
                    const today = new Date();
                    const birthDate = new Date(value);
                    const age =
                      today.getFullYear() - birthDate.getFullYear();
                    return age >= 18 || "You must be at least 18 years old";
                  },
                })}
                className="w-[50%] px-2 py-2 rounded-lg bg-gray-100"
              />
            </div>

            {/* Gender Field */}
            <div className="flex gap-6 w-full mt-6">
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <FormControl component="fieldset" error={!!errors.gender}>
                    <FormLabel sx={{ color: "#fff" }}>Gender</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="female"
                        control={
                          <Radio
                            sx={{
                              color: "white",
                              "&.Mui-checked": { color: "white" },
                            }}
                          />
                        }
                        label={<span style={{ color: "white" }}>Female</span>}
                      />
                      <FormControlLabel
                        value="male"
                        control={
                          <Radio
                            sx={{
                              color: "white",
                              "&.Mui-checked": { color: "white" },
                            }}
                          />
                        }
                        label={<span style={{ color: "white" }}>Male</span>}
                      />
                    </RadioGroup>
                    {errors.gender && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.gender.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>

            <div className="flex items-center justify-center mt-6">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "9999px",
                  padding: "12px",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": { backgroundColor: "gray" },
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
      {/* snackbar toast MUI */}
      
     <SnackbarAlert open={open} message="User Registered Successfully"onClose={()=>setOpen(false)} severity="success">
      

     </SnackbarAlert>
    </div>
  );
}
