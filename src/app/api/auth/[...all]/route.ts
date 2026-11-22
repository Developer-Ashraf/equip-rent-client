export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export const GET = async (req: Request) => {
  try {
    return await handlers.GET(req);
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.message || error.toString(),
        stack: error.stack,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    return await handlers.POST(req);
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.message || error.toString(),
        stack: error.stack,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
