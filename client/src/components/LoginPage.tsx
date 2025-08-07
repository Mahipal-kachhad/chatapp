import axios, { AxiosError } from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import type { ApiErrorResponse } from "../interfaces/Props";
import { Eye, EyeOff } from "lucide-react";

interface Data {
  email: string;
  password: string;
}
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-10 border border-slate-200"
      >
        <h1 className="text-2xl font-bold text-slate-700 mb-6 text-center">Sign In</h1>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-slate-600 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={data.email}
            onChange={handleChange}
            className="w-full bg-slate-100 text-base p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 placeholder-slate-400 shadow-sm"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-7">
          <label htmlFor="password" className="block mb-2 text-slate-600 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full bg-slate-100 text-base p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 placeholder-slate-400 shadow-sm"
              required
              placeholder="Enter your password"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500">
              {showPassword ? (
                <EyeOff size={20} onClick={() => setShowPassword(false)} />
              ) : (
                <Eye size={20} onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Log In"
          className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-800 rounded-xl text-white font-semibold shadow-lg transition-colors duration-200 text-lg mb-4"
        />
        <p className="text-center text-slate-600 mt-2">Don't have an account?</p>
        <Link
          className="block mx-auto w-full px-6 py-3 mt-3 bg-slate-500 hover:bg-slate-700 rounded-xl text-white font-semibold shadow transition-colors duration-200 text-center"
          to={"/register"}
        >
          Register
        </Link>
      </form>
    </div>
  );
};
export default LoginPage;
