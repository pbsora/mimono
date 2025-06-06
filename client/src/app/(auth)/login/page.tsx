"use client";

import { loginAction } from "../../../actions/authActions";
import { useActionState } from "react";

const LoginPage = () => {
  const [error, action, isPending] = useActionState(
    loginAction,
    null
  );

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="flex flex-col w-[300px]"
        action={action}
      >
        <input
          type="text"
          placeholder="Username"
          className="mb-4 p-2 border border-gray-300 rounded text-white"
          name="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 border border-gray-300 rounded text-white"
          name="password"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Wait a moment" : "Login"}
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
