import React, { useState } from "react";

import { IconButton, Menu, MenuItem, styled, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { MdMoreVert } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { useGetCarsQuery } from "../../../redux/features/cars/carApi";

const imageURL =
  "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg";
const hostImage = "/placeholder.png";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3ab8bb",
    color: theme.palette.common.white,
    fontWeight: 500,
    fontSize: 18,
    textAlign: 'start'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },  
  "& td, & th": {
    paddingTop: 12,
    paddingBottom: 12,
  },
}));

const hostsData = [
  {
    sl: 1,
    property: { name: "Mercedes-Benz", image: imageURL },
    host: { name: "Samuel Johnsons", image: hostImage },
    location: "Buffalo, New York",
    status: "Completed",
  },
  {
    sl: 2,
    property: { name: "BMW X5", image: imageURL },
    host: { name: "Emily Carter", image: hostImage },
    location: "Los Angeles, California",
    status: "Pending",
  },
  {
    sl: 3,
    property: { name: "Audi A6", image: imageURL },
    host: { name: "Michael Brown", image: hostImage },
    location: "Miami, Florida",
    status: "Completed",
  },
  {
    sl: 4,
    property: { name: "Tesla Model 3", image: imageURL },
    host: { name: "Sophia Turner", image: hostImage },
    location: "Dallas, Texas",
    status: "Cancelled",
  },
  {
    sl: 5,
    property: { name: "Lexus RX 350", image: imageURL },
    host: { name: "William Harris", image: hostImage },
    location: "Seattle, Washington",
    status: "Completed",
  },
  {
    sl: 6,
    property: { name: "Toyota Supra", image: imageURL },
    host: { name: "Isabella Lewis", image: hostImage },
    location: "Austin, Texas",
    status: "Pending",
  },
  {
    sl: 7,
    property: { name: "Ford Mustang", image: imageURL },
    host: { name: "James Wilson", image: hostImage },
    location: "Denver, Colorado",
    status: "Completed",
  },
  {
    sl: 8,
    property: { name: "Chevrolet Camaro", image: imageURL },
    host: { name: "Olivia Martinez", image: hostImage },
    location: "Chicago, Illinois",
    status: "Rejected",
  },
  {
    sl: 9,
    property: { name: "Honda Civic", image: imageURL },
    host: { name: "Benjamin Clark", image: hostImage },
    location: "Phoenix, Arizona",
    status: "Completed",
  },
  {
    sl: 10,
    property: { name: "Porsche 911", image: imageURL },
    host: { name: "Charlotte White", image: hostImage },
    location: "San Francisco, California",
    status: "Pending",
  },
];

type props  = {
  open: boolean,
  setOpen: any
}


const CartList = ({open, setOpen}: props) => {
  const [currentPage, setCurrentPage] = useState(1);  
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data, isLoading, refetch } = useGetCarsQuery({ page: 1, limit: 10 });

  // For menu per row
  const [menuAnchor, setMenuAnchor] = useState<{ anchor: HTMLElement | null; id: string | null }>({
    anchor: null,
    id: null,
  });

  
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
      setMenuAnchor({ anchor: event.currentTarget, id });
    };
  
    const handleMenuClose = () => {
      setMenuAnchor({ anchor: null, id: null });
    };
  
    
  const handleToggleStatusPage = async (status: string, id: string) => {
    try {
      await updateVerification({ id, verificationStatus: status }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
    handleMenuClose();
  };


  const handleChangePage = (event: unknown, newPage: number)=>{
    console.log("event", event);
    
      setCurrentPage(newPage)
  }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}  aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Properties Name</StyledTableCell>
            <StyledTableCell align="right">Host Name</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {hostsData?.map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* Property */}
              <TableCell component="th" scope="row">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img
                    src={row.property.image}
                    alt={row.property.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                  <span>{row.property.name}</span>
                </div>
              </TableCell>

              {/* Host */}
              <TableCell align="left">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img
                    src={row.host.image}
                    alt={row.host.name}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <span>{row.host.name}</span>
                </div>
              </TableCell>

              {/* Location */}
              <TableCell align="left">{row.location}</TableCell>

              {/* Status */}
              <TableCell align="left">
                <span
                  style={{
                    backgroundColor:
                      row.status === "Completed"
                        ? "#E6F7E6"
                        : row.status === "Pending"
                        ? "#FFF4E6"
                        : row.status === "Cancelled"
                        ? "#FFE6E6"
                        : "#F0F0F0",
                    color:
                      row.status === "Completed"
                        ? "#2E7D32"
                        : row.status === "Pending"
                        ? "#ED6C02"
                        : row.status === "Cancelled"
                        ? "#D32F2F"
                        : "#616161",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {row.status}
                </span>
              </TableCell>
               {/* Location */}
              <TableCell align="left">
                 <RemoveRedEyeOutlinedIcon className="cursor-pointer" onClick={()=>setOpen(!open)} fontSize="medium"/> 
                  <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, row._id)}>
                    <MdMoreVert />
                  </IconButton>

                  <Menu
                    anchorEl={menuAnchor.anchor}
                    open={menuAnchor.id === row._id && Boolean(menuAnchor.anchor)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleToggleStatusPage("APPROVED", row._id)}>
                      <IoCheckmarkDoneOutline className="text-green-500" style={{ marginRight: 8 }} />
                      Approve
                    </MenuItem>
                    <MenuItem onClick={() => handleToggleStatusPage("REJECTED", row._id)}>
                      <FaLock className="text-red-500" style={{ marginRight: 8 }} />
                      Reject
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={hostsData?.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

    </TableContainer>
  );
};

export default CartList;
