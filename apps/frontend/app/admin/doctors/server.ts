import axios from "axios";
import { cookies } from "next/headers";

export async function getDoctorApplicationSummary() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await axios.get(
    "http://localhost:1337/admin/doctor-applications/stats",
    {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
    }
  );

  return response.data;
}