export function createdOnStamp() {
  return new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/** POST a lead payload to TeleCRM. Throws on any non-success response. */
export async function postToTeleCRM(payload: unknown) {
  const endpoint = process.env.TELECRM_API_URL;
  if (!endpoint) throw new Error("TELECRM_API_URL environment variable is not set");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        "X-Client-ID": "nextjs-website-integration",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.status === 204) return { synced: true };

    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(`TeleCRM returned HTTP ${response.status}: ${responseText.slice(0, 200)}`);
    }
    if (!responseText) return { synced: true };
    if (responseText.trim().startsWith("<")) throw new Error("TeleCRM returned an HTML response");
    return { ...JSON.parse(responseText), synced: true };
  } finally {
    clearTimeout(timeout);
  }
}
