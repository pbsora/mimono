"use client";

import { useFormState } from "react-dom";
import { loginAction } from "../../../actions/authActions";

const LoginPage = () => {
  const [error, action] = useFormState(loginAction, null);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="flex flex-col w-[300px]"
        action={action}
      >
        <input
          type="text"
          placeholder="Username"
          className="mb-4 p-2 border border-gray-300 rounded"
          name="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 border border-gray-300 rounded"
          name="password"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:cursor-pointer"
        >
          Login
        </button>
        {error && (
          <p className="text-red-500 text-center mt-2">
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
};
export default LoginPage;
