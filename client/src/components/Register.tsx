import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: TRegisterSchema) => {
    console.log(data);
    reset();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-blue-200 px-5 rounded-md">
        <h1 className="py-4 text-center text-2xl font-medium">
          Register Your Self
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="mb-5">
              <label className="block mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                className="bg-gray-200 w-full border rounded p-2"
                id="firstName"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-900">{errors.firstName.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label className="block mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="bg-gray-200 w-full border rounded p-2"
                id="lastName"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-900">{errors.lastName?.message}</p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="bg-gray-200 w-full border rounded p-2"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-900">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="bg-gray-200 w-full border rounded p-2"
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-900">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label className="block mb-1" htmlFor="rePassword">
              Reenter Password
            </label>
            <input
              className="bg-gray-200 w-full border rounded p-2"
              id="rePassword"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-900">{errors.rePassword.message}</p>
            )}
          </div>
          <input
            type="submit"
            value="Register"
            className="px-6 py-2 bg-cyan-900 block mx-auto rounded text-white mb-4"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
