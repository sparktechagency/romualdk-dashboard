import React, { useState } from "react";

import { styled, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useGetUsersQuery } from "../../../redux/features/user/userApi";
import { imageUrl } from "../../../redux/base/baseAPI";

const imageURL =
  "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg";
const hostImage = "/placeholder.png";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3ab8bb",
    color: theme.palette.common.white,
    fontWeight: 500,
    fontSize: 18,
    textAlign: "start",
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



type props = {
  open: boolean;
  setOpen: any;
  setSelectedGuest: any;
};

const GuestList = ({ open, setOpen, setSelectedGuest }: props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { data: guestData } = useGetUsersQuery({});
 

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Guest Name</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">DOB</StyledTableCell>          
            <StyledTableCell align="right">Status</StyledTableCell>          
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {guestData && guestData?.data?.map((row:any, index: number) => (
            <StyledTableRow
              key={row._id || index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* Guest Name + Profile Image */}
              <TableCell>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img
                    src={row?.profileImage ? `${imageUrl}${row.profileImage}` : "/placeholder.png"}
                    alt={row.fullName}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <span>{row.fullName}</span>
                </div>
              </TableCell>

              {/* Contact */}
              <TableCell>
                {row.countryCode} {row.phone}
              </TableCell>

              {/* City */}
              <TableCell>
                {row.location?.city || "N/A"}
              </TableCell>

              {/* Gender */}
              <TableCell>
                {row.gender || "N/A"}
              </TableCell>

              {/* Date of Birth */}
              <TableCell>
                {new Date(row.dateOfBirth).toLocaleDateString()}
              </TableCell>

              {/* Status */}
              <TableCell>
                <span
                  style={{
                    backgroundColor:
                      row.status === "ACTIVE" ? "#E6F7E6" : "#FFE6E6",
                    color: row.status === "ACTIVE" ? "#2E7D32" : "#D32F2F",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {row.status}
                </span>
              </TableCell>
              
              {/* View */}
              <TableCell align="center">
                <RemoveRedEyeOutlinedIcon
                  className="cursor-pointer"
                  onClick={() => {setOpen(true); setSelectedGuest(row)}}
                />
              </TableCell>
            </StyledTableRow>
          ))}

        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={guestData?.meta?.total}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default GuestList;
