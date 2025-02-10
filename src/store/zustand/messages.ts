import { ChatCompletionRole } from "groq-sdk/resources/chat/completions.mjs";
import { create, devtools } from ".";

type messages = {
    id: string;
    role: ChatCompletionRole;
    content: string;
    attachments: null;
}[];

interface MessagesStoreState {
    messages: messages;
    setMessages: (newMessages: messages) => void;
}

export const useMessagesStore = create<MessagesStoreState>()(
    devtools((set) => ({
        messages: [
            {
                id: "22839609-255e-48e5-9031-11d914b1ba5a",
                role: "user",
                content: "hello",
                attachments: null,
            },
            {
                id: "78e53ae7-2fff-4a2c-adc2-f0f13fb02ee0",
                role: "assistant",
                content: "Hello how can I help you",
                attachments: null,
            },
            {
                id: "5a2c4b47-cc12-4821-bf09-7bdfc3d73a15",
                role: "user",
                content: "Can you tell me the weather today?",
                attachments: null,
            },
            {
                id: "d3f6a0c8-3b27-4b3a-9db4-2f3e67d0914e",
                role: "assistant",
                content: "Sure! Could you please tell me your location?",
                attachments: null,
            },
            {
                id: "b457f29b-6807-4d09-a3b6-df26a8b4cb76",
                role: "user",
                content: "I'm in New York",
                attachments: null,
            },
            {
                id: "f65062f2-965e-481f-bc8e-bd6fcb3c97a8",
                role: "assistant",
                content: "The weather in New York is currently 22°C with clear skies.",
                attachments: null,
            },
            {
                id: "01d3b7ef-51f7-49eb-b9e7-4b1165d5f496",
                role: "user",
                content: "Thanks! Also, can you recommend a good book?",
                attachments: null,
            },
            {
                id: "caf254b2-d4b8-4735-b8e2-9134ea79f2cb",
                role: "assistant",
                content: "Sure! I recommend 'Atomic Habits' by James Clear. It's great for personal growth.",
                attachments: null,
            },
            {
                id: "287a62d5-8153-4a3b-9d09-26d9b983c726",
                role: "user",
                content: "Sounds interesting! What is it about?",
                attachments: null,
            },
            {
                id: "d041e3b5-9159-4f35-9979-18f09d2fb63e",
                role: "assistant",
                content:
                    "'Atomic Habits' is about how small daily improvements can lead to significant personal and professional growth over time.",
                attachments: null,
            },
            {
                id: "b639c026-53b6-4ecf-bdc1-1d5e90495c21",
                role: "user",
                content: "That sounds useful. Do you have any productivity tips?",
                attachments: null,
            },
            {
                id: "95f61be0-7e9a-4b42-8b64-94d521be74bb",
                role: "assistant",
                content:
                    "Definitely! Try the Pomodoro technique—work for 25 minutes, then take a 5-minute break. It helps maintain focus and productivity.",
                attachments: null,
            },
        ],
        setMessages: (newMessages) => set({ messages: newMessages }),
    }))
);
