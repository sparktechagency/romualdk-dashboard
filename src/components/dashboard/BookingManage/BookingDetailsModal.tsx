import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import dayjs from "dayjs";

import MuiImageViewer from "../../shared/MuiImageViewer";
import { imageUrl } from "../../../redux/base/baseAPI";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedBooking: any;
};

const BookingDetailsModal = ({ open, onClose, selectedBooking }: Props) => {
  if (!selectedBooking) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "active":
        return "primary";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      {/* Header */}
      <DialogTitle className="flex items-center justify-between">
        <Typography variant="h5" fontWeight="semibold" color="primary">
          Booking Details
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Left Column - Booking Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: "#FEFEFE" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Booking Information
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", width: "40%" }}>Booking ID</TableCell>
                      <TableCell>#{selectedBooking?._id?.slice(-8) || "N/A"}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell>
                        <Chip
                          label={selectedBooking?.status?.toUpperCase() || "N/A"}
                          color={getStatusColor(selectedBooking?.status)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                      <TableCell>
                        <Chip
                          label={selectedBooking?.type?.replace("withDriver", "With Driver") || "N/A"}
                          size="small"
                          color="info"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>From Date</TableCell>
                      <TableCell>
                        {selectedBooking?.fromDate
                          ? dayjs(selectedBooking.fromDate).format("DD MMM YYYY, hh:mm A")
                          : "N/A"}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>To Date</TableCell>
                      <TableCell>
                        {selectedBooking?.toDate
                          ? dayjs(selectedBooking.toDate).format("DD MMM YYYY, hh:mm A")
                          : "N/A"}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Total Duration</TableCell>
                      <TableCell>
                        {selectedBooking?.fromDate && selectedBooking?.toDate
                          ? `${dayjs(selectedBooking.toDate).diff(
                            dayjs(selectedBooking.fromDate),
                            "hour"
                          )} hours`
                          : "N/A"}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Check-in/Check-out</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Chip
                            label={selectedBooking?.checkIn ? "Checked In" : "Not Checked In"}
                            color={selectedBooking?.checkIn ? "success" : "default"}
                            size="small"
                          />
                          <Chip
                            label={selectedBooking?.checkOut ? "Checked Out" : "Not Checked Out"}
                            color={selectedBooking?.checkOut ? "success" : "default"}
                            size="small"
                          />
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                      <TableCell>
                        {selectedBooking?.createdAt
                          ? dayjs(selectedBooking.createdAt).format("DD MMM YYYY, hh:mm A")
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Payment Information */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: "#FEFEFE", mt: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Payment Information
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", width: "40%" }}>Total Amount</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                        {formatCurrency(selectedBooking?.totalAmount)}
                      </TableCell>
                    </TableRow>

                    {selectedBooking?.transactionId && (
                      <>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>Transaction ID</TableCell>
                          <TableCell>{selectedBooking.transactionId._id?.slice(-8)}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>Payment Status</TableCell>
                          <TableCell>
                            <Chip
                              label={selectedBooking.transactionId.status?.toUpperCase()}
                              color={
                                selectedBooking.transactionId.status === "succeeded"
                                  ? "success"
                                  : selectedBooking.transactionId.status === "canceled"
                                    ? "error"
                                    : "warning"
                              }
                              size="small"
                            />
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>Payment Method</TableCell>
                          <TableCell>{selectedBooking.transactionId.method?.toUpperCase()}</TableCell>
                        </TableRow>

                        {selectedBooking.transactionId.refundAmount > 0 && (
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold", color: "error.main" }}>Refund Amount</TableCell>
                            <TableCell sx={{ color: "error.main", fontWeight: "bold" }}>
                              {formatCurrency(selectedBooking.transactionId.refundAmount)}
                            </TableCell>
                          </TableRow>
                        )}

                        {selectedBooking.transactionId.refundStatus && (
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Refund Status</TableCell>
                            <TableCell>
                              <Chip
                                label={selectedBooking.transactionId.refundStatus?.toUpperCase()}
                                color={selectedBooking.transactionId.refundStatus === "succeeded" ? "success" : "warning"}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Right Column - User, Host & Car Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 3 }}>
              <Paper elevation={0} sx={{ borderRadius: 2, bgcolor: "#FEFEFE" }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Guest Information
                </Typography>

                <Box display="flex" alignItems="center" gap={2} >
                  <Avatar
                    src={
                      selectedBooking?.userId?.profileImage
                        ? `${imageUrl}${selectedBooking.userId.profileImage}`
                        : undefined
                    }
                    sx={{ width: 60, height: 60 }}
                  >
                    {selectedBooking?.userId?.firstName?.charAt(0) || "G"}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedBooking?.userId?.fullName ||
                        `${selectedBooking?.userId?.firstName} ${selectedBooking?.userId?.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedBooking?.userId?.phone
                        ? `${selectedBooking.userId.countryCode} ${selectedBooking.userId.phone}`
                        : "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              {/* Host Information */}
              <Paper elevation={0} sx={{ borderRadius: 2, bgcolor: "#FEFEFE", }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Host Information
                </Typography>

                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar
                    src={
                      selectedBooking?.hostId?.profileImage
                        ? `${imageUrl}${selectedBooking.hostId.profileImage}`
                        : undefined
                    }
                    sx={{ width: 60, height: 60 }}
                  >
                    {selectedBooking?.hostId?.firstName?.charAt(0) || "H"}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedBooking?.hostId?.fullName ||
                        `${selectedBooking?.hostId?.firstName} ${selectedBooking?.hostId?.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedBooking?.hostId?.phone
                        ? `${selectedBooking.hostId.countryCode} ${selectedBooking.hostId.phone}`
                        : "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>




            {/* Car Information */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: "#FEFEFE", mt: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Car Information
              </Typography>

              <Box mb={2}>
                <Grid container spacing={2}>
                  {selectedBooking?.carId?.images?.slice(0, 3).map((img: string, index: number) => (
                    <Grid size={{ xs: 4, md: 4 }} key={index}>
                      <MuiImageViewer
                        src={`${imageUrl}${img}`}
                        alt={`Car ${index + 1}`}
                        height={250}                        
                        style={{ borderRadius: 8, objectFit: 'cover' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Car</TableCell>
                      <TableCell>
                        {selectedBooking?.carId?.brand} {selectedBooking?.carId?.model} ({selectedBooking?.carId?.year})
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>License Plate</TableCell>
                      <TableCell>{selectedBooking?.carId?.licensePlate || "N/A"}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Color</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              bgcolor: selectedBooking?.carId?.color?.toLowerCase() || "#ccc",
                              border: "1px solid #ddd",
                            }}
                          />
                          {selectedBooking?.carId?.color || "N/A"}
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Transmission</TableCell>
                      <TableCell>{selectedBooking?.carId?.transmission || "N/A"}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Fuel Type</TableCell>
                      <TableCell>{selectedBooking?.carId?.fuelType || "N/A"}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Seats</TableCell>
                      <TableCell>{selectedBooking?.carId?.seatNumber || "N/A"}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Daily Price</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                        {formatCurrency(selectedBooking?.carId?.dailyPrice)}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
                      <TableCell>{selectedBooking?.carId?.city || "N/A"}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Verification Status</TableCell>
                      <TableCell>
                        <Chip
                          label={selectedBooking?.carId?.verificationStatus || "N/A"}
                          color={
                            selectedBooking?.carId?.verificationStatus === "APPROVED"
                              ? "success"
                              : selectedBooking?.carId?.verificationStatus === "REJECTED"
                                ? "error"
                                : "warning"
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;