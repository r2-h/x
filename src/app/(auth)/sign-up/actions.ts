"use server"
import { generateIdFromEntropySize } from "lucia"
import { hash } from "@node-rs/argon2"
import { lucia } from "@/auth"
import { SignUpSchema, signUpSchema } from "@/lib/validation"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isRedirectError } from "next/dist/client/components/redirect"

export async function signUp(
  credentials: SignUpSchema,
): Promise<{ error: string }> {
  try {
    const { email, password, username } = signUpSchema.parse(credentials)
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    })
    const userIdFromLucia = generateIdFromEntropySize(10)

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    })
    if (existingUsername) {
      return { error: "Username already taken" }
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    })
    if (existingEmail) {
      return { error: "Email already exist" }
    }

    await prisma.user.create({
      data: {
        id: userIdFromLucia,
        email,
        username,
        displayName: username,
        passwordHash,
      },
    })

    const session = await lucia.createSession(userIdFromLucia, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
    redirect("/")
  } catch (error) {
    if (isRedirectError(error)) throw error
    return { error: "Something went wrong" }
  }
}
