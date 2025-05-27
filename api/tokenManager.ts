import Cookies from "js-cookie";

const tokenManager = {
  setUser: (user: { username: string; role: "admin" | "editor" }) => {
    Cookies.set("user", JSON.stringify(user), { expires: 7 }); // 7 days expiry
  },

  getUser: (): { username: string; role: "admin" | "editor" } | null => {
    const user = Cookies.get("user");
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  removeUser: () => {
    Cookies.remove("user");
  },
};

export default tokenManager;
