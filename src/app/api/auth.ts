export const clientId = import.meta.env.VITE_CLIENT_ID;

export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "https://melodix.netlify.app/callback");
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function getAccessToken(
  clientId: string,
  code: string
): Promise<string> {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://melodix.netlify.app/callback");
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token, expires_in, refresh_token } = await result.json();

  if (access_token && expires_in && refresh_token) {
    localStorage.setItem("access_token", access_token);
    const expirationTime = Date.now() + expires_in * 1000;
    localStorage.setItem("token_expiration", expirationTime.toString());
    localStorage.setItem("refresh_token", refresh_token);
  }

  return access_token;
}
export const checkAndRefreshToken = async () => {
  const tokenExpiration = localStorage.getItem("token_expiration");
  const token = localStorage.getItem("access_token");

  if (tokenExpiration && Date.now() >= Number(tokenExpiration)) {
    await getRefreshToken(clientId);
  }

  return token;
};
export const getRefreshToken = async (clientId: string) => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("Refresh token is not available.");
  }

  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };

  const body = await fetch(url, payload);
  const response = await body.json();

  if (response.refresh_token && response.access_token && response.expires_in) {
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
    const expirationTime = Date.now() + response.expires_in * 1000;
    localStorage.setItem("token_expiration", expirationTime.toString());
  }
};

export function getAccessTokenFromStorage(): string | null {
  return localStorage.getItem("access_token");
}
