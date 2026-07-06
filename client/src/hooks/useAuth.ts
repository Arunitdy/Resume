import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/tockenUtils";

const useAuth = () => {

    const navigate = useNavigate();

    useEffect(() => {

        if (!isAuthenticated()) {

            navigate("/");

        }

    }, [navigate]);

};

export default useAuth;