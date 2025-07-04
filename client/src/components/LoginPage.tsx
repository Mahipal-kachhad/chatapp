import { useState, type ChangeEvent, type FormEvent } from "react";

interface Data {
  email: string;
  password: string;
}
const LoginPage = () => {
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setData({ email: "", password: "" });
  };

  return (
    <div className="items-center flex h-screen">
      <div className="w-sm mx-auto bg-blue-200 rounded-md px-4">
        <h1 className="w-fit mx-auto text-3xl py-2">Welcome</h1>
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <label htmlFor="email" className="block pb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={data.email}
              onChange={handleChange}
              className="w-full bg-white text-xl p-2 rounded border-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block pb-1">
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full bg-white text-xl p-2 rounded border-1"
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value="Log In"
              className="w-fit mx-auto block px-6 py-2 bg-cyan-800 rounded my-4 text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
