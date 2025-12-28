import { useState } from "react";
import CarDetailsModal from "./CarDetailsModal";
import CartList from "./CartList";

const CarManage = () => {
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);


  

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl text-primary font-semibold">Car List</h1>
      </div>

      <div className="bg-white h-full shadow">
        <CartList          
          open={open}
          setOpen={setOpen}
          setSelectedCar={setSelectedCar} />
      </div>

      {open && <CarDetailsModal
        open={open}
        selectedCar={selectedCar}
        onClose={() => setOpen(false)}
      />}

    </div>
  );
};

export default CarManage;


