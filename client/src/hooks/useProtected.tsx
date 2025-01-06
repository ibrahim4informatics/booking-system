import fetcher from "@/services/config/axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default () => {
    const nav = useNavigate();
    useEffect(() => {
        fetcher("/auth/check")
            .then(res => {
                if (res.status === 200) {
                    console.log("access allowed");
                }
            })
            .catch(err => {
                if (err.response.status === 401) nav("/login");
            })
    }, []);
}