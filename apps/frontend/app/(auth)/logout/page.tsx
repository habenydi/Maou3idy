import axios from "axios";
import { toast } from "react-toastify";

export default  async function LogoutPage() {
    try {
      await axios.post("http://localhost:1337/auth/logout", {}, {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
}