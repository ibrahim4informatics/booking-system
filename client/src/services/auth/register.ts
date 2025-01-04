import fetcher from "../config/axios"
export default async (data: Record<string, unknown>) => {
    try {
        const res = await fetcher.post("/auth/register", data);
        return res
    }
    catch (err: any) {
        return err;
    }
}