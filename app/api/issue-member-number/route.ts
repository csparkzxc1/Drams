import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return Response.json(
      { error: "KV not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    const deviceId: string | undefined = body?.deviceId;

    if (deviceId) {
      const existing = await kv.get<number>(`drams:member:device:${deviceId}`);
      if (existing !== null) {
        return Response.json({ memberNumber: existing });
      }
    }

    const number = await kv.incr("drams:member:counter");

    if (deviceId) {
      await kv.set(`drams:member:device:${deviceId}`, number);
    }

    return Response.json({ memberNumber: number });
  } catch (err) {
    console.error("Failed to issue member number:", err);
    return Response.json(
      { error: "Failed to issue member number" },
      { status: 500 }
    );
  }
}
