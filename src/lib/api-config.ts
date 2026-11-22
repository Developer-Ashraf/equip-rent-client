export const getApiUrl = (): string => {
  let envUrl = (process.env.NEXT_PUBLIC_API_URL || "").trim();
  if (envUrl.startsWith("ttps://")) {
    envUrl = "h" + envUrl;
  }
  if (envUrl.startsWith("ttp://")) {
    envUrl = "h" + envUrl;
  }
  if (
    envUrl &&
    (envUrl.startsWith("http://") || envUrl.startsWith("https://")) &&
    !envUrl.includes("localhost") &&
    !envUrl.includes("127.0.0.1")
  ) {
    return envUrl.replace(/\/$/, "");
  }
  return "https://equip-rent-server-sepia.vercel.app";
};

export const API_BASE_URL = getApiUrl();
