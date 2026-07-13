import axios from "axios";

export default async function FetchUsers() {
    const response = await axios.get("http://localhost:1337/admin/users", { withCredentials: true });
    return response.data.users;
}