import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const NewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleNewPassword = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = {
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      console.log("New Password Request:", values);
      toast.success("Password updated successfully!");
      navigate("/"); // Redirect to SignIn page
    } catch (error: any) {
      console.error("New Password Error:", error);
      toast.error(error?.message || "Something went wrong");
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
            <img src="/logo.png" alt="Logo" className="w-24 mb-5 mx-auto" />
            <h1 className="text-center text-primary text-2xl font-semibold mb-4">
              Set New Password
            </h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Create a strong password to keep your account secure.
            </p>

            <form onSubmit={handleNewPassword}>
              <TextField
                name="newPassword"
                type={showPassword ? "text" : "password"}
                label="New Password"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="New Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? (
                          <MdOutlineVisibilityOff />
                        ) : (
                          <MdOutlineVisibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#0095FF" } }}
              />

              <TextField
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Confirm Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleConfirmPassword} edge="end">
                        {showConfirmPassword ? (
                          <MdOutlineVisibilityOff />
                        ) : (
                          <MdOutlineVisibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#0095FF" } }}
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
                Update
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default NewPassword;
