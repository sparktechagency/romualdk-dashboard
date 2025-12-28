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
import React, { useEffect, useState } from "react";

import { FaLock, FaSearch } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useGetVerificationQuery, useUpdateVerificationMutation } from "../../../redux/features/verification/verificationApi";
import MuiImageViewer from "../../shared/MuiImageViewer";

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
  const { searchTerm, page, limit } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  //@ts-ignore
  const [currentPage, setCurrentPage] = useState(Math.max(0, (page || 1) - 1));
  const [rowsPerPage, setRowsPerPage] = useState(limit || 5);
  const [searchText, setSearchText] = useState(searchTerm || "");

  // KEEP THIS (No change needed):
  const { data: verificationData, refetch } = useGetVerificationQuery({});

  const [updateVerification] = useUpdateVerificationMutation();

  // For menu per row
  const [menuAnchor, setMenuAnchor] = useState<{ anchor: HTMLElement | null; id: string | null }>({
    anchor: null,
    id: null,
  });

  // Sync local state when URL params change
  useEffect(() => {
    //@ts-ignore   
    refetch();
  }, [searchTerm, page, limit, refetch]);

// AFTER:
const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const search = e.target.value;
  setSearchText(search);
  updateSearchParams({ searchTerm: search, page: 1 });
};

const handleChangePage = (_event: unknown, newPage: number) => {
  const apiPage = newPage + 1;
  setCurrentPage(newPage);
  updateSearchParams({ page: apiPage });
};

const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  const newLimit = parseInt(event.target.value, 10);
  setRowsPerPage(newLimit);
  setCurrentPage(0);
  updateSearchParams({ limit: newLimit, page: 1 });
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
            {/* Remove local slicing - API handles pagination */}
            {verificationData?.data?.map((row: any) => (
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
          count={verificationData?.meta?.total || 0}
          //@ts-ignore
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