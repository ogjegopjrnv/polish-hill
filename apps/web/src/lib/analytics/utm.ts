const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const COOKIE_EXPIRY_DAYS = 30;

export function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) {
      document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_EXPIRY_DAYS * 86400}; SameSite=Lax`;
    }
  }
}

export function getUtmParams(): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of UTM_PARAMS) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));
    if (match) result[key] = decodeURIComponent(match[1]);
  }
  return result;
}
