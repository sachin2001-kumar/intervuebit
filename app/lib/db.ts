import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/app/drizzle/Schema";

const sql = neon(
  "postgresql://neondb_owner:npg_RASeq0cz7COv@ep-gentle-feather-a2mhsay4-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);
export const db = drizzle(sql, { schema });
