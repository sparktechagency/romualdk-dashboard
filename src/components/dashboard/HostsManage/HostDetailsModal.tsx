import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
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
  TableRow
} from "@mui/material";
import dayjs from "dayjs";
import { imageUrl } from "../../../redux/base/baseAPI";
import MuiImageViewer from "../../shared/MuiImageViewer";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedHost: any;
};

const HostDetailsModal = ({ open, onClose, selectedHost }: Props) => {
  if (!selectedHost) return null;

  const fullName = `${selectedHost.firstName} ${selectedHost.lastName}`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Header */}
      <DialogTitle className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Host Details</h2>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent dividers>
        <Grid container spacing={5}>
          <Grid
            sx={{ background: "#FEFEFE" }}
            className="shadow p-5 !rounded-2xl"
            size={{ xs: 12 }}
          >
            {/* Profile Placeholder */}
            <div className="w-[200px] h-[200px] mb-4">
              <Avatar
                src={`${imageUrl}${selectedHost?.profileImage}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 5,
                }}
              />
            </div>

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <h4 className="font-semibold text-lg mt-2 mb-2">Host Information</h4>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell>{fullName}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Role</strong></TableCell>
                    <TableCell>{selectedHost.role}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Date of Birth</strong></TableCell>
                    <TableCell>
                      {dayjs(selectedHost.dateOfBirth).format("DD MMM YYYY")}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Contact</strong></TableCell>
                    <TableCell>
                      {selectedHost.countryCode} {selectedHost.phone}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Host Status</strong></TableCell>
                    <TableCell>{selectedHost.hostStatus}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Verification</strong></TableCell>
                    <TableCell>
                      {selectedHost.verified ? "Verified" : "Not Verified"}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Total Cars</strong></TableCell>
                    <TableCell>{selectedHost.totalCars}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Join Date</strong></TableCell>
                    <TableCell>
                      {dayjs(selectedHost.createdAt).format("DD MMM YYYY")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>


            {/* Documents */}
            <h3 className="text-xl mb-3 font-semibold mt-5 pt-5">
              Host Documents
            </h3>

            <div className="flex items-center gap-10">
              <MuiImageViewer
                src={
                  selectedHost.nidFrontPic
                    ? `${imageUrl}${selectedHost.nidFrontPic}`
                    : "/placeholder.png"
                }
                alt="NID Front"
                width={80}
              />

              <MuiImageViewer
                src={
                  selectedHost.nidBackPic
                    ? `${imageUrl}${selectedHost.nidBackPic}`
                    : "/placeholder.png"
                }
                alt="NID Back"
                width={80}
              />
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default HostDetailsModal;
