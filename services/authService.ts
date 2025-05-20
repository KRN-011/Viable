import axios, { AxiosInstance } from "axios";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

class AuthService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: STRAPI_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async register(username: string, password: string, email: string) {
    try {
      const response = await this.apiClient.post("/api/auth/local/register", {
        username,
        password,
        email,
      });

      const data = response.data;

      return data;
    } catch (error) {
      throw new Error("Registration failed: " + error);
    }
  }

  async login(identifier: string, password: string) {
    try {
      const response = await this.apiClient.post("/api/auth/local", {
        identifier,
        password,
      });

      const data = response.data;

      return data;
    } catch (error) {
      throw new Error("Login failed: " + error);
    }
  }

  async logout() {
    try {
      const response = await this.apiClient.post("/api/auth/logout");

      const data = response.data;

      return data;
    } catch (error) {
      throw new Error("Logout failed: " + error);
    }
  }
}

export default new AuthService();
