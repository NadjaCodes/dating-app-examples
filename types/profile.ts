export type Prompt = {
  question: string;
  answer: string;
};

export type Profile = {
  name: string;
  liked: boolean | null;
  picture: string;
  prompts: Prompt[];
  message?: string;
};
