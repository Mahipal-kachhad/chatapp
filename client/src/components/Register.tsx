import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import * as z from "zod/v4";

const RegisterSchema = z
  .object({
    firstName: z.string().min(1, "first name is required"),
    lastName: z.string().optional(),
    email: z.email(),
    password: z
      .string()
      .min(8, "at least 8 charactors")
      .max(16, "less than 16 charactors"),
    rePassword: z
      .string()
      .min(8, "at least 8 charactors")
      .max(16, "less than 16 charactors"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password do not match",
    path: ["rePassword"],
  });

type TRegisterSchema = z.infer<typeof RegisterSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
    setLoading(true);
    const { firstName, lastName, email, password } = data;
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      if (responce.data.success) {
        toast.success("registered successfully");
        navigate("/");
      } else toast.error("error submitting data");
    } catch (error) {
      console.log(error);
      toast.error("internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl px-12 py-12 border border-slate-200"
      >
        <h1 className="text-2xl font-bold text-slate-700 mb-6 text-center">Register</h1>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="firstName" className="block mb-2 text-slate-600 font-medium">First Name <span className="text-red-600">*</span></label>
            <input
              className="w-full bg-slate-100 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 placeholder-slate-400 shadow-sm"
              id="firstName"
              {...register("firstName")}
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-700 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block mb-2 text-slate-600 font-medium">Last Name</label>
            <input
              className="w-full bg-slate-100 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 placeholder-slate-400 shadow-sm"
              id="lastName"
              {...register("lastName")}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-700 text-sm mt-1">{errors.lastName?.message}</p>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-slate-600 font-medium">Email <span className="text-red-600">*</span></label>
          <input
            className="w-full bg-slate-100 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 placeholder-slate-400 shadow-sm"
            id="email"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-700 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-slate-600 font-medium">Password <span className="text-red-600">*</span></label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full bg-slate-100 border border-slate-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 placeholder-slate-400 shadow-sm"
              placeholder="Password"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500">
              {showPassword ? (
                <EyeOff size={20} onClick={() => setShowPassword(false)} />
              ) : (
                <Eye size={20} onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-700 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-7">
          <label htmlFor="rePassword" className="block mb-2 text-slate-600 font-medium">Reenter Password <span className="text-red-600">*</span></label>
          <input
            className="w-full bg-slate-100 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 placeholder-slate-400 shadow-sm"
            id="rePassword"
            type="password"
            {...register("rePassword")}
            placeholder="Reenter Password"
          />
          {errors.rePassword && (
            <p className="text-red-700 text-sm mt-1">{errors.rePassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-colors duration-200 text-lg mb-4 ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-800'}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Registering...
            </span>
          ) : (
            'Register'
          )}
        </button>
        <p className="text-center text-slate-600 mt-2">Already have an account?</p>
        <Link
          className="block mx-auto w-full px-6 py-3 mt-3 bg-slate-500 hover:bg-slate-700 rounded-xl text-white font-semibold shadow transition-colors duration-200 text-center"
          to={"/"}
        >
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
