import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/Schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
});
