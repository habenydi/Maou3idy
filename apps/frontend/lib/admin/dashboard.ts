import axios from 'axios';

export async function getDashboardStats() {
  const response = await axios.get(
    'http://localhost:1337/admin/dashboard'
  );

  return response.data;
}