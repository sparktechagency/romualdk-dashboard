import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { FaSearch } from "react-icons/fa";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import { getSearchParams } from "../../../utils/getSearchParams";
import SharedModal from "../../shared/SharedModal";
import HostRequestList from "./HostRequestList";
import HostRequestDetails from "./HostRequestDetails";
import HostRequestForm from "./HostRequestForm";


const HostRequest = () => {
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
  const [searchText, setSearchText] = useState("");

  const updateSearchParams = useUpdateSearchParams();
  const {searchTerm} = getSearchParams();
  
  
  useEffect(()=>{
setSearchText(searchTerm)
  },[searchTerm]);

  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchText(search);
    updateSearchParams({searchTerm: search})
  };

  return (
    <div>
      {open ? <p onClick={()=>setOpen(false)} className="mb-5 cursor-pointer"><ArrowLeftOutlined size={20}/> Back</p> :
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl text-primary font-semibold">Property List</h1>
        <div className="flex gap-5">
          <Button
            onClick={()=>setOpenForm(true)}
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
        <HostRequestList  open={open} setOpen={setOpen}/>
      </div> 
      :
      <div className="">
        <HostRequestDetails open={open} setOpen={setOpen}/>
      </div>}
      <SharedModal width={700} height={800} title="Add Car" open={openForm} handleClose={()=>setOpenForm(!openForm)}>
        <HostRequestForm />
      </SharedModal>
    </div>
  );
};

export default HostRequest;
