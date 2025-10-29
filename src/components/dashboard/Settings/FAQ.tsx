import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const FAQ = () => {
   const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent accordion toggle
    console.log("Edit clicked");
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent accordion toggle
    console.log("Delete clicked");
  };

  return (
    <Box sx={{maxWidth: 1000}}>
      <Accordion>
      <AccordionSummary
        expandIcon={<FaArrowDown />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="flex items-center justify-between w-full pr-5">
          <Typography component="span" sx={{fontWeight: 600}}>Question 1</Typography>
          <div className="flex items-center gap-2">
            <button onClick={handleEdit}>
              <FiEdit className="cursor-pointer" color="blue" size={20} />
            </button>
            <button onClick={handleDelete}>
              <RiDeleteBinLine className="cursor-pointer" color="#ff0000" size={20} />
            </button>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </Accordion>
    </Box>
  );
};

export default FAQ;
