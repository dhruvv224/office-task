"use client";
import React from "react";
import { Snackbar, Grow } from "@mui/material";

type SnackbarAlertProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  severity?: "success" | "error" | "info" | "warning";
  duration?: number;
};

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  message,
  onClose,
  severity = "info",
  duration = 2000,
}) => {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }[severity];

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Grow in={open} timeout={2000}>
        <div className={`${bgColor} text-white px-4 py-2 rounded-lg`}>{message}</div>
      </Grow>
    </Snackbar>
  );
};

export default SnackbarAlert;
