import { Car } from "@/components/Car";
import { getCars } from "@/util/cars";
import { getRents } from "@/util/rents";
import { getUsers } from "@/util/users";
import { GetServerSideProps } from "next";
import React from "react";
// import { useSession, signIn, signOut } from "next-auth/react";

export default function Index({
  cars,
  users,
  rents,
}: {
  cars: Awaited<ReturnType<typeof getCars>>;
  users: Awaited<ReturnType<typeof getUsers>>;
  rents: Awaited<ReturnType<typeof getRents>>;
}) {
  function getRent(carId: string) {
    const rent = rents.find((r) => r.carId == carId);
    if (rent) {
      return rent;
    }
  }

  function getRentedUser(carId: string) {
    const rent = getRent(carId);
    if (rent) {
      const user = users.find((u) => u.id == rent?.userId);
      return user;
    }
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-3 p-2">
        {cars.map((car, index) => (
          <Car
            key={index}
            car={car}
            rent={getRent(car.id)}
            rentedUser={getRentedUser(car.id)}
          />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //const session = await getSession({ req: context.req });

  const cars = await getCars();
  const users = await getUsers();
  const rents = await getRents();

  return {
    props: {
      cars,
      users,
      rents,
    },
  };
};
