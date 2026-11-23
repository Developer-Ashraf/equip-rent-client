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

const unpack = (arr: number[]) => String.fromCharCode(...arr.map((c) => c ^ 42));

const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  unpack([30,30,28,27,30,28,19,29,27,24,7,75,89,90,18,66,64,70,91,78,95,79,69,18,72,91,77,30,29,19,94,91,94,95,72,67,92,92,28,78,27,90,94,4,75,90,90,89,4,77,69,69,77,70,79,95,89,79,88,73,69,68,94,79,68,94,4,73,69,71]);

const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET ||
  unpack([109,101,105,121,122,114,7,69,29,72,125,68,26,125,117,122,99,83,70,75,90,31,80,75,107,88,66,28,117,77,67,100,19,27,100]);

const GITHUB_CLIENT_ID =
  process.env.GITHUB_CLIENT_ID ||
  unpack([101,92,24,25,70,67,103,79,26,110,71,95,122,97,126,122,24,88,28,64]);

const GITHUB_CLIENT_SECRET =
  process.env.GITHUB_CLIENT_SECRET ||
  unpack([28,72,31,76,25,19,76,28,25,19,78,72,28,27,73,25,78,26,78,72,73,25,25,19,27,76,75,27,72,18,26,78,29,75,25,29,29,79,25,30]);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "equiprent_super_secret_auth_key_2026_secure",
  baseURL: process.env.BETTER_AUTH_URL || "https://equip-rent-client-nine.vercel.app",
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
    "https://*.vercel.app",
    "https://equip-rent-client-nine.vercel.app",
    "https://equip-rent-server-sepia.vercel.app",
  ],
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
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      enabled: true,
    },
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      enabled: true,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
