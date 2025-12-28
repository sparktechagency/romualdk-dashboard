import React, { useEffect, useState } from "react";

import { Button, styled, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useGetBookingsQuery } from "../../../redux/features/booking/bookingApi";
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

type props = {
  open?: boolean;
  setSelectedBooking?: any;
  setDetailsModalOpen?: any;
};

const BookingList = ({ open, setSelectedBooking, setDetailsModalOpen }: props) => {
  const { searchTerm, page, limit } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  //@ts-ignore
  const [currentPage, setCurrentPage] = useState(Math.max(0, (page || 1) - 1));
  const [rowsPerPage, setRowsPerPage] = useState(limit || 5);

  const { data: bookingData, refetch } = useGetBookingsQuery({});

  
  useEffect(() => {     
    refetch();
  }, [page, limit, searchTerm]);

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
            <StyledTableCell>Booking Id</StyledTableCell>
            <StyledTableCell>Guest</StyledTableCell>
            <StyledTableCell>Host</StyledTableCell>
            <StyledTableCell align="right">Car</StyledTableCell>
            <StyledTableCell align="right">From Date</StyledTableCell>
            <StyledTableCell align="right">To Date</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {bookingData?.map((row: any, index: number) => (
            <StyledTableRow
              key={row._id || index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* Booking ID */}
              <TableCell align="left">
                <span>{row?._id }</span>
              </TableCell>

              {/* Guest - with photo and name */}
              <TableCell component="th" scope="row">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {row?.userId?.profileImage ? (
                    <img
                      src={`${imageUrl}${row.userId.profileImage}`}
                      alt={row.userId.fullName}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: 12 }}>
                        {row?.userId?.firstName?.charAt(0) || "G"}
                      </span>
                    </div>
                  )}
                  <span>
                    {row?.userId?.fullName ||
                      `${row?.userId?.firstName} ${row?.userId?.lastName}` ||
                      "N/A"}
                  </span>
                </div>
              </TableCell>

              {/* Host - with photo and name */}
              <TableCell component="th" scope="row">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {row?.hostId?.profileImage ? (
                    <img
                      src={`${imageUrl}${row.hostId.profileImage}`}
                      alt={row.hostId.fullName}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: 12 }}>
                        {row?.hostId?.firstName?.charAt(0) || "H"}
                      </span>
                    </div>
                  )}
                  <span>
                    {row?.hostId?.fullName ||
                      `${row?.hostId?.firstName} ${row?.hostId?.lastName}` ||
                      "N/A"}
                  </span>
                </div>
              </TableCell>

              {/* Car - with image, model, brand and year */}
              <TableCell component="th" scope="row">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {row?.carId?.images?.[0] ? (
                    <img
                      src={`${imageUrl}${row.carId.images[0]}`}
                      alt={`${row.carId.brand} ${row.carId.model}`}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: 12 }}>🚗</span>
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 500 }}>
                      {row?.carId?.brand} {row?.carId?.model}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {row?.carId?.year} • {row?.carId?.licensePlate}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* From Date */}
              <TableCell align="left">
                {row?.fromDate ? (
                  <div>
                    <div>{new Date(row.fromDate).toLocaleDateString()}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {new Date(row.fromDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ) : (
                  "N/A"
                )}
              </TableCell>

              {/* To Date */}
              <TableCell align="left">
                {row?.toDate ? (
                  <div>
                    <div>{new Date(row.toDate).toLocaleDateString()}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {new Date(row.toDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ) : (
                  "N/A"
                )}
              </TableCell>

              {/* Total Amount */}
              <TableCell align="left">
                <div style={{ fontWeight: 600 }}>
                  ${row?.totalAmount?.toLocaleString() || "0"}
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {row?.transactionId?.refundAmount
                    ? `Refunded: $${row.transactionId.refundAmount}`
                    : "No refund"}
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor:
                      row.status === "completed"
                        ? "#E6F7E6"
                        : row.status === "pending"
                          ? "#FFF4E6"
                          : row.status === "cancelled"
                            ? "#FFE6E6"
                            : row.status === "active"
                              ? "#E6F0FF"
                              : "#F0F0F0",
                    color:
                      row.status === "completed"
                        ? "#2E7D32"
                        : row.status === "pending"
                          ? "#ED6C02"
                          : row.status === "cancelled"
                            ? "#D32F2F"
                            : row.status === "active"
                              ? "#1976D2"
                              : "#616161",
                    padding: "4px 12px",
                    borderRadius: 5,
                    boxShadow: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                >
                  {row?.status || "N/A"}
                </Button>
              </TableCell>

              {/* Actions/View Button */}
              <TableCell align="left">
                <RemoveRedEyeOutlinedIcon
                  className="cursor-pointer"
                  onClick={() => {
                    setDetailsModalOpen(!open);
                    setSelectedBooking(row);
                  }}
                  fontSize="medium"
                />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={bookingData?.meta?.total || 0}
        // @ts-ignore
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default BookingList;