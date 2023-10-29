import { type Config } from "drizzle-kit";
import path from "path";

import { env } from "~/env.mjs";

const awsCertificateFilePath = path.join(
  process.cwd(),
  env.DATABASE_CERT_FILE_NAME,
);
const connectionString = `${env.DATABASE_URL}&sslrootcert=${awsCertificateFilePath}`;

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
