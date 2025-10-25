import { Box } from "@mui/material";

const Statics = ({ users }: any) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-x-10 justify-between">
      <Box
        sx={{
          backgroundColor: "var(--color-blue)",
          borderRadius: 2,
          p: 3,
        }}
      >
        <p className="text-2xl text-center text-white font-normal">
          Total Users
        </p>
        <h1 className="font-semibold text-center text-white mt-4 text-4xl">
          5000
        </h1>
      </Box>
      <Box
        sx={{
          backgroundColor: "var(--color-blue)",
          borderRadius: 2,
          p: 3,
        }}
      >
        <p className="text-2xl text-center text-white font-normal">
          Total Cars
        </p>
        <h1 className="font-semibold text-center text-white mt-4 text-4xl">
          5000
        </h1>
      </Box>
      <Box
        sx={{
          backgroundColor: "var(--color-blue)",
          borderRadius: 2,
          p: 3,
        }}
      >
        <p className="text-2xl text-center text-white font-normal">
          Total Bookings
        </p>
        <h1 className="font-semibold text-center text-white mt-4 text-4xl">
          5000
        </h1>
      </Box>

      <Box
        sx={{
          backgroundColor: "var(--color-blue)",
          borderRadius: 2,
          p: 3,
        }}
      >
        <p className="text-2xl text-center text-white font-normal">
          Total Revenue
        </p>
        <h1 className="font-semibold text-center text-white mt-4 text-4xl">
          5000
        </h1>
      </Box>
    </div>
  );
};

export default Statics;
