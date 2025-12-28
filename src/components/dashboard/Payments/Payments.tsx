import {
  Box,
  Chip,
  InputAdornment,
  styled,
  TablePagination,
  TextField
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { useGetAllPaymentQuery } from "../../../redux/features/booking/bookingApi";
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

const Payments = () => {
  const { searchTerm, page, limit } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  // Initialize state from URL params - convert 1-based to 0-based for MUI
  // @ts-ignore
  const [currentPage, setCurrentPage] = useState(Math.max(0, (page || 1) - 1));
  const [rowsPerPage, setRowsPerPage] = useState(limit || 5);
  const [searchText, setSearchText] = useState(searchTerm || "");

  const { data: paymentData, isLoading, refetch } = useGetAllPaymentQuery({});

  // Sync local state with URL params
  useEffect(() => {
    // @ts-ignore
    refetch();
  }, [searchTerm, page, limit]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchText(search);
    // Reset to first page when searching
    updateSearchParams({ searchTerm: search, page: 1 });
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

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle different API response structures  
  const totalCount = paymentData?.meta?.total || 0;

  return (
    <Box>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl text-primary font-semibold">Payments</h1>
        <div className="flex gap-5">
          <TextField
            placeholder="Search by Booking ID, Payment ID, or Status..."
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
              },
            }}
          />
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="payments table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Booking Date</StyledTableCell>
              <StyledTableCell align="right">Booking ID</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell>Guest</StyledTableCell>
              <StyledTableCell>Host</StyledTableCell>
              <StyledTableCell>Car</StyledTableCell>
              <StyledTableCell align="right">Payment ID</StyledTableCell>
              <StyledTableCell align="right">Refund Amount</StyledTableCell>
              <StyledTableCell align="right">Payout Status</StyledTableCell>              
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {isLoading ? <TableSkeleton rows={Number(rowsPerPage)} cols={9} /> : paymentData?.data?.length > 0 ? (
              paymentData?.data?.map((row: any, index: number) => (
                <StyledTableRow
                  key={row._id || index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* Booking Date */}
                  <TableCell component="th" scope="row">
                    {formatDate(row.createdAt)}
                  </TableCell>

                  {/* Booking ID */}
                  <TableCell >
                    <span className="font-semibold">
                      {row.bookingId?._id || 'N/A'}
                    </span>
                  </TableCell>

                  {/* Amount */}
                  <TableCell >
                    <span className="font-semibold">
                      {row.amount ? row.amount : 0} CFA
                    </span>
                  </TableCell>

                  {/* Guest - with name */}
                  <TableCell>
                    <span className="font-medium">
                      {row.bookingId?.userId?.fullName ||
                        `${row.bookingId?.userId?.firstName || ''} ${row.bookingId?.userId?.lastName || ''}`.trim() ||
                        'N/A'}
                    </span>
                    <div className="text-xs text-gray-500">
                      {row.bookingId?.userId?.phone || ''}
                    </div>
                  </TableCell>

                  {/* Host - with name */}
                  <TableCell>
                    <span className="font-medium">
                      {row.bookingId?.hostId?.fullName ||
                        `${row.bookingId?.hostId?.firstName || ''} ${row.bookingId?.hostId?.lastName || ''}`.trim() ||
                        'N/A'}
                    </span>
                    <div className="text-xs text-gray-500">
                      {row.bookingId?.hostId?.phone || ''}
                    </div>
                  </TableCell>

                  {/* Car - brand and model */}
                  <TableCell>
                    <span className="font-medium">
                      {row.bookingId?.carId?.brand || 'N/A'} {row.bookingId?.carId?.model || ''}
                    </span>
                    <div className="text-xs text-gray-500">
                      {row.bookingId?.carId?.licensePlate || ''}
                    </div>
                  </TableCell>

                  {/* Payment ID (stripePaymentIntentId) */}
                  <TableCell>
                    <span className="font-mono text-sm">
                      {row.stripePaymentIntentId
                        // ? `${row.stripePaymentIntentId.substring(0, 20)}...`
                        ? `${row.stripePaymentIntentId}`
                        : 'N/A'}
                    </span>
                  </TableCell>

                  {/* Refund Amount */}
                  <TableCell align="center">
                    {row.refundAmount ? (
                      <span className="text-red-600 font-semibold">
                        -{row.refundAmount.toLocaleString()} {row.currency?.toUpperCase() || 'USD'}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>

                  {/* Payout Status */}
                  <TableCell align="center">
                    <Chip
                      label={row.payoutStatus || 'N/A'}
                      color={row.payoutStatus?.toLowerCase() === 'paid' ? 'success' : 'warning'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <TableCell colSpan={11} align="center" sx={{ py: 3 }}>
                  No payments found
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          // @ts-ignore
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default Payments;