// import { Button } from "@/components/ui/button";
// import Markdown from "@/components/ui/Markdown";
// import { ArrowUpNarrowWide, SquarePen } from "lucide-react";
// import { Fragment, useEffect, useState } from "react";

// const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1N2ZhZTYwLWY3MjctNGYyMC05MmM0LTUxOTk3MTI4MzM2OCIsIm5hbWUiOiJoYXJzaCIsImVtYWlsIjoiaGFyc2guMUBnbWFpbC5jb20iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzMzNzM3ODI4LCJleHAiOjE3MzM3NDE0Mjh9.R7X1YJx0NFpeXKmiBwuyM1F26r6CUkfLb0QF1MxoiSA";

// function SideBar({ setCurrentHistory, currentHistory }) {
//     const [histories, setHistories] = useState([]);
//     useEffect(() => {
//         const handleFetchHistories = async () => {
//             const response = await fetch("https://onyx-ai-server.vercel.app/api/v1/histories", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const data = await response.json();

//             setHistories(data?.data?.histories);
//         };
//         handleFetchHistories();
//     }, []);
//     const handleSetCurrentHistory = async (historyId) => {
//         const response = await fetch(`https://onyx-ai-server.vercel.app/api/v1/histories/${historyId}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         const data = await response.json();
//         setCurrentHistory(data?.data?.history);
//     };
//     const handleShowCreateNewChat = () => {
//         setCurrentHistory(null);
//     };
//     return (
//         <div className="flex-shrink-0 p-2 min-w-64">
//             <div>
//                 <div className="flex justify-between items-center mb-4">
//                     <p className="font-bold">Chat Histories</p>
//                     <Button
//                         className="h-8 w-8 p-0"
//                         size="icon"
//                         variant="ghost"
//                         title="Start a new chat"
//                         aria-label="Start a new chat"
//                         onClick={handleShowCreateNewChat}
//                     >
//                         <SquarePen className="h-4 w-4 text-foreground" />
//                     </Button>
//                 </div>
//             </div>
//             <ul>
//                 {histories?.map((history) => (
//                     <li key={history?.id} onClick={() => handleSetCurrentHistory(history?.id)}>
//                         <Button variant={currentHistory?.id === history?.id ? "default" : "ghost"}>
//                             {history?.title}
//                         </Button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
// function MainArea({ currentHistory }) {
//     return (
//         <main>
//             <ul className="flex flex-col gap-4 p-2">
//                 {currentHistory?.messages?.map((message) => (
//                     <Fragment key={message?.id}>
//                         {message?.role === "user" && (
//                             <li className="p-2 border rounded-lg self-end">
//                                 <div>user</div>
//                                 <div>{message?.content}</div>
//                             </li>
//                         )}
//                         {message?.role === "assistant" && (
//                             <li className="p-2 border rounded-lg ">
//                                 <div>assistant</div>
//                                 <Markdown>{message?.content}</Markdown>
//                             </li>
//                         )}
//                     </Fragment>
//                 ))}
//             </ul>
//         </main>
//     );
// }

// export default function TestPage() {
//     const [currentHistory, setCurrentHistory] = useState(null);
//     return (
//         <div className="flex ">
//             <SideBar setCurrentHistory={setCurrentHistory} currentHistory={currentHistory} />
//             <MainArea currentHistory={currentHistory} />
//             {!currentHistory && (
//                 <main className="grid place-content-center ">
//                     <form className="flex gap-2">
//                         <input type="text" placeholder="Type your message..." className="border p-2 rounded w-full" />
//                         <div>
//                             <Button>Send</Button>
//                         </div>
//                     </form>
//                 </main>
//             )}
//         </div>
//     );
// }
import useZustandStore from "@/store/zustand/useZustandStore";

export default function TestPage() {
    const { chatHistory_isLoading, chatHistory_error, chatHistory, fetchChatHistory } = useZustandStore(
        (state) => state
    );
    console.log(chatHistory);
    
    return (
        <div>
            {chatHistory_isLoading && <div>Loading...</div>}
            {chatHistory_error && <div>Error: {chatHistory_error}</div>}
            {chatHistory?.map((history) => (
                <div key={history?.id}>{history?.title}</div>
            ))}
            <button onClick={() => fetchChatHistory()}>Fetch</button>
        </div>
    );
}
