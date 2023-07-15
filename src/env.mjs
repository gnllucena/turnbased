import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NEXTAUTH_SECRET: z.string().cuid(),
    NEXTAUTH_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_PUBLIC_VAR: z.string().min(1),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production"]),
  },
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_PUBLIC_VAR: process.env.NEXT_PUBLIC_PUBLIC_VAR,
    NODE_ENV: process.env.NODE_ENV,
  },
})
