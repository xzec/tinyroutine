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

const client = postgres(env.DATABASE_URL, {
  ssl: {
    ca: fs.readFileSync(awsCertificateFilePath).toString(),
  },
});

export const db = drizzle(client, { schema });
