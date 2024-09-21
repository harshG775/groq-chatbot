// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// import { groq } from "@/services/groq.ai";
// import { useStreamMessageContext } from "@/store/context/StreamMessage-context";
// import { useState } from "react";

// export function useSendQuery() {
//     const {
//         streamMessage,
//         setStreamMessage,

//         loading,
//         setLoading,

//         canceled,
//         setCanceled,

//         error,
//         setError,
//     } = useStreamMessageContext();

//     const handleSendQuery = async ({ content }: { content: string }) => {
//         try {
//             const stream = await groq.chat.completions.create({
//                 messages: [
//                     {
//                         role: "system",
//                         content: "",
//                     },
//                     ...[],
//                     {
//                         role: "user",
//                         content: content,
//                     },
//                 ],
//                 model: "llama3-8b-8192",
//                 temperature: 0.5,
//                 max_tokens: 1024,
//                 stop: null,
//                 stream: true,
//             });
//             for await (const chunk of stream) {
//                 setStreamMessage((prev) => {
//                     return {
//                         content: chunk.choices[0]?.delta?.content || "",
//                         role: chunk.choices[0]?.delta?.role || "assistant",
//                     };
//                 });
//             }
//         } catch (error) {}
//     };
//     const handleCancelQuery = async () => {};
//     return {
//         handleSendQuery,
//         handleCancelQuery,
//     };
// }
