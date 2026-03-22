const API_BASE = "http://localhost:3000";

const api = async (path, options = {}) => {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        credentials: "include",
    });

    if (res.status === 401) {
        await fetch(`${API_BASE}/logout`, {
            credentials: "include",
        });

        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login?error=Something+went+wrong,+login+again.";
        return;
    }

    return res;
};

export default api;
