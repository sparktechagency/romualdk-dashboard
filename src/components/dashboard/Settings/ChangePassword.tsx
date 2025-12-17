import { Button, TextField, Box, Typography } from "@mui/material";
import { CiLock } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import Cookies from "js-cookie";


export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [changePassword] = useChangePasswordMutation();

  // 🔁 Revalidate when passwords change
  useEffect(() => {
    if (confirmPassword && confirmPassword !== newPassword) {
      setError("Confirm password does not match");
    } else {
      setError("");
    }
  }, [newPassword, confirmPassword]);

  const onSubmit = async (e:any) => {
    e.preventDefault();

    if (error) return;

    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();
      
      Cookies.remove('accessToken');
      toast.success(res?.message);
    } catch (error:any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box className="flex items-center justify-center h-full">
      <Box className="w-xl p-6 shadow-md rounded-xl max-w-xl border bg-white">
        <Typography
          variant="h5"
          className="flex items-center gap-3 justify-center font-semibold  text-primary"
        >
          Change Password <CiLock size={25} />
        </Typography>

        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ mb: 2, mt: 3 }}
            required
          />

          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            sx={{ mb: 3 }}
            required
          />

          <Box className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#3ab8bb" }}
              disabled={Boolean(error)}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
