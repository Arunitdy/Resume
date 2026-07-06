import api from "../api/axios";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    name: string;
    email: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    console.log("authservice Login request data:", data); // Debugging line

    const response = await api.post<LoginResponse>(
        "/auth/login",
        data
    );

    return response.data;
};

export const register = async (
    data: RegisterRequest
) => {
    console.log("authservice Register request data:", data); // Debugging line
    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;
};

export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

};