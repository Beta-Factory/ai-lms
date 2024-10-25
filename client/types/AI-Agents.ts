export interface AgentType {
  id: string;
  creatorId: string;
  context: string;
  description: string;
  agentName: string;
  agentPic: string;
  trainingFiles: File[];
}

export type ResponseHandler =
  | "content-type"
  | "json"
  | "text"
  | ((response: Response) => Promise<any>);

export interface AgentPost {
  agentName: string;
  context: string;
  description: string;
  trainingFiles: File[];
}
