import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { HiOutlineMailOpen } from "react-icons/hi";
import { InputAdornment } from "@mui/material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = {
      email: formData.get("email") as string,
    };

    try {
      if (!values.email) {
        toast.error("Please enter your email");
        return;
      }

      // Simulate API call
      console.log("Forgot Password Request:", values);

      toast.success("Verification code sent to your email!");
      navigate("/verify-otp");
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
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
              Reset Password
            </h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Please enter your email address to receive a password reset link.
            </p>

            <form onSubmit={handleForgotPassword}>
              <TextField
                name="email"
                type="email"
                label="Email"
                fullWidth
                required
                variant="outlined"
                placeholder="example@gmail.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HiOutlineMailOpen className="text-[#2454c4]" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#0095FF",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0095FF",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="!bg-primary"
                sx={{
                  mt: 3,
                  py: 1.2,
                  fontWeight: "bold",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Continue
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default ForgotPassword;
