import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const defaultUri =
  "mongodb://equip-rent-admin:EquipRent2026%23Secure@ac-m0gvdxt-shard-00-00.i3lu0gl.mongodb.net:27017,ac-m0gvdxt-shard-00-01.i3lu0gl.mongodb.net:27017,ac-m0gvdxt-shard-00-02.i3lu0gl.mongodb.net:27017/equip_rent_db?ssl=true&replicaSet=atlas-ccvxfd-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI || defaultUri);
const db = client.db(process.env.DB_NAME || "equip_rent_db");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["customer", "owner", "admin"],
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
      clientId: process.env.GOOGLE_CLIENT_ID || "mock_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_google_secret",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== "mock_google_id"),
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
      : "http://localhost:3000"),
});
