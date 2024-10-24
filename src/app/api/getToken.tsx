import {
  checkAndRefreshToken,
  clientId,
  getAccessToken,
  getAccessTokenFromStorage,
  redirectToAuthCodeFlow,
} from "./auth";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

export const getToken = async () => {
  const token = await checkAndRefreshToken();
  console.log("код:", code);
  if (!code && !token) {
    redirectToAuthCodeFlow(clientId);
  } else if (code) {
    await getAccessToken(clientId, code);
  }
};
