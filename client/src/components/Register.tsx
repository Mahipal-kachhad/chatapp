import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
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
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#E5DDD5]">
      <div className="bg-white px-8 py-8 rounded-md shadow-lg w-full max-w-md border border-gray-200">
        <h1 className="py-4 text-center text-2xl font-semibold text-gray-800">
          Register Your Self
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="mb-5 flex-1">
              <label className="block mb-1 text-gray-700" htmlFor="firstName">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                className="bg-gray-100 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
                id="firstName"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-700 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="mb-5 flex-1">
              <label className="block mb-1 text-gray-700" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="bg-gray-100 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
                id="lastName"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-700 text-sm">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label className="block mb-1 text-gray-700" htmlFor="email">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              className="bg-gray-100 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-700 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label className="block mb-1 text-gray-700" htmlFor="password">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="bg-gray-100 w-full border border-gray-300 rounded p-2 pr-10 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
                placeholder="Password"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
                {showPassword ? (
                  <EyeOff size={20} onClick={() => setShowPassword(false)} />
                ) : (
                  <Eye size={20} onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-700 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label className="block mb-1 text-gray-700" htmlFor="rePassword">
              Reenter Password <span className="text-red-600">*</span>
            </label>
            <input
              className="bg-gray-100 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
              id="rePassword"
              type="password"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-700 text-sm">
                {errors.rePassword.message}
              </p>
            )}
          </div>
          <input
            type="submit"
            value="Register"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 block mx-auto rounded text-white font-semibold mb-4 transition-colors duration-200"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
