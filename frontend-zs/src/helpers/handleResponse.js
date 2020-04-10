import { authenticationService } from "../services/authentication.service";

export async function handleResponse(response) {
  const responseText = await response.text();
  const data = responseText && JSON.parse(responseText);
  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      authenticationService.logout();
      // location.reload(true);
    }
    return await (data && data.message) || response.statusText;
  }
  return data;
}
