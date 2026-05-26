export async function issueMemberNumber(): Promise<number | null> {
  try {
    const res = await fetch("/api/issue-member-number", { method: "POST" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.memberNumber;
  } catch {
    return null;
  }
}
