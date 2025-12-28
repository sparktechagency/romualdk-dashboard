import React, { useEffect, useState } from "react";

import { IconButton, Menu, MenuItem, styled, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { FaLock } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useGetUsersQuery, useUpdateUserStatusMutation } from "../../../redux/features/user/userApi";
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

type props = {
  open: boolean;
  setOpen: any;
  setSelectedGuest: any;
};

const GuestList = ({ setOpen, setSelectedGuest }: props) => {
  const { searchTerm, page, limit } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  // @ts-ignore
  const [currentPage, setCurrentPage] = useState(Math.max(0, (page || 1) - 1));
  const [rowsPerPage, setRowsPerPage] = useState(limit || 10);

  const { data: guestData, refetch, isLoading } = useGetUsersQuery({});
  const [updateUserStatus] = useUpdateUserStatusMutation();

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

  const handleChangePage = (_event: unknown, newPage: number) => {
    // Convert 0-based MUI page to 1-based API page
    const apiPage = newPage + 1;
    setCurrentPage(newPage);
    updateSearchParams({ page: apiPage });
  };

  const handleToggleStatusPage = async (status: string, id: string) => {
    try {
      await updateUserStatus({ id, status }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
    handleMenuClose();
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
          {isLoading ? <TableSkeleton rows={Number(rowsPerPage)} cols={7} /> : guestData?.data && guestData.data.length > 0 ? (
            guestData.data.map((row: any, index: number) => (
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
                <TableCell>{row.location?.city || "N/A"}</TableCell>

                {/* Gender */}
                <TableCell>{row.gender || "N/A"}</TableCell>

                {/* Date of Birth */}
                <TableCell>
                  {row.dateOfBirth ? new Date(row.dateOfBirth).toLocaleDateString() : "N/A"}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <span
                    style={{
                      backgroundColor: row.status === "ACTIVE" ? "#E6F7E6" : "#FFE6E6",
                      color: row.status === "ACTIVE" ? "#2E7D32" : "#D32F2F",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 500,
                      textTransform: "uppercase",
                    }}
                  >
                    {row?.status === "ACTIVE" ? row?.status : "Blocked"}
                  </span>
                </TableCell>

                {/* View */}
                <TableCell align="center">
                  <RemoveRedEyeOutlinedIcon
                    className="cursor-pointer"
                    onClick={() => {
                      setOpen(true);
                      setSelectedGuest(row);
                    }}
                  />

                  <IconButton onClick={(e) => handleMenuClick(e, row._id)}>
                    <MdMoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchor.anchor}
                    open={menuAnchor.id === row._id && Boolean(menuAnchor.anchor)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      disabled={row.status === "ACTIVE"}
                      onClick={() => handleToggleStatusPage("ACTIVE", row._id)}
                    >
                      <IoCheckmarkDoneOutline className="text-green-500" style={{ marginRight: 8 }} />
                      Active
                    </MenuItem>

                    <MenuItem
                      disabled={row.status === "INACTIVE"}
                      onClick={() => handleToggleStatusPage("INACTIVE", row._id)}
                    >
                      <FaLock className="text-red-500" style={{ marginRight: 8 }} />
                      Blocked
                    </MenuItem>
                  </Menu>
                </TableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                No guests found
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={guestData?.meta?.total || 0}
        // @ts-ignore
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default GuestList;