import api from "../api";

// src/services/auth/getGuestSession.ts
export const getGuestSession = async () => {
try {
const { data } = await api.get("/authentication/guest_session/new");
return data;
} catch (error) {
throw error;
}
};