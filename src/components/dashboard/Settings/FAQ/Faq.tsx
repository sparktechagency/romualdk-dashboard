import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FiEdit, FiPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import toast from "react-hot-toast";

import FaqAddModal from "./FaqAddModal";
// ← MUI version

import ConfirmModal from "../../../UI/ConfirmModel";
import { useDeleteFAQMutation, useGetFAQQuery } from "../../../../redux/features/setting/settingApi";

const FAQ = () => {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [editData, setEditData] = useState<any | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<any | null>(null);

  const { data: faqData, refetch } = useGetFAQQuery(undefined);
  const [deleteFAQ] = useDeleteFAQMutation();

  // -------- Delete Action --------
  const handleDeleteFAQ = async () => {
    try {
      const res = await deleteFAQ(selectedFaq?._id);
      if (res?.data) {
        toast.success("Delete FAQ Successfully");
        setOpenConfirm(false);
        setSelectedFaq(null);
        refetch();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Box className="md:p-6 rounded-2xl bg-white h-full">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h6" color="primary" fontWeight={600}>
          FAQ
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<FiPlus size={20} />}
          onClick={() => setOpen(true)}
        >
          Add FAQ
        </Button>
      </Box>

      {/* FAQ List */}
      {faqData?.map((faq: any, index: number) => (
        <Accordion key={faq._id || index} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography fontWeight={500}>{faq.question}</Typography>

              <Box display="flex" gap={1}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                    setEditData(faq);
                  }}
                >
                  <FiEdit />
                </IconButton>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenConfirm(true);
                    setSelectedFaq(faq);
                  }}
                >
                  <GoTrash className="text-red-500" />
                </IconButton>
              </Box>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Typography color="text.secondary" textAlign="justify">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Add / Edit Modal */}
      <FaqAddModal
        open={open}
        setOpen={setOpen}
        editData={editData}
        setEditData={setEditData}
        refetch={refetch}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        open={openConfirm}
        title="Delete FAQ?"
        content={`Are you sure you want to delete "${selectedFaq?.question}"?`}
        okText="Yes, Delete"
        cancelText="Cancel"
        danger
        onConfirm={handleDeleteFAQ}
        onCancel={() => {
          setOpenConfirm(false);
          setSelectedFaq(null);
        }}
      />
    </Box>
  );
};

export default FAQ;
