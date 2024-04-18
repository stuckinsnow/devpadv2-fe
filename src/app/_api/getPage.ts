// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Overloaded versions of gql function

export async function getPage(query: string, variables?: Record<string, any>) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/graphql`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `users API-Key ${process.env.DB_API_KEY}`,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const { data, errors } = await res.json();

        if (errors) {
            throw new Error(errors[0].message);
        }

        if (res.ok && data) {
            return data;
        }
    } catch (e) {
        throw new Error(e as string);
    }
}
