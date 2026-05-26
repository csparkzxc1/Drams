export async function POST() {
  // Phase 1: Vercel KV 연결 전 placeholder
  // Vercel KV 설정 후 아래 코드로 교체:
  // import { kv } from "@vercel/kv";
  // const number = await kv.incr("drams:member:counter");
  // return Response.json({ memberNumber: number });

  return Response.json(
    { error: "Member number issuance not configured yet" },
    { status: 503 }
  );
}
