import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);

        return decoded.exp * 1000 < Date.now();

    } catch {
        return true;
    }
};

export const getToken = (): string | null => {
    return localStorage.getItem("token");
};

export const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
};

export const isAuthenticated = (): boolean => {

    const token = getToken();

    if (!token) return false;

    if (isTokenExpired(token)) {

        removeToken();

        return false;
    }

    return true;
};