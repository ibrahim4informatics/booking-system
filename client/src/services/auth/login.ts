import fetcher from "../config/axios"
export default async (data: { email: string, password: string }) => {
    try {

        const res = await fetcher.post("/auth/login", data);
        return res;

    }
    catch (err:any) {
        return err
    }
}