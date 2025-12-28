import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { useGetHostsQuery, useUpdateHostStatusMutation } from "../../../redux/features/host/hostApi";
import MuiImageViewer from "../../shared/MuiImageViewer";
import { imageUrl } from "../../../redux/base/baseAPI";
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

const StyledTableRow = (props: any) => <TableRow {...props} />;

type props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectedHost: any;
};

const HostsList = ({ open, setOpen, setSelectedHost }: props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { searchTerm, page, limit } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const { data: hostsData, isLoading, refetch } = useGetHostsQuery({});
  const [updateHostStatus] = useUpdateHostStatusMutation()

  const [menuAnchor, setMenuAnchor] = useState<{ anchor: HTMLElement | null; id: string | null }>({
    anchor: null,
    id: null,
  });



  // Sync local state with URL params
  useEffect(() => {
    // @ts-ignore
    setCurrentPage(Math.max(0, (page || 1) - 1));
    setRowsPerPage(Number(limit) || 10);
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
      await updateHostStatus({ status, id }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
    handleMenuClose();
  };

  const handleChangePage = ( newPage: number) => {
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
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {isLoading ? <TableSkeleton rows={Number(rowsPerPage)} cols={7} /> : hostsData?.data
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
                  {host?.city ?? "N/A"}
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

                  <span
                    style={{
                      backgroundColor:
                        host?.status === "ACTIVE" ? "#E6F7E6" : "#FFE6E6",
                      color: host?.status === "ACTIVE" ? "#2E7D32" : "#D32F2F",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 500,
                      textTransform: "uppercase"
                    }}
                  >
                    {host?.status === "ACTIVE" ? host?.status : "Blocked"}
                  </span>
                </StyledTableCell>

                {/* Action */}
                <StyledTableCell >
                  <RemoveRedEyeOutlinedIcon
                    className="cursor-pointer"
                    onClick={() => { setOpen(!open); setSelectedHost(host) }}
                    fontSize="medium"
                  />

                  <IconButton onClick={(e) => handleMenuClick(e, host._id)}>
                    <MdMoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchor.anchor}
                    open={menuAnchor.id === host._id && Boolean(menuAnchor.anchor)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem disabled={host.status === "ACTIVE"} onClick={() => handleToggleStatusPage("ACTIVE", host._id)}>
                      <IoCheckmarkDoneOutline className="text-green-500" style={{ marginRight: 8 }} />
                      Active
                    </MenuItem>

                    <MenuItem disabled={host?.status === "INACTIVE"} onClick={() => handleToggleStatusPage("INACTIVE", host._id)}>
                      <FaLock className="text-red-500" style={{ marginRight: 8 }} />
                      Blocked
                    </MenuItem>
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={hostsData?.meta?.total || 0}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        // @ts-ignore
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default HostsList;
