"use client";

import { AttachMoney, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const DriverPrice = () => {
  // Driver price state
  const [driverArtistPrice, setDriverArtistPrice] = useState<number>(200);

  // Modal state
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(driverArtistPrice.toString());

  const handleOpen = () => {
    setPrice(driverArtistPrice.toString());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setDriverArtistPrice(Number(price));
    setOpen(false);
  };

  return (
    <Box p={4}>
      <Box sx={{ display: "flex", width: "100%", gap: 5 }}>
        {/* ============ Artist Driver Price ============ */}
        <Box sx={{ maxWidth: 600, width: "100%" }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Driver Price for Artist
          </Typography>

          <Card sx={{ border: "1px solid rgba(255,255,255,0.5)" }}>
            <CardHeader
              title={<h1 className="text-primary">Driver Price</h1>}
              action={
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleOpen}
                >
                  Edit
                </Button>
              }
            />

            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                p={3}
                borderRadius={2}
                bgcolor="#cd671c"
                color="white"
              >
                <Box
                  sx={{
                    background: "white",
                    borderRadius: "50%",
                    padding: 1.5,
                    mr: 3,
                  }}
                >
                  <AttachMoney fontSize="large" sx={{ color: "black" }} />
                </Box>

                <Box>
                  <Typography variant="body2">Driver Price</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {driverArtistPrice}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* ================= MODAL ================= */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Driver Price</DialogTitle>

        <DialogContent>
          <TextField
            label="Driver Price (%)"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              background: "#cd671c",
              ":hover": { background: "#b45a19" },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DriverPrice;
