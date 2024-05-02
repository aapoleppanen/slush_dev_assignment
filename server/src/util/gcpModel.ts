import { GoogleAuth } from "google-auth-library";
import { GCPModelRequestParams, GCPRequestResponse } from "../types";
import { env } from "./env";

const gcpParams: Pick<
  GCPModelRequestParams,
  "apiEndpoint" | "projectId" | "endpointId"
> = {
  apiEndpoint: env.API_ENDPOINT ?? "",
  projectId: env.PROJECT_ID ?? "",
  endpointId: env.ENDPOINT_ID ?? "",
};

export const instanceBaseParams: Omit<
  GCPModelRequestParams["instances"][number],
  "prompt"
> = {
  max_tokens: 128,
  top_k: 10,
  top_p: 1,
  temperature: 0.8,
  raw_response: true,
};

export const sendRequest = async (instances: GCPModelRequestParams["instances"]) => {
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = await auth.getClient();
  const accessToken = (await client.getAccessToken()).token;
  const data = { instances };

  const url = `https://${gcpParams.apiEndpoint}/v1/projects/${gcpParams.projectId}/locations/europe-west1/endpoints/${gcpParams.endpointId}:predict`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });


  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const parsedResponse: GCPRequestResponse = await response.json();

  console.log(data);
  console.log(parsedResponse);

  const output: string = parsedResponse.predictions[0]

  return { ...parsedResponse, output };
};
