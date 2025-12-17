import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddFAQMutation, useUpdateFAQMutation } from "../../../../redux/features/setting/settingApi";

const FaqAddModal = ({
  open,
  setOpen,
  editData,
  setEditData,
  refetch,
}: any) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [addFAQ] = useAddFAQMutation();
  const [updateFAQ] = useUpdateFAQMutation();

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    setEditData(null);
    setOpen(false);
  };

  useEffect(() => {
    if (editData) {
      setQuestion(editData?.question || "");
      setAnswer(editData?.answer || "");
    }
  }, [editData]);

  const onSubmit = async () => {
    if (!question || !answer) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editData) {
        await updateFAQ({
          id: editData?._id,
          data: { question, answer },
        }).unwrap();

        toast.success("FAQ updated successfully");
      } else {
        await addFAQ({ question, answer }).unwrap();
        toast.success("FAQ added successfully");
      }

      refetch();
      handleClose();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Typography variant="h6" color="primary" fontWeight={600}>
          {editData ? "Update FAQ" : "Add FAQ"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label={editData ? "Update FAQ" : "Add FAQ"}
            placeholder="Your faq question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label={editData ? "Update Answer" : "Add Answer"}
            placeholder="Your faq answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button
          variant="contained"
          size="large"
          onClick={onSubmit}
        >
          {editData ? "Update FAQ" : "Add FAQ"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FaqAddModal;
