export type GCPModelRequestParams = {
  apiEndpoint: string;
  projectId: string;
  endpointId: string;
  instances: {
    prompt: string;
    max_tokens: number;
    top_k: number;
    top_p: number;
    temperature: number;
    raw_response: boolean;
  }[];
};

export interface GCPRequestResponse {
  predictions: string[];
  deployedModelId: string;
  model: string;
  modelDisplayName: string;
  modelVersionId: string;
}

export type CreateSummaryParams = {
    text: string;
    audience: "twitter" | "linkedin" | "group_chat";
    purpose: "sell" | "inform";
    customInstructions?: string | undefined;
}

export interface Summary {
  id: number;
  text: string;
  audience: string;
  purpose: string;
  result: string;
  revisionNumber: number;
  parent?: number;
}
