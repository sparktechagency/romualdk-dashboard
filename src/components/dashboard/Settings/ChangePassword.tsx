import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CiLock } from "react-icons/ci";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 👁 Separate visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [changePassword] = useChangePasswordMutation();

  useEffect(() => {
    if (confirmPassword && confirmPassword !== newPassword) {
      setError("Confirm password does not match");
    } else {
      setError("");
    }
  }, [newPassword, confirmPassword]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;
    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      Cookies.remove("accessToken");      
      toast.success(res?.message);
      window.location.reload();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box className="flex items-center justify-center h-full">
      <Box className="w-xl p-6 shadow-md rounded-xl max-w-xl border bg-white">
        <Typography
          variant="h5"
          className="flex items-center gap-3 justify-center font-semibold text-primary"
        >
          Change Password <CiLock size={25} />
        </Typography>

        <Box component="form" onSubmit={onSubmit}>
          {/* Current Password */}
          <TextField
            fullWidth
            type={showCurrentPassword ? "text" : "password"}
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowCurrentPassword((prev) => !prev)
                    }
                    edge="end"
                  >
                    {showCurrentPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, mt: 3 }}
            required
          />

          {/* New Password */}
          <TextField
            fullWidth
            type={showNewPassword ? "text" : "password"}
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showNewPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
            required
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
