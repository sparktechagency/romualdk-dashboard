import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { imageUrl } from "../../../redux/base/baseAPI";
import MuiImageViewer from "../../shared/MuiImageViewer";
import dayjs from "dayjs";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedGuest: any;
};

const GuestDetailsModal = ({ open, onClose, selectedGuest }: Props) => {
  console.log('selectedGuest', selectedGuest);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      {/* Modal Header */}
      <DialogTitle className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Guest Details</h2>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Modal Content */}
      <DialogContent dividers>
        <div className="h-full">
          <Grid container spacing={5}>
            <Grid
              sx={{ background: "#FEFEFE" }}
              className="shadow p-5 !rounded-2xl"
              size={{ xs: 12 }}
            >
              {/* Profile Image */}
              <div className="w-[200px] h-[250px] mb-4">
                <Avatar
                  src={`${imageUrl}${selectedGuest?.profileImage}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 5,
                  }}
                />
              </div>

              {/* User Information */}
              <h3 className="font-semibold text-lg mb-5">User Information</h3>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>Name</Grid>
                <Grid size={{ xs: 6 }}>{selectedGuest?.fullName}</Grid>

                <Grid size={{ xs: 6 }}>Date of Birth</Grid>
                <Grid size={{ xs: 6 }}>{dayjs(selectedGuest?.dateOfBirth).format('DD MMM YYYY')}</Grid>
                
                <Grid size={{ xs: 6 }}>Contact</Grid>
                <Grid size={{ xs: 6 }}>{selectedGuest?.phone}</Grid>

                <Grid size={{ xs: 6 }}>Address</Grid>
                <Grid size={{ xs: 6 }}>{selectedGuest?.city ?? 'N/A'}</Grid>

                <Grid size={{ xs: 6 }}>Booking</Grid>
                <Grid size={{ xs: 6 }}>5</Grid>



                <Grid size={{ xs: 6 }}>Join Date</Grid>
                <Grid size={{ xs: 6 }}>{dayjs(selectedGuest?.createdAt).format('DD MMM YYYY')}</Grid>
              </Grid>

              {/* Documents */}
              <h3 className="text-xl mb-3 font-semibold border-t border-slate-300 mt-5 pt-5">
                Guest Documents
              </h3>

              <div className="flex items-center gap-10">
                <div className="flex items-center gap-3 cursor-pointer">
                  <MuiImageViewer src={selectedGuest.nidFrontPic ? `${imageUrl}${selectedGuest.nidFrontPic}` : '/placeholder.png'} alt="NID Front" width={60} />
                </div>

                <div className="flex items-center gap-3 cursor-pointer">
                  <MuiImageViewer src={selectedGuest.nidBackPic ? `${imageUrl}${selectedGuest.nidBackPic}` : '/placeholder.png'} alt="NID Front" width={60} />                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuestDetailsModal;
