import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { FaSearch } from "react-icons/fa";
import HostsList from "./HostsList";
import HostDetails from "./HostDetails";
import { ArrowLeftOutlined } from "@ant-design/icons";

const CarManage = () => {
    const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchText(search);
  };

  return (
    <div>
      {open ? <p onClick={()=>setOpen(false)} className="mb-5 cursor-pointer"><ArrowLeftOutlined size={20}/> Back</p> :
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl text-primary font-semibold">Property List</h1>
        <div className="flex gap-5">
          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon fontSize="medium" />}
            sx={{ background: "var(--color-black)" }}
          >
            Add More
          </Button>

          <TextField
            placeholder="Search by name, email or service..."
            value={searchText}
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

     {!open ?  <div className="bg-white h-full shadow">
        <HostsList  open={open} setOpen={setOpen}/>
      </div> 
      :
      <div className="">
        <HostDetails open={open} setOpen={setOpen}/>
      </div>}
    </div>
  );
};

export default CarManage;
