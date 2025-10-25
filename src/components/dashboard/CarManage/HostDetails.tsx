import {
  Avatar,
  AvatarGroup,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Table,
} from "@mui/material";
import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IoGiftOutline } from "react-icons/io5";
import { CiWifiOn } from "react-icons/ci";
import { TbAirConditioning, TbCat } from "react-icons/tb";
import { LuMonitor } from "react-icons/lu";
import { AiOutlineSecurityScan } from "react-icons/ai";

type props = {
  open: boolean;
  setOpen: any;
};

const HostDetails = ({ open, setOpen }: props) => {
  console.log("open", open);

  const lastItem = itemData?.pop();

  const featuresData = {
    carId: "Yes",
    totalTrips: 150,
    rating: 4.5,
    location: "Amsterdam, Netherlands",
    carType: "Compact Sedan",
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    airCondition: "Yes",
    gpsNavigation: "Yes",
    mileage: "unlimited",
    bluetooth: "Yes",
    description:
      "This compact sedan is perfect for exploring Amsterdam and its surroundings. Featuring a fuel-efficient engine, comfortable seating for up to 4 people, and modern amenities like GPS and Bluetooth, it’s the ideal choice for travelers looking for convenience and comfort. Enjoy a flexible rental period with unlimited mileage, and the peace of mind with included insurance. Pickup and drop-off at a central location for ease.",
    facilities: [
      { icon: <IoGiftOutline />, name: "Newest" },
      { icon: <CiWifiOn />, name: "Wifi" },
      { icon: <TbCat />, name: "Pet Allow" },
      { icon: <TbAirConditioning />, name: "AC" },
      { icon: <LuMonitor />, name: "TV" },
      { icon: <AiOutlineSecurityScan />, name: "Security" },
    ],
  };
  return (
    <div className="bg-white shadow p-5">
      <div className="flex items-center justify-between mb-5  !h-full">
        <h1 className="text-3xl text-primary font-semibold">Car Details</h1>
        <div className="flex gap-5">
          <Button
            size="large"
            variant="contained"
            sx={{ background: "var(--color-yellow)" }}
          >
            Upcoming
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-7">
        <Avatar
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/10928778/pexels-photo-10928778.jpeg"
          sx={{ width: 56, height: 56 }}
        />
        <p className="text-lg font-medium">Host By Jack Dawson</p>
      </div>

      <ImageList sx={{ display: "flex", gap: 0, width: "100%", height: 300 }}>
        {itemData &&
          itemData?.slice(0, 3)?.map((item) => (
            // <ImageListItem sx={{width: '100%'}} key={item.img}>
            <ImageListItem key={item.img} sx={{ marginRight: 2 }}>
              <img
                src={`${item.img}?w=400&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                className="object-cover rounded-3xl"
              />
            </ImageListItem>
          ))}

        <ImageListItem sx={{ position: "relative" }}>
          <img
            srcSet={`${lastItem?.img}?w=400&fit=crop&auto=format&dpr=2 2x`}
            src={`${lastItem?.img}?w=400&fit=crop&auto=format`}
            alt={lastItem?.title}
            loading="lazy"
            className="object-cover rounded-3xl"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center text-3xl text-white rounded-3xl">
            {itemData?.length - 3}+
          </div>
        </ImageListItem>
      </ImageList>

      <div className="flex items-center justify-between py-5">
        <h3 className="text-2xl font-semibold">
          Cozy 2BR Apartment in Florence
        </h3>
        <h3 className="text-2xl font-semibold">$250/PW</h3>
      </div>
      <p className="text-xl font-semibold">Features</p>

      <Table>
        {/* ✅ Add Features Data Section */}
        <tbody>
          <tr>
            <td colSpan={2}>
              <h4 style={{ fontWeight: 600, marginTop: 12 }}>Car Features</h4>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: 8,
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <strong>Car ID:</strong>
                    </td>
                    <td>{featuresData.carId}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Trips:</strong>
                    </td>
                    <td>{featuresData.totalTrips}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Rating:</strong>
                    </td>
                    <td>{featuresData.rating}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Location:</strong>
                    </td>
                    <td>{featuresData.location}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Car Type:</strong>
                    </td>
                    <td>{featuresData.carType}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Seats:</strong>
                    </td>
                    <td>{featuresData.seats}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Transmission:</strong>
                    </td>
                    <td>{featuresData.transmission}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Fuel Type:</strong>
                    </td>
                    <td>{featuresData.fuelType}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Air Condition:</strong>
                    </td>
                    <td>{featuresData.airCondition}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>GPS Navigation:</strong>
                    </td>
                    <td>{featuresData.gpsNavigation}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Mileage:</strong>
                    </td>
                    <td>{featuresData.mileage}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Bluetooth:</strong>
                    </td>
                    <td>{featuresData.bluetooth}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <strong>Description:</strong>
                      <p style={{ marginTop: 6, color: "#555" }}>
                        {featuresData.description}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Facilities:</strong>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                          marginTop: 6,
                        }}
                      >
                        {featuresData?.facilities?.map((item, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              borderRadius: "6px",
                              padding: "4px 8px",
                            }}
                            className="bg-primary/20 text-slate-700"
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </Table>

      <h3 className="text-xl mb-3 font-semibold border-t border-slate-300 mt-5 pt-5">Cars Documents</h3>
      <div className="flex items-center gap-10">
      <div className="flex items-center gap-3 cursor-pointer">
        <img src="/folderIcon.png" alt="" className="w-7 h-7 object-cover"/>
        <p>View</p>
      </div>

      <div className="flex items-center gap-3 cursor-pointer">
        <img src="/folderIcon.png" alt="" className="w-7 h-7 object-cover"/>
        <p>Download</p>
      </div>
      </div>
    </div>
  );
};

export default HostDetails;

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
];
