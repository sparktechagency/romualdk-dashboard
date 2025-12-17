import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  styled,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { FaLock, FaSearch } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import MuiImageViewer from "../../shared/MuiImageViewer";
import { useGetVerificationQuery, useUpdateVerificationMutation } from "../../../redux/features/verification/verificationApi";
import { imageUrl } from "../../../redux/base/baseAPI";

import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td, & th": {
    paddingTop: 12,
    paddingBottom: 12,
  },
}));

const Verification = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const { searchTerm } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const { data: verificationData, refetch } = useGetVerificationQuery({});
  const [updateVerification] = useUpdateVerificationMutation();

  // For menu per row
  const [menuAnchor, setMenuAnchor] = useState<{ anchor: HTMLElement | null; id: string | null }>({
    anchor: null,
    id: null,
  });

  useEffect(() => {
    setSearchText(searchTerm);
    refetch()
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchText(search);
    updateSearchParams({ searchTerm: search });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

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

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Typography variant="h4" color="primary" fontWeight={600}>
          Car Verification
        </Typography>

        <TextField
          placeholder="Find by licensePlate, city, brand "
          value={searchText}
          onChange={handleSearch}
          style={{ width: 325 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="verification table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Host Name</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Car Brand</StyledTableCell>
              <StyledTableCell>Car Model</StyledTableCell>              
              <StyledTableCell>Car Year</StyledTableCell>              
              <StyledTableCell>License Plate</StyledTableCell>              
              <StyledTableCell>Registration Pic (Front)</StyledTableCell>
              <StyledTableCell>Registration Pic (Back)</StyledTableCell>
              <StyledTableCell>Verification Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {verificationData?.data?.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((row: any) => (
              <StyledTableRow key={row._id}>
                <TableCell>{row.userId?.fullName}</TableCell>
                <TableCell>
                  <Typography>{row.userId?.phone}</Typography>                  
                </TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.licensePlate}</TableCell>
                <TableCell>
                  <MuiImageViewer src={`${imageUrl}${row.carRegistrationPaperFrontPic}`} alt="Front" width={60} />
                </TableCell>
                <TableCell>
                  <MuiImageViewer src={`${imageUrl}${row.carRegistrationPaperBackPic}`} alt="Back" width={60} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor:
                        row.verificationStatus.toLowerCase() === "approved"
                          ? "#008000"
                          : row.verificationStatus.toLowerCase() === "pending"
                            ? "#ED6C02"
                            : row.verificationStatus.toLowerCase() === "rejected"
                              ? "#ff0000"
                              : "#F0F0F0",
                      color:
                        ["approved", "pending", "rejected"].includes(row.verificationStatus.toLowerCase())
                          ? "#fff"
                          : "#616161",
                      padding: "4px 12px",
                      borderRadius: 1,
                      fontSize: 13,
                      fontWeight: 500,
                      boxShadow: "none",
                    }}
                  >
                    {row.verificationStatus}
                  </Button>
                </TableCell>

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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={verificationData?.data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default Verification;
