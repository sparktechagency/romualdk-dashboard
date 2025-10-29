import { ArrowLeftOutlined } from "@ant-design/icons";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import SharedModal from "../../shared/SharedModal";
import CarAddForm from "./CarAddForm";
import CarDetails from "./CarDetails";
import CartList from "./CartList";

const CarManage = () => {
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
        <CartList  open={open} setOpen={setOpen}/>
      </div> 
      :
      <div className="">
        <CarDetails items={itemData}/>
      </div>}
      <SharedModal width={700} height={800} title="Add Car" open={openForm} handleClose={()=>setOpenForm(!openForm)}>
        <CarAddForm />
      </SharedModal>
    </div>
  );
};

export default CarManage;



export const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
];