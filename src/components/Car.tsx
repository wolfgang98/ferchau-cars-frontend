import { ICar } from "@/util/cars";
import { IRent, createRent } from "@/util/rents";
import { IUser } from "@/util/users";
import React from "react";
import { Button } from "./Button";

interface CarProps {
  car: ICar;
  rent?: IRent;
  rentedUser?: IUser;
}

export const Car: React.FC<CarProps> = ({ car, rent, rentedUser }) => {
  async function handleClick() {
    const result = await createRent(car.id, "1", 500);
    if (result) {
      window.location.reload();
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between rounded-sm overflow-hidden border-2">
      <img
        className="object-cover aspect-square"
        src={`${process.env.NEXT_PUBLIC_API_URL}${car.Cover}`}
      />
      <div className="flex flex-col gap-4 p-2 justify-center">
        <span className="text-lg">
          {`${car.Manufacturer} ${car.Model} (${car.Year})`}
        </span>
        {rentedUser && rent ? (
          <span className="text-base">
            Rented by <b>{rentedUser.username}</b> for <b>{rent.Kilometre}km</b>
          </span>
        ) : (
          <Button onClick={handleClick}>Rent</Button>
        )}
      </div>
    </div>
  );
};
