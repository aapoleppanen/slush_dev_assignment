import { CreateSummaryParams } from "../types";
import { instanceBaseParams, sendRequest } from "../util/gcpModel";

const getPrompt = (params: CreateSummaryParams): string => {
  const { text, purpose, audience, customInstructions } = params;

  let prompt = ''

  prompt += `Your task is to write a ready-to-use social media post. Ensure it fits the specific style and purpose required:\n`;

  prompt += `Purpose: ${purpose === 'sell' ? 'Create a persuasive and engaging post to highlight key selling points.' : 'Provide an informative post clearly explaining the main points.'}\n`;

  switch (audience) {
    case "twitter":
      prompt += "Write a tweet that grabs attention, uses humor appropriately, and is concise. Directly suitable for posting on Twitter.\n";
      break;
    case "linkedin":
      prompt += "Write a professional LinkedIn update showcasing achievement. Should be dignified and directly ready to post on LinkedIn.\n";
      break;
    case "group_chat":
      prompt += "Write a casual, friendly group chat message. Should be directly ready to send without further modifications.\n";
      break;
  }

  if (customInstructions) prompt += `Additional Instructions: ${customInstructions}\n`;

  prompt += "The content of the post should be a summary of the text provided.";

  prompt += `\n\nText: ${text}`;

  return prompt;
};

export const getSummary = async (params: CreateSummaryParams) => {
  const prompt = getPrompt(params);

  const response = await sendRequest([{ ...instanceBaseParams, prompt }]);

  return { result: response.output };
}
