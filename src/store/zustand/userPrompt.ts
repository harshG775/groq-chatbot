import { create, devtools } from ".";

export type UserPrompt = string;

interface UserPromptStoreState {
    userPrompt: UserPrompt;
    setUserPrompt: (value: UserPrompt | ((prev: UserPrompt) => UserPrompt)) => void;
}

export const useUserPromptStore = create<UserPromptStoreState>()(
    devtools((set) => ({
        userPrompt: "",
        setUserPrompt: (newState) => {
            return set((prevState) => ({
                userPrompt: typeof newState === "function" ? newState(prevState.userPrompt) : newState,
            }));
        },
    }))
);
