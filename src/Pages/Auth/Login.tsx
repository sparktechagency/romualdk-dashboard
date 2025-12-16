import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginAdminMutation } from "../../redux/features/auth/authApi";
import Cookies from "js-cookie";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useLoginAdminMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await login(values).unwrap();
      
      console.log("res", res);
      
      if (res?.success) {
        toast.success(res?.message || "Login Successful");
        Cookies.set("accessToken", res?.data?.token);        
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || "Something went wrong while logging in");
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
            <p className="text-3xl text-center text-primary font-semibold mb-7">
              Sign in to continue!
            </p>

            <form onSubmit={handleLogin}>
              <TextField
                name="email"
                type="email"
                label="Email"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your email"
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

              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"                
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineLock className="text-[#2454c4]" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? (
                          <IoMdEyeOff  />
                        ) : (
                          <IoMdEye  />
                        )}
                      </IconButton>
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

              <div className="flex items-center justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-[#131927] font-semibold underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="!bg-primary"
                sx={{
                  mt: 2,
                  py: 1.2,
                  fontWeight: "bold",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default SignIn;
