import {
  checkAndRefreshToken,
  clientId,
  getAccessToken,
  redirectToAuthCodeFlow,
} from "./auth";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

export const getToken = async () => {
  const token = await checkAndRefreshToken();

  if (!code && !token) {
    redirectToAuthCodeFlow(clientId);
  } else if (code) {
    await getAccessToken(clientId, code);
  }
};
