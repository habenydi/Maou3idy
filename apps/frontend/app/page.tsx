"use client";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );

      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name")}
        placeholder="Name"
      />

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
      />

      <button type="submit">Login</button>
    </form>
  );
}