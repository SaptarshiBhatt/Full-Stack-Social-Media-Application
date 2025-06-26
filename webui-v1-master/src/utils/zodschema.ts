import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" })
    .max(20, { message: "Password should be at most 20 characters" }),
});

export const registerSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name should be at least 2 characters" }),

  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" })
    .max(20, { message: "Password should be at most 20 characters" }),
});
export const updateProfileSchema = z.object({
  first_name: z
    .string({ message: "Only string" })
    .min(2, { message: "Name should be 2 or more characters long" })
    .max(12, { message: "Name should be 12 or more characters long" }),
  last_name: z
    .string({ message: "Only string" })
    .min(2, { message: "Name should be 3 or more characters long" })
    .max(20, { message: "Name should be 20 or more characters long" }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  description: z
    .string({ message: "Only string" })
    .min(2, { message: "Name should be 20 or more characters long" })
    .max(100, { message: "Name should be 100 or more characters long" }),
});

export const postSchema = z.object({
  caption: z
    .string()
    .min(5, { message: "Caption should be atleast 5 characters" }),
  // postImage: z.instanceof(File),
});

export type Loginschemtype = z.infer<typeof loginSchema>;
export type Registerschemtype = z.infer<typeof registerSchema>;
export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;
export type PostSchemaType = z.infer<typeof postSchema>;
