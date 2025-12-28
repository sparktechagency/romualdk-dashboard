import CloseIcon from "@mui/icons-material/Close";
import {
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    ImageList,
    ImageListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";

import { imageUrl } from "../../../redux/base/baseAPI";
import MuiImageViewer from "../../shared/MuiImageViewer";

type Props = {
    open: boolean;
    onClose: () => void;
    selectedCar?: any;
};

const CarDetailsModal = ({ open, onClose, selectedCar }: Props) => {
    if (!selectedCar) return null;

    console.log("selectedCar", selectedCar);

    const lastImage = selectedCar.images[selectedCar.images.length - 1];



    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-primary">Car Details</h2>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <div className="bg-white">

                    {/* Host Info */}
                    <div className="flex items-center gap-3 mb-7">
                        <Avatar
                            src={`${imageUrl}${selectedCar?.userId?.profileImage}`}
                            sx={{ width: 56, height: 56 }}
                        />
                        <p className="text-lg font-medium">Host By {selectedCar?.userId?.fullName}</p>
                    </div>

                    {/* Images */}

                    <ImageList sx={{ height: 200 }} cols={4} rowHeight={200}>
                        {selectedCar?.images.slice(0, 3).map((img: string, index: number) => (
                            <img
                                src={`${imageUrl}${img}`}
                                alt={`Car Image ${index + 1}`}
                                className="object-cover w-full h-full max-h-[200px] max-w-xs rounded-3xl shrink-0!"
                            />
                        ))}
                        {selectedCar?.images?.length > 3 && (
                            <ImageListItem sx={{ position: "relative" }}>
                                <img
                                    src={`${imageUrl}${lastImage}`}
                                    alt="Last Car Image"
                                    className="object-cover rounded-3xl"
                                />
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-3xl text-white rounded-3xl">
                                    {selectedCar?.images?.length - 3}+
                                </div>
                            </ImageListItem>
                        )}
                    </ImageList>

                    {/* Title & Price */}
                    <div className="flex justify-between py-5">
                        <h3 className="text-2xl font-semibold">{selectedCar?.brand} {selectedCar?.model} ({selectedCar?.year})</h3>
                        <h3 className="text-2xl font-semibold">৳{selectedCar?.dailyPrice}/day</h3>
                    </div>

                    {/* Features Table */}
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <h4 className="font-semibold mt-2 mb-2">Car Features</h4>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><strong>City</strong></TableCell>
                                    <TableCell>{selectedCar?.city}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>License Plate</strong></TableCell>
                                    <TableCell>{selectedCar?.licensePlate}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Brand</strong></TableCell>
                                    <TableCell>{selectedCar?.brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Seats</strong></TableCell>
                                    <TableCell>{selectedCar?.seatNumber}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><strong>Transmission</strong></TableCell>
                                    <TableCell>{selectedCar?.transmission}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><strong>Fuel Type</strong></TableCell>
                                    <TableCell>{selectedCar?.fuelType}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><strong>Air Conditioning</strong></TableCell>
                                    <TableCell>{selectedCar?.airConditioning ? "Yes" : "No"}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><strong>GPS Navigation</strong></TableCell>
                                    <TableCell>{selectedCar?.gpsNavigation ? "Yes" : "No"}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><strong>Mileage</strong></TableCell>
                                    <TableCell>{selectedCar?.mileage}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><strong>Color</strong></TableCell>
                                    <TableCell>{selectedCar?.color}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <strong>Description</strong>
                                        <p className="mt-2 text-slate-600">{selectedCar?.about}</p>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Facilities : </strong></TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCar?.facilities?.map((f: any, i: number) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-md text-slate-700"
                                                >
                                                    {f?.label}                                                    
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <h3 className="text-xl font-semibold border-t mt-6 pt-5">Car Documents</h3>
                    <div className="flex gap-10 mt-3">
                        <div className="flex gap-3 cursor-pointer">
                            <MuiImageViewer src={`${imageUrl}${selectedCar?.carRegistrationPaperBackPic}`} alt="Front" width={60} />
                        </div>
                        <div className="flex gap-3 cursor-pointer">
                            <MuiImageViewer src={`${imageUrl}${selectedCar?.carRegistrationPaperFrontPic}`} alt="Front" width={60} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CarDetailsModal;
