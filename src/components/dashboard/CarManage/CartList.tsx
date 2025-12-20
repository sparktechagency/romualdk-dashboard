import React, { useState } from "react";

import { IconButton, Menu, MenuItem, styled, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { EyeOutlined } from "@ant-design/icons";
import { FaLock } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { useUpdateVerificationMutation } from "../../../redux/features/verification/verificationApi";
import { imageUrl } from "../../../redux/base/baseAPI";

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


type props = {
  carData: any,
  open: boolean,
  setOpen: any,
  details: boolean,
  setDetails: any
  setSelectedCar: any
}


const CartList = ({ carData, open, setOpen, details, setDetails, setSelectedCar }: props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);



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
      await useUpdateVerificationMutation({ id, verificationStatus: status })
      refetch();
    } catch (error) {
      console.log(error);
    }
    handleMenuClose();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("event", event);

    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {carData && carData?.data?.map((row: any, index: number) => (
            <StyledTableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* Property (Car Pic + Brand) */}
              <TableCell component="th" scope="row">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img
                    src={`${imageUrl}${row.images?.[0]}`}
                    alt={`${row.brand} ${row.model}`}
                    style={{
                      width: 50,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                  <span style={{ fontWeight: 500 }}>
                    {row.brand} {row.model}
                  </span>
                </div>
              </TableCell>

              {/* Host Name */}
              <TableCell align="left">
                {row.userId?.fullName}
              </TableCell>

              {/* Contact */}
              <TableCell align="left">
                {row.userId?.phone}
              </TableCell>

              {/* Location */}
              <TableCell align="left">
                {row.city}
              </TableCell>

              {/* Actions */}
              <TableCell align="left">
                <IconButton
                  onClick={() => {
                    setSelectedCar(row);
                    setOpen(true);
                  }}
                >
                  <EyeOutlined />
                </IconButton>
              </TableCell>
            </StyledTableRow>
          ))}

        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={carData?.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />


    </TableContainer>
  );
};

export default CartList;
