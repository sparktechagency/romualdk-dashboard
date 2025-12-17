import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Button,
  styled,
  tableCellClasses,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import MuiImageViewer from "../../shared/MuiImageViewer";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useGetHostsQuery } from "../../../redux/features/host/hostApi";


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

const StyledTableRow = (props: any) => <TableRow {...props} />;

type props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const HostsList = ({ open, setOpen }: props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: hostsData, isLoading } = useGetHostsQuery({});

  console.log("hostsData", hostsData);
  

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Host Name</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">NID Front</StyledTableCell>
            <StyledTableCell align="right">NID Back</StyledTableCell>
            <StyledTableCell align="right">Host Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {hostsData?.data
            ?.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
            .map((host: any) => (
              <StyledTableRow key={host._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {/* Host Name */}
                <StyledTableCell>
                  <Typography fontWeight={500}>
                    {host.firstName} {host.lastName}
                  </Typography>
                </StyledTableCell>

                {/* Contact */}
                <StyledTableCell >{host.phone}</StyledTableCell>

                {/* Location */}
                <StyledTableCell>
                  {host?.city ?? "N/A" }
                </StyledTableCell>

                {/* NID Front */}
                <StyledTableCell >
                  <MuiImageViewer src={`${imageUrl}${host.nidFrontPic}`} alt="NID Front" width={60} />
                </StyledTableCell>

                {/* NID Back */}
                <StyledTableCell >
                  <MuiImageViewer src={`${imageUrl}${host.nidBackPic}`} alt="NID Back" width={60} />
                </StyledTableCell>

                {/* Host Status */}
                <StyledTableCell >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor:
                        host.hostStatus === "APPROVED"
                          ? "green"
                          : host.hostStatus === "PENDING"
                          ? "#ED6C02"
                          : host.hostStatus === "REJECTED"
                          ? "red"
                          : "#F0F0F0",
                      color: "white",
                      padding: "4px 12px",
                      fontSize: 13,
                      fontWeight: 500,
                      boxShadow: "none",
                    }}
                  >
                    {host.hostStatus}
                  </Button>
                </StyledTableCell>

                {/* Action */}
                <StyledTableCell >
                  <RemoveRedEyeOutlinedIcon
                    className="cursor-pointer"
                    onClick={() => setOpen(!open)}
                    fontSize="medium"
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={hostsData?.data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default HostsList;
