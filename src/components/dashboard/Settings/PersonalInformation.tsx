import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useEditProfileMutation } from "../../../redux/features/user/userApi";
import { useGetProfileQuery } from "../../../redux/features/auth/authApi";
import { imageUrl } from "../../../redux/base/baseAPI";
import { LuUpload } from "react-icons/lu";

const PersonalInformation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState<string | null>(null);

  const [editProfile, { isLoading: editing }] = useEditProfileMutation();
  const { data: profileData, refetch } = useGetProfileQuery(undefined);

  // Prefill profile data
  useEffect(() => {
    if (profileData) {
      setFirstName(profileData?.firstName || "");
      setLastName(profileData?.lastName || "");
      setEmail(profileData?.email || "");
    }
  }, [profileData]);

  const handleProfileUpdate = async () => {
    try {
      const data = {
        firstName,
        lastName
      }
      await editProfile({ data: JSON.stringify(data) }).unwrap();
      toast.success("Profile updated successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return toast.error("No file selected");

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      await editProfile(formData).unwrap();
      toast.success("Profile image updated");
      setImageFile(null);
      setImgURL(null);
      refetch();
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <Box className="h-full">
      <Typography variant="h5" color="primary" fontWeight={600} mb={3}>
        Profile
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", lg: "1fr 2fr" }}
        gap={3}
      >
        {/* ---------------- Profile Photo ---------------- */}
        <Card variant="outlined">
          <CardHeader title="Profile Photo" />
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <Avatar
                src={
                  imgURL ??
                  (profileData?.profileImage
                    ? `${imageUrl}${profileData.profileImage}`
                    : "/placeholder.png")
                }
                sx={{ width: 200, height: 150 }}
                variant="rounded"
              />

              <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
              <Button
                variant="contained"
                component="label"
                startIcon={<LuUpload size={18} />}
              >
                Change Photo
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setImgURL(URL.createObjectURL(file));
                    }
                  }}
                />
              </Button>

              {imgURL && imageFile && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleImageUpload}
                  disabled={editing}
                >
                  {editing ? <CircularProgress size={20} /> : "Save New Photo"}
                </Button>
              )}
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* ---------------- Profile Form ---------------- */}
        <Card variant="outlined" sx={{maxWidth: 600}}>
          <CardHeader title="Profile Information" />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />

              <TextField
                label="Email"
                value={email}
                disabled
                fullWidth
              />

              <Box mt={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleProfileUpdate}
                  disabled={editing}
                >
                  {editing ? <CircularProgress size={22} /> : "Save Changes"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PersonalInformation;
