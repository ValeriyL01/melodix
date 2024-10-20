import { clientId, getAccessToken, redirectToAuthCodeFlow } from "./auth";

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

export const getToken = async () => {
  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } else {
    await getAccessToken(clientId, code);
  }
};
