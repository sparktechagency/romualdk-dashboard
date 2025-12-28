import React, { useEffect, useState } from "react";

import { IconButton, styled, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { EyeOutlined } from "@ant-design/icons";
import { imageUrl } from "../../../redux/base/baseAPI";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import { useGetCarsQuery } from "../../../redux/features/cars/carApi";
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

type props = {
  open: boolean;
  setOpen: any;
  setSelectedCar: any;
};

const CartList = ({ setOpen, setSelectedCar }: props) => {
  const { data: carData, refetch, isLoading } = useGetCarsQuery({});

  console.log("carData", carData);

  const { searchTerm, page, limit } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  //@ts-ignore
  const [currentPage, setCurrentPage] = useState(Math.max(0, (page || 1) - 1));
  const [rowsPerPage, setRowsPerPage] = useState(limit || 5);

  // Sync local state with URL params
  useEffect(() => {
    //@ts-ignore    
    refetch()
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
            <StyledTableCell>Properties Name</StyledTableCell>
            <StyledTableCell align="right">Host Name</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        {isLoading ? (
          <TableSkeleton rows={Number(rowsPerPage)} cols={5} />
        ) :
          (<TableBody>
            {carData?.data && carData.data.length > 0 ? (
              carData.data.map((row: any, index: number) => (
                <StyledTableRow
                  key={row._id || index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* Property (Car Pic + Brand) */}
                  <TableCell component="th" scope="row">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {row.images?.[0] ? (
                        <img
                          src={`${imageUrl}${row.images[0]}`}
                          alt={`${row.brand} ${row.model}`}
                          style={{
                            width: 50,
                            height: 40,
                            borderRadius: 8,
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 50,
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
                      <span style={{ fontWeight: 500 }}>
                        {row.brand} {row.model}
                      </span>
                    </div>
                  </TableCell>

                  {/* Host Name */}
                  <TableCell align="left">{row.userId?.fullName || "N/A"}</TableCell>

                  {/* Contact */}
                  <TableCell align="left">{row.userId?.phone || "N/A"}</TableCell>

                  {/* Location */}
                  <TableCell align="left">{row.city || "N/A"}</TableCell>

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
              ))
            ) : (
              <StyledTableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No cars found
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>)}
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={carData?.meta?.total || 0}
        //@ts-ignore
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CartList;