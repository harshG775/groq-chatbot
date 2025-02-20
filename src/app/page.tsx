"use client"
import Link from "next/link";
import InputBar from "./conversations/[conversation_id]/_components/InputBar";

export default function RootPage() {
    return (
        <div>
            <Link href={"/conversations/reactjs"}>/conversations/reactjs</Link>
            <InputBar />
        </div>
    );
}
