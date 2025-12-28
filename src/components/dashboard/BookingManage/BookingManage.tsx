import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";

import BookingDetailsModal from "./BookingDetailsModal";
import BookingList from "./BookingList";


const BookingManage = () => {
  const [open, setOpen] = useState(false);  

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);


  const updateSearchParams = useUpdateSearchParams();  

  const handleSearch = (e: any) => {
    const search = e.target.value;    
    updateSearchParams({ searchTerm: search })
  };

  return (
    <div>
      {open ? <p onClick={() => setOpen(false)} className="mb-5 cursor-pointer"><ArrowLeftOutlined size={20} /> Back</p> :
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl text-primary font-semibold">Booking List</h1>
          <div className="flex gap-5">


            <TextField
              placeholder="Search by Booking  Id or Status"              
              onChange={handleSearch}
              style={{ width: "325px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
                style: {
                  borderRadius: "16px",
                  //   @ts-ignore
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
          </div>
        </div>}

      {!detailsModalOpen ? <div className="bg-white h-full shadow">
        <BookingList setSelectedBooking={setSelectedBooking} setDetailsModalOpen={setDetailsModalOpen} />
      </div>
        :
        <div className="">
          <BookingDetailsModal
            open={detailsModalOpen}
            onClose={() => {
              setDetailsModalOpen(false);
              setSelectedBooking(null);
            }}
            selectedBooking={selectedBooking}
          />
        </div>}
    </div>
  );
};

export default BookingManage;
