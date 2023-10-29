import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import path from "path";
import fs from "fs";

import { env } from "~/env.mjs";
import * as schema from "./schema";

const awsCertificateFilePath = path.join(
  process.cwd(),
  env.DATABASE_CERT_FILE_NAME,
);

fs.readFileSync(awsCertificateFilePath).toString();

// for migrations
const migrationClient = postgres(env.DATABASE_URL, {
  max: 1,
  ssl: {
    ca: fs.readFileSync(awsCertificateFilePath).toString(),
  },
});

// TODO delete test select
try {
  const currentDbTime = await migrationClient`
    select now()
  `;
  console.log("✅  Connected to the database", currentDbTime);
} catch (error) {
  console.error("❌  Error connecting to the database:", error);
}

// for query purposes
const queryClient = postgres(env.DATABASE_URL, {
  ssl: {
    ca: fs.readFileSync(awsCertificateFilePath).toString(),
  },
});

export const db = drizzle(queryClient, { schema });
