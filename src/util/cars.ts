export interface ICar {
  id: string;
  Manufacturer: string;
  Model: string;
  Year: number;
  Cover: string;
  createdAt: string;
  updatedAt: string;
}

export async function getCars(): Promise<ICar[]> {
  let result: ICar[] = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}/graphql`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetCars {
            cars {
              data {
                id
                attributes {
                  Manufacturer
                  Model
                  Year
                  Cover {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
      cache: "no-store",
    });

    if (response.ok) {
      result = ((await response.json()) as any).data.cars.data.map((res: any) => ({
        id: res.id,
        ...res.attributes,
        Cover: res.attributes.Cover.data.attributes.url,
      }));
    }
  } catch (err) {
    console.log(err);
  }

  return result;
}