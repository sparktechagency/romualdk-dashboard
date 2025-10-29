import React from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface SharedModalProps {
  title?: string;
  width?: number | string;
  height?: number | string;
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

const SharedModal: React.FC<SharedModalProps> = ({
  title = "Title",
  width = 500,
  height,
  open,
  handleClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center",  justifyContent: "center" }}
    >
      <Box
        sx={{
          width,
          height: height,
          maxHeight: '85vh',
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 3,
          position: "relative",
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}    
          sx={{paddingBottom: 2, borderBottom: '1px solid #ededed'}}      
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <ClearIcon />
          </IconButton>
        </Box>

        {/* Modal Body */}
        <Box>{children}</Box>
      </Box>
    </Modal>
  );
};

export default SharedModal;
