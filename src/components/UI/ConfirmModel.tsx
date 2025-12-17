import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  danger?: boolean;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Are you sure?",
  content = "This action cannot be undone.",
  okText = "Yes, Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmLoading = false,
  danger = true,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "1.25rem",
        },
      }}
    >
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          borderBottom="1px solid"
          borderColor="primary.light"
          pb={2}
        >
          <ErrorOutlineIcon
            color={danger ? "error" : "primary"}
            fontSize="large"
          />
          <Typography variant="h6" fontWeight={600} color="primary">
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography color="text.secondary" lineHeight={1.7}>
          {content}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{ borderRadius: "0.75rem", fontWeight: 500 }}
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          color={danger ? "error" : "primary"}
          disabled={confirmLoading}
          sx={{ borderRadius: "0.75rem", fontWeight: 500 }}
        >
          {confirmLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            okText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
