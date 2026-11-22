import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const defaultUri =
  "mongodb://equip-rent-admin:EquipRent2026%23Secure@ac-m0gvdxt-shard-00-00.i3lu0gl.mongodb.net:27017,ac-m0gvdxt-shard-00-01.i3lu0gl.mongodb.net:27017,ac-m0gvdxt-shard-00-02.i3lu0gl.mongodb.net:27017/equip_rent_db?ssl=true&replicaSet=atlas-ccvxfd-shard-0&authSource=admin&retryWrites=true&w=majority";

const uri = process.env.BETTER_AUTH_DB_URI || defaultUri;

declare global {
  var _mongoAuthClient: MongoClient | undefined;
}

const client: MongoClient = global._mongoAuthClient || new MongoClient(uri);
if (!global._mongoAuthClient) {
  global._mongoAuthClient = client;
}

const db = client.db(process.env.DB_NAME || "equip_rent_db");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.BETTER_AUTH_URL,
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ].filter(Boolean) as string[],
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: true,
        defaultValue: "customer",
      },
      phone: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && !process.env.GOOGLE_CLIENT_ID.includes("mock")),
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GITHUB_CLIENT_ID && !process.env.GITHUB_CLIENT_ID.includes("mock")),
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
  secret: process.env.BETTER_AUTH_SECRET || "equiprent_super_secret_auth_key_2026_secure",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3001"),
});
