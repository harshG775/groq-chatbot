"use client";
import { Button } from "@/components/ui/button";
import { codeGenerator } from "@/services/groq/codeGenerator";
import { queryClassifier } from "@/services/groq/queryClassifier";
import { useState } from "react";

export default function HomePage() {
    const [classification, setClassification] = useState("");
    const [userPrompt, setUserPrompt] = useState("");
    const handleFetch = async () => {
        if (!userPrompt) {
            return;
        }
        setClassification("");
        const response = await queryClassifier(userPrompt);
        if (response?.classification) {
            setClassification(response.classification);
            console.log(response.classification);
        }
    };
    return (
        <div>
            <h1></h1>
            <Button onClick={()=>codeGenerator("reactjs counter")}>codeGenerator</Button>
            {/* <Button onClick={handleFetch}>queryClassifier(reactjs counter)</Button> */}
            <textarea
                placeholder="enter your query"
                className="query-input"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
            ></textarea>
            <div>
                classification:
                <div className="inline-block font-bold">{classification}</div>
            </div>
        </div>
    );
}
