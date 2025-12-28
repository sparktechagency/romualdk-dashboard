import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateAdminMutation,
  useDeleteUserMutation,
  useGetAdminQuery,
  useUpdateAdminStatusMutation
} from "../../../redux/features/user/userApi";
import ConfirmModal from "../../UI/ConfirmModel";
import AddAdminModal from "./AddAdminModal";



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

const AdminList = () => {
  const { data: adminData, refetch, isLoading } = useGetAdminQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [createAdmin] = useCreateAdminMutation();  
  const [updateAdminStatus] = useUpdateAdminStatusMutation();
  

  const handleDeleteAdmin = async () => {
    try {
      const res = await deleteUser(selectedUser?._id).unwrap();
      console.log("res", res);
      
      toast.success("Admin deleted successfully");
      setSelectedUser(null);
      setOpenConfirm(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleAddAdmin = async (values: any) => {
    try {
      const res = await createAdmin(values).unwrap();
      console.log("resres", res);
      

      toast.success("Admin created successfully");
      refetch();
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "success";
      case "INACTIVE":
        return "error";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  const handleToggleStatusPage = async (row: any) => {
    try {
      await updateAdminStatus({ id:row?._id, status: row?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }    
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, height: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h1" color="primary" fontWeight="medium">
          Admin Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          size="large"
        >
          Add Admin
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <StyledTableRow>
              <StyledTableCell sx={{ fontWeight: 'bold' }}>SL No</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 'bold' }}>Name</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 'bold' }}>Email</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 'bold' }}>Role</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 'bold' }}>Status</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 'bold' }}>Join Date</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 'bold', width: 130 }}>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {adminData?.data?.map((row: any, index: number) => (
              <TableRow key={row._id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {row.role?.split("_").join(" ") || row.role}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={getStatusColor(row.status)}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell>
                  {dayjs(row.joinDate).format("DD MMM, YY")}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Tooltip title={row.status === "ACTIVE" ? "Deactivate" : "Activate"}>
                      <IconButton
                        size="small"
                        disabled={row?.role === "SUPER_ADMIN"}
                        color={row.status === "ACTIVE" ? "success" : "error"}
                        onClick={() => handleToggleStatusPage(row)}
                      >
                        {row.status === "ACTIVE" ? (
                          <LockOpenIcon fontSize="small" />
                        ) : (
                          <LockIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        disabled={row?.role === "SUPER_ADMIN"}
                        size="small"
                        color="error"
                        onClick={() => {
                          setSelectedUser(row);
                          setOpenConfirm(true);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmModal
        open={openConfirm}
        title="Delete Admin?"
        content={`Are you sure you want to delete "${selectedUser?.fullName} Admin"?`}
        okText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteAdmin}
        onCancel={() => {
          setOpenConfirm(false);
          setSelectedUser(null);
        }}
      />

      <AddAdminModal        
        open={open}
        setOpen={setOpen}
        onSubmit={handleAddAdmin}
      />
    </Box>
  );
};

export default AdminList;