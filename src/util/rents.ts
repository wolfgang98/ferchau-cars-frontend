export interface IRent {
  userId: string;
  carId: string;
  Kilometre: number;
}

export async function getRents(): Promise<IRent[]> {
  let result: IRent[] = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}/graphql`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetRents {
            rents {
              data {
                id
                attributes {
                  user {
                    data {
                      id
                    }
                  }
                  car {
                    data {
                      id
                    }
                  }
                  Kilometre
                }
              }
            }
          }
        `,
      }),
      cache: "no-store",
    });

    if (response.ok) {
      result = ((await response.json()) as any).data.rents.data.map((res: any) => ({
        id: res.id,
        userId: res.attributes.user.data.id,
        carId: res.attributes.car.data.id,
        Kilometre: res.attributes.Kilometre,
      }));
    }
  } catch (err) {
    console.log(err);
  }

  return result;
}

export async function createRent(carId: string, userId: string, kilometre: number): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rents`, {
      method: "POST",
      mode: 'cors',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          car: carId,
          user: userId,
          Kilometre: kilometre
        }
      }),
      cache: "no-store",
    });

    if (response.ok) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }

  return false;
}