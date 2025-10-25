import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const OTPVerify: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); // ensure max 1 char
      setOtp(newOtp);
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOTPVerify = async (e: any) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 4) {
      toast.error("Please enter the complete OTP");
      return;
    }

    try {
      console.log("OTP Verify Request:", otpCode);
      toast.success("OTP Verified successfully!");
      navigate("/new-password");
    } catch (error: any) {
      console.error("OTP Verify Error:", error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleResend = () => {
    toast.success("OTP resent successfully!");
    setOtp(["", "", "", ""]);
    const firstInput = document.getElementById("otp-0");
    firstInput?.focus();
  };

  return (
    <div className="bg-bgColor min-h-[100vh] flex items-center justify-center">
      <Container maxWidth="sm">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <div className="bg-white rounded-lg p-6 border border-primary w-full">
            <img src="/logo.png" alt="Logo" className="w-18 mb-5 mx-auto" />
            <h1 className="text-center text-primary text-2xl font-semibold mb-4">
              Verify OTP
            </h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Enter the OTP sent to your email
            </p>

            <form onSubmit={handleOTPVerify}>
              <Box display="flex" justifyContent="center" mb={5} gap={2}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", fontWeight: 600 },
                    }}
                    sx={{ width: 60, height: 60 }}
                    variant="outlined"
                  />
                ))}
              </Box>

              <div className="text-center mb-5">
                <p className="text-gray-600 mb-2">
                  A code has been sent to your email
                </p>
                <span className="text-[#FF6F61] text-xl font-semibold">
                  00:00
                </span>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="!bg-primary"
                sx={{
                  height: 50,
                  borderRadius: "20px",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "16px",
                  mb: 1.5,
                }}
              >
                Verify
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={handleResend}
                sx={{
                  color: "#FF6F61",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Resend
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default OTPVerify;
