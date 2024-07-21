import { z } from "zod"

const requiredString = z.string().trim().min(1, "Required")

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, '-', '_'",
  ),
  password: requiredString.min(
    8,
    "Password must be at least 8 characters long",
  ),
})

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
})

export const createPostSchema = z.object({
  content: requiredString,
})

export type SignUpSchema = z.infer<typeof signUpSchema>
export type LoginSchema = z.infer<typeof loginSchema>
export type CreatePostSchema = z.infer<typeof createPostSchema>
