import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
    const { firstName, lastName, email, password } = data;
    try {
      const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      if (responce.data.success) {
        toast.success("registered successfully");
        navigate("/");
        reset();
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
                First Name
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
              Email
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
              Password
            </label>
            <input
              className="bg-gray-100 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-700 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label className="block mb-1 text-gray-700" htmlFor="rePassword">
              Reenter Password
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
