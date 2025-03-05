import { API_URL } from "..";
import { setTokens } from "../config/tokenConfig";

export const login = async (username: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.json().catch(() => null);
            throw new Error(errorMessage?.detail || "Login yoki parol xato");
        }

        const data = await response.json();
        
        if (!data.access || !data.refresh) {
            throw new Error("Tokenlar topilmadi, login muvaffaqiyatsiz boldi");
        }

        setTokens(data.access, data.refresh);
    } catch (error) {
        console.error("Login xatosi:", error);
        throw new Error(error instanceof Error ? error.message : "Server bilan boglanib bolmadi");
    }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.json().catch(() => null);
      throw new Error(errorMessage?.detail || "Royxatdan otishda xatolik yuz berdi");
    }

    return await response.json();
  } catch (error) {
    console.error("API register xatosi:", error);
    throw new Error(error instanceof Error ? error.message : "Server bilan boglanib bolmadi");
  }
};

