import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
export const TOKEN_KEY = "pb_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
export function isAuthed() {
  return !!getToken();
}

const client = axios.create({ baseURL: API });

client.interceptors.request.use((cfg) => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

client.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      clearToken();
      if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(err);
  }
);

export const adminApi = {
  login: (password) => client.post("/admin/login", { password }).then((r) => r.data),
  me: () => client.get("/admin/me").then((r) => r.data),
  stats: () => client.get("/admin/stats").then((r) => r.data),
  bookings: () => client.get("/admin/bookings").then((r) => r.data),
  updateBooking: (id, status) => client.patch(`/admin/bookings/${id}`, { status }).then((r) => r.data),
  quotes: () => client.get("/admin/quotes").then((r) => r.data),
  contacts: () => client.get("/admin/contacts").then((r) => r.data),
  wingmanLeads: () => client.get("/wingman/leads").then((r) => r.data),
  wingmanResearch: () => client.get("/wingman/research").then((r) => r.data),
  wingmanCompetitors: () => client.get("/wingman/competitors").then((r) => r.data),
  chats: () => client.get("/admin/chats").then((r) => r.data),
  chatMessages: (id) => client.get(`/admin/chats/${id}`).then((r) => r.data),
};

export default client;
