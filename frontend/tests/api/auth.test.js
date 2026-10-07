import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    checkHealth,
    signup,
    login,
    forgotPassword,
    resetPassword
} from "../../src/api/auth";

describe("Authentication API", () =>{
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("check API health", async() =>{
        const mockData = {
            status: "ok",
        };
    
    globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async()=> mockData,
    });

    const result = await checkHealth();

    expect(fetch).toHaveBeenCalledWith(
        "/api/health",
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    expect(result).toEqual(mockData);
    });

    it("signs up a user", async ()=>{
        const userData = {
            firstName: "John",
            lastName: "Smith",
            telephone: "0123456789",
            email: "john@test.com",
            password: "password123",
        };

        const mockData = {
            message: "Signup successful",
        };

        globalThis.fetch= vi.fn().mockResolvedValue({
            ok: true,
            json: async()=> mockData,
        });

        const result = await signup(userData);

        expect(fetch).toHaveBeenCalledWith(
            "/api/auth/signup",
            {
                headers: {
                   "Content-Type": "application/json", 
                },
                method: "POST",
                body:JSON.stringify(userData),
            }
        );
        expect(result).toEqual(mockData);
    });

    it("login a user", async()=>{

        const loginData={
            email: "abc@gmail.com",
            password: "abcd1234"
        };

        const mockData={
            message: "Login successful",
            token: "fake-token"
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async()=> mockData,
        });

        const result = await login(loginData);

        expect(fetch).toHaveBeenCalledWith(
            "/api/auth/login",
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:"POST",
                body:JSON.stringify(loginData)
            }
        );
        expect(result).toEqual(mockData);
    });
    it("sends a forgot password request", async () => {

        const emailData = {
            email: "john@test.com",
        };

        const mockData = {
            message: "Reset email sent",
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await forgotPassword(emailData);

        expect(fetch).toHaveBeenCalledWith(
            "/api/auth/forgot-password",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(emailData),
            }
        );

        expect(result).toEqual(mockData);
    });


    it("resets the password", async () => {

        const resetData = {
            token: "fake-token",
            password: "newPassword123",
        };

        const mockData = {
            message: "Password reset successful",
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await resetPassword(resetData);

        expect(fetch).toHaveBeenCalledWith(
            "/api/auth/reset-password",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(resetData),
            }
        );

        expect(result).toEqual(mockData);
    });


    it("throws an error when the API request fails", async () => {

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Invalid email or password",
            }),
        });

        await expect(
            login({
                email: "wrong@test.com",
                password: "wrongpassword",
            })
        ).rejects.toThrow(
            "Invalid email or password"
        );
    });

});