export async function issueMemberNumber(deviceId: string): Promise<number | null> {
  try {
    const res = await fetch("/api/issue-member-number", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.memberNumber;
  } catch {
    return null;
  }
}
