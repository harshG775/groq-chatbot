import { useState, useEffect, useRef } from "react";

export default function useTypewriter(
    text = "",
    speed = 50,
    stop = false,
    setStop: any
) {
    const [displayText, setDisplayText] = useState("");
    const index = useRef(0);

    useEffect(() => {
        if (stop) return;

        const typingInterval = setInterval(() => {
            if (index.current < text.length) {
                setDisplayText(
                    (prevText) => prevText + text.charAt(index.current)
                );
                index.current++;
            } else {
                console.log("stoped here")
                clearInterval(typingInterval);
            }
        }, speed);

        return () => {
            clearInterval(typingInterval);
        };
    }, [text, speed, stop]);

    return displayText;
}
