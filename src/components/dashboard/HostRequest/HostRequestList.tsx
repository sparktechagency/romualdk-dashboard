import React, { useEffect, useState } from "react";

import { Button, IconButton, Menu, MenuItem, styled, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { FaLock } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useGetHostRequestsQuery, useUpdateHostRequestStatusMutation } from "../../../redux/features/host/hostApi";
import MuiImageViewer from "../../shared/MuiImageViewer";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import TableSkeleton from "../../shared/TableSkeleton";

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

const HostRequestList = () => {
  const { searchTerm, page, limit } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  // @ts-ignore
  const [currentPage, setCurrentPage] = useState(Math.max(0, (page || 1) - 1));
  const [rowsPerPage, setRowsPerPage] = useState(limit || 10);

  const { data: requestsData, isLoading, refetch } = useGetHostRequestsQuery({});
  const [updateHostRequestStatus] = useUpdateHostRequestStatusMutation();

  // For menu per row
  const [menuAnchor, setMenuAnchor] = useState<{ anchor: HTMLElement | null; id: string | null }>({
    anchor: null,
    id: null,
  });

  // Sync local state with URL params
  useEffect(() => {
    // @ts-ignore
    setCurrentPage(Math.max(0, (page || 1) - 1));
    setRowsPerPage(limit || 10);
    refetch();
  }, [page, limit, searchTerm]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchor({ anchor: event.currentTarget, id });
  };

  const handleMenuClose = () => {
    setMenuAnchor({ anchor: null, id: null });
  };

  const handleToggleStatusPage = async (status: string, id: string) => {
    try {
      await updateHostRequestStatus({ id, hostStatus: status }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
    handleMenuClose();
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    // Convert 0-based MUI page to 1-based API page
    const apiPage = newPage + 1;
    setCurrentPage(newPage);
    updateSearchParams({ page: apiPage });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setCurrentPage(0); // Reset to first page (0-based)
    updateSearchParams({ limit: newLimit, page: 1 }); // Reset to first page (1-based for API)
  };



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Host Lists</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Driving Licen. (Front)</StyledTableCell>
            <StyledTableCell align="right">Driving Licen. (Back)</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {isLoading ? <TableSkeleton rows={Number(rowsPerPage)} cols={7} /> : requestsData?.data && requestsData.data.length > 0 ? (
            requestsData.data.map((row: any, index: number) => (
              <StyledTableRow
                key={row._id || index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* Host Name */}
                <TableCell component="th" scope="row">
                  <strong>{`${row.firstName} ${row.lastName}`}</strong>
                </TableCell>

                {/* Contact */}
                <TableCell align="left">
                  {row.countryCode}
                  {row.phone}
                </TableCell>

                {/* Location */}
                <TableCell align="left">{row?.city ?? "N/A"}</TableCell>

                {/* Driving License Front */}
                <TableCell align="left">
                  <MuiImageViewer width={60} src={`${imageUrl}${row.drivingLicenseFrontPic}`} alt="Front" />
                </TableCell>

                {/* Driving License Back */}
                <TableCell align="left">
                  <MuiImageViewer width={60} src={`${imageUrl}${row.drivingLicenseBackPic}`} alt="Back" />
                </TableCell>

                {/* Status */}
                <TableCell align="left">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor:
                        row.hostStatus === "APPROVED"
                          ? "green"
                          : row.hostStatus === "PENDING"
                            ? "#ED6C02"
                            : row.hostStatus === "REJECTED"
                              ? "red"
                              : "#F0F0F0",
                      color: "white",
                      padding: "4px 12px",
                      fontSize: 13,
                      fontWeight: 500,
                      boxShadow: "none",
                    }}
                  >
                    {row.hostStatus}
                  </Button>
                </TableCell>

                {/* Action */}
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, row._id)}>
                    <MdMoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchor.anchor}
                    open={menuAnchor.id === row._id && Boolean(menuAnchor.anchor)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      disabled={row.hostStatus === "APPROVED"}
                      onClick={() => handleToggleStatusPage("APPROVED", row._id)}
                    >
                      <IoCheckmarkDoneOutline className="text-green-500" style={{ marginRight: 8 }} />
                      Approved
                    </MenuItem>

                    <MenuItem
                      disabled={row.hostStatus === "REJECTED"}
                      onClick={() => handleToggleStatusPage("REJECTED", row._id)}
                    >
                      <FaLock className="text-red-500" style={{ marginRight: 8 }} />
                      Reject
                    </MenuItem>
                  </Menu>
                </TableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                No host requests found
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={requestsData?.meta?.total || 0}
        // @ts-ignore
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default HostRequestList;