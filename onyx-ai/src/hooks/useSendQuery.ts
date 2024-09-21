// import { getGroqChatCompletion } from "@/services/groq/groq";
// import { useMessagesContext } from "@/store/context/Messages-context";
// import { useStreamMessageContext } from "@/store/context/StreamMessage-context";
// import { useUserInputContext } from "@/store/context/UserInput-context";
// import { FormEvent } from "react";

// export function useSendQuery() {
//     const { userInput } = useUserInputContext();
//     const { setStreamMessage, setStreaming, setLoading, setError } = useStreamMessageContext();
//     const { messages, setMessages } = useMessagesContext();

//     const handleSend = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//             setStreamMessage({
//                 content: "",
//                 role: "assistant",
//             });
//             setMessages((prev) => [
//                 ...prev,
//                 {
//                     content: userInput,
//                     role: "user",
//                 },
//             ]);
//             setLoading(true);
//             const stream = await getGroqChatCompletion({
//                 query: userInput,
//                 history: messages,
//                 model: "llama-3.1-8b-instant",
//             });
//             setStreaming(true);
//             let accumulated = "";
//             for await (const { choices } of stream) {
//                 if (choices[0]?.finish_reason === "stop") {
//                     setMessages((prev) => [
//                         ...prev,
//                         {
//                             content: accumulated || "something went wrong",
//                             role: "assistant",
//                         },
//                     ]);
//                     setStreaming(false);
//                     return;
//                 }
//                 accumulated = accumulated + choices[0]?.delta?.content || "";
//                 setStreamMessage({
//                     content: accumulated,
//                     role: choices[0]?.delta?.role as "user",
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             setError(error);
//         } finally {
//             setLoading(false);
//             setStreaming(false);
//         }
//     };
//     return { handleSend };
// }
