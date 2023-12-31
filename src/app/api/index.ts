import { Preferences } from "@capacitor/preferences";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//const API_URL = "https://backend-dev-v2-anon.tokensmarties.com/api/v1";

export class ApiException {
  name: string;
  message: string;
  response: any;

  constructor(message: string, response: any) {
    this.name = "ApiException";
    this.message = message;
    this.response = response;
  }
}


type ApiRequest = {
  type?: string;
  endpoint: string;
  auth?: boolean;
  body?: any;
  demo?: boolean;
};

export class Api {
  async request(params: ApiRequest): Promise<any> {
    // Fetch it from storage, if route requires auth, if no token present, fail

    const headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "application/json");

    if (params.auth) {
      const token = await Preferences.get({ key: "token" });
      headers.append("Authorization", `Bearer ${token.value}`);
    }

    //console.log(JSON.stringify(params.body))

    return fetch(`${API_URL}/${params.endpoint}`, {
      method: params.type || "GET",
      body: params.body ? JSON.stringify(params.body) : null,
      mode: "cors",
      redirect: "follow",
      headers,
    }).then(async (response: any) => {
     // console.log(response)
      if (response.status === 422) {
        console.log("Wrong login token")
        //await Preferences.remove({ key: "token" });
        //await Preferences.clear();
      }

      if (response.status === 401) {
        await Preferences.remove({ key: "token" });
        //Remove active character
        await Preferences.remove({ key: "activeCharacterId" });
        await Preferences.remove({ key: "activeCharacterName" });
        await Preferences.remove({ key: "activeCharacterNickname" });
        await Preferences.remove({ key: "activeCharacterImage" });
        await Preferences.remove({ key: "activeCharacterDescription" });
        await Preferences.remove({ key: "activeCharacterIsUsed" });

        await Preferences.clear();
        //window.location.replace("/");
        // TODO: Is this ok to do?
        // window.location.reload();
      }

      if (!response.status.toString().startsWith("2")) {
        throw new ApiException("error", await response.json());
      }

      if (response.status === 204) {
        return;
      }

      return response.text().then((text: string) => {
        return text ? JSON.parse(text) : {};
      });
    });
  }
}
