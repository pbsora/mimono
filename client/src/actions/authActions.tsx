"use server";

import { z } from "zod";
import API from "../utils/api";
import { cookies } from "next/headers";
import { isAggregateError } from "../utils/helpers";

const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

export const loginAction = async (
  _: unknown,
  formData: FormData
) => {
  try {
    const { success, data, error } = loginSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!success) {
      console.log(error);
      return { message: error.errors[0].message };
    }

    const { username, password } = data;

    const res = await API.post("auth/login", {
      username,
      password,
    });

    if (!res.ok) {
      const message = await res.json();
      return message;
    }

    const token = Object.values(
      await res.json()
    )[0] as string;

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    return true;
  } catch (error) {
    //For some reason redirect cannot be used inside a try-catch block, so this is a workaround
    // if (error.message === "NEXT_REDIRECT") {
    //   redirect("/dashboard");
    // }

    if (isAggregateError(error)) {
      const cause = error.cause as { code?: string };
      console.log(cause.code);
      if (cause.code === "ECONNREFUSED") {
        return {
          message:
            "Server is down! Please try again later.",
        };
      } else {
        return {
          message:
            "Unknown error occurred. Please try again later.",
        };
      }
    }
  }
};
