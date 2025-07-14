import axios, { AxiosError } from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import type { ApiErrorResponse } from "../interfaces/Props";

interface Data {
  email: string;
  password: string;
}
const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/authenticate`,
        { email, password },
        { withCredentials: true }
      );
      if (responce.data.success === true) {
        setData({ email: "", password: "" });
        navigate("/dashboard");
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      if (axios.isAxiosError<ApiErrorResponse>(error) && error.response)
        toast.error(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className="items-center flex h-screen bg-[#E5DDD5]">
      <div className="w-full max-w-md mx-auto bg-white rounded-md px-8 py-8 shadow-lg border border-gray-200">
        <h1 className="w-fit mx-auto text-3xl py-2 font-semibold text-gray-800">
          Welcome
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <label htmlFor="email" className="block pb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={data.email}
              onChange={handleChange}
              className="w-full bg-gray-100 text-lg p-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
            />
          </div>
          <div className="pb-4">
            <label htmlFor="password" className="block pb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full bg-gray-100 text-lg p-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value="Log In"
              className="w-fit mx-auto block px-6 py-2 bg-green-500 hover:bg-green-600 rounded my-4 text-white font-semibold transition-colors duration-200"
            />
          </div>
        </form>
        <p className="text-center text-gray-700">Don't have an account?</p>
        <Link
          className="block mx-auto w-fit px-6 py-2 my-3 bg-green-500 hover:bg-green-600 rounded text-white font-semibold transition-colors duration-200"
          to={"/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
