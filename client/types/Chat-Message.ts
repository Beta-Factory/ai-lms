interface Message {
  role: "ai" | "user";
  message: string;
  isLoading: boolean;
}
