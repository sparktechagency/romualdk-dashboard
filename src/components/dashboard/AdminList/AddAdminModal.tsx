import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";

const AddAdminModal = ({
  editData,
  open,
  setOpen,
  onSubmit,
}: any) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // Prefill form on edit
  useEffect(() => {
    if (editData) {
      setFormData({
        firstName: editData.firstName || "",
        lastName: editData.lastName || "",
        email: editData.email || "",
        role: editData.role || "",
        password: "",
      });
    }
  }, [editData]);

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setFormData({
       firstName: "",
    lastName: "",
      email: "",
      role: "",
      password: "",
    });
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Simple validation
  const validate = () => {
    const newErrors: any = {};

    if (!formData.firstName) newErrors.name = "Please enter first name";
    if (!formData.lastName) newErrors.name = "Please enter last name";
    if (!formData.email) {
      newErrors.email = "Please enter email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.role) newErrors.role = "Please select role";

    if (!editData && !formData.password) {
      newErrors.password = "Please enter password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editData ? "Edit Admin" : "Add Admin"}
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {/* Name */}
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />

          {/* Email */}
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />

          {/* Role */}
          <TextField
            select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
            fullWidth
          >            
            <MenuItem value="ADMIN">Admin</MenuItem>
          </TextField>

          {/* Password (only add mode) */}
          {!editData && (
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <MdOutlineVisibility />
                      ) : (
                        <MdOutlineVisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {/* Submit */}
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ height: 45, mt: 1 }}
          >
            {editData ? "Update Admin" : "Add Admin"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminModal;
