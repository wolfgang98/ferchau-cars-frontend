export interface IUser {
  id: string;
  username: string;
}

export async function getUsers(): Promise<IUser[]> {
  let result: IUser[] = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}/graphql`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetUsers {
            usersPermissionsUsers {
              data {
                id
                attributes {
                  username
                }
              }
            }
          }
        `,
      }),
      cache: "no-store",
    });

    if (response.ok) {
      result = ((await response.json()) as any).data.usersPermissionsUsers.data.map((res: any) => ({
        id: res.id,
        ...res.attributes,
      }));
    }
  } catch (err) {
    console.log(err);
  }

  return result;
}