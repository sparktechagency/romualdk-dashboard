import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
    Avatar,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    MobileStepper,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import { useState } from "react";

import { imageUrl } from "../../../redux/base/baseAPI";
import MuiImageViewer from "../../shared/MuiImageViewer";
import ImageDownloadButton from "../../../utils/ImageDownloadButton";
 
type Props = {
    open: boolean;
    onClose: () => void;
    selectedCar?: any;
};

const CarDetailsModal = ({ open, onClose, selectedCar }: Props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    if (!selectedCar) return null;

    const images: string[] = selectedCar.images ?? [];
    const maxSteps = images.length;

    const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, maxSteps - 1));
    const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

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
                        <p className="text-lg font-medium">
                            Host By {selectedCar?.userId?.fullName}
                        </p>
                    </div>

                    {/* Image Slider */}
                    {images.length > 0 && (
                        <Box sx={{ position: "relative", width: "100%", mb: 2 }}>
                            {/* Main image with hover overlay */}
                            <Box
                                sx={{ position: "relative", width: "100%", height: 340, borderRadius: 3, overflow: "hidden" }}
                                onMouseEnter={() => setHoveredIndex(activeStep)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <img
                                    src={`${imageUrl}${images[activeStep]}`}
                                    alt={`Car Image ${activeStep + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        borderRadius: 12,
                                    }}
                                />

                                {/* Download overlay on hover */}
                                {hoveredIndex === activeStep && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "rgba(0,0,0,.70)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 3,
                                            transition: "opacity 0.2s",
                                        }}
                                    >
                                        <ImageDownloadButton
                                            imageUrl={`${imageUrl}${images[activeStep]}`}
                                            fileName={`${selectedCar?.brand ?? "car"}-${selectedCar?.model ?? "image"}-${activeStep + 1}.jpg`}
                                            size="large"
                                        />
                                    </Box>
                                )}

                                {/* Prev button */}
                                {activeStep > 0 && (
                                    <IconButton
                                        onClick={handleBack}
                                        sx={{
                                            position: "absolute",
                                            left: 8,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            bgcolor: "rgba(255,255,255,0.85)",
                                            "&:hover": { bgcolor: "white" },
                                        }}
                                        size="small"
                                    >
                                        <ArrowBackIosNewIcon fontSize="small" />
                                    </IconButton>
                                )}

                                {/* Next button */}
                                {activeStep < maxSteps - 1 && (
                                    <IconButton
                                        onClick={handleNext}
                                        sx={{
                                            position: "absolute",
                                            right: 8,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            bgcolor: "rgba(255,255,255,0.85)",
                                            "&:hover": { bgcolor: "white" },
                                        }}
                                        size="small"
                                    >
                                        <ArrowForwardIosIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>

                            {/* Thumbnail strip */}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    mt: 1.5,
                                    overflowX: "auto",
                                    pb: 0.5,
                                }}
                            >
                                {images.map((img: string, index: number) => (
                                    <Box
                                        key={index}
                                        onClick={() => setActiveStep(index)}
                                        sx={{
                                            flexShrink: 0,
                                            width: 72,
                                            height: 52,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            border: activeStep === index ? "2px solid" : "2px solid transparent",
                                            borderColor: activeStep === index ? "primary.main" : "transparent",
                                            cursor: "pointer",
                                            opacity: activeStep === index ? 1 : 0.6,
                                            transition: "opacity 0.15s, border-color 0.15s",
                                            "&:hover": { opacity: 1 },
                                        }}
                                    >
                                        <img
                                            src={`${imageUrl}${img}`}
                                            alt={`Thumb ${index + 1}`}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </Box>
                                ))}
                            </Box>

                            {/* Dot stepper */}
                            <MobileStepper
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                                sx={{ background: "transparent", justifyContent: "center", pt: 0.5 }}
                                nextButton={null}
                                backButton={null}
                            />
                        </Box>
                    )}

                    {/* Title & Price */}
                    <div className="flex justify-between py-5">
                        <h3 className="text-2xl font-semibold">
                            {selectedCar?.brand} {selectedCar?.model} ({selectedCar?.year})
                        </h3>
                        <h3 className="text-2xl font-semibold">{selectedCar?.dailyPrice}/day</h3>
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
                                    <TableCell><strong>Facilities:</strong></TableCell>
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
                            <MuiImageViewer
                                src={`${imageUrl}${selectedCar?.carRegistrationPaperBackPic}`}
                                alt="Back"
                                width={60}
                            />
                        </div>
                        <div className="flex gap-3 cursor-pointer">
                            <MuiImageViewer
                                src={`${imageUrl}${selectedCar?.carRegistrationPaperFrontPic}`}
                                alt="Front"
                                width={60}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CarDetailsModal;