import { Fetch } from "@/utils/Fetch";

const baseUrl = "https://onyx-ai-server.vercel.app/api/v1";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1N2ZhZTYwLWY3MjctNGYyMC05MmM0LTUxOTk3MTI4MzM2OCIsIm5hbWUiOiJoYXJzaCIsImVtYWlsIjoiaGFyc2guMUBnbWFpbC5jb20iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzM0ODQ2ODAyLCJleHAiOjE3MzQ4NTA0MDJ9.84cubuIJEMtwF60_LNEjGePJvWoH2W1JkIxhkLfdiKY";

// histories fetch request
export const createConversationHistory = ({ signal, data }) => {
    return Fetch(`${baseUrl}/histories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        signal,
    });
};
export const fetchConversationHistories = async ({ signal }) => {
    const response = await Fetch(`${baseUrl}/histories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        signal,
    });
    const data = await response.json();
    return data.data.histories;
};
export const fetchConversationHistoryById = ({ signal, id }) => {
    return Fetch(`${baseUrl}/histories/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        signal,
    });
};
export const deleteConversationHistoryById = ({ signal, id }) => {
    return Fetch(`${baseUrl}/histories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        signal,
    });
};
