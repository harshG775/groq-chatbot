import { useState, useEffect, useRef } from "react";

export default function useTypewriter(
    text = "",
    speed = 50,
    stop = false,
) {
    const [displayText, setDisplayText] = useState("");
    const index = useRef(0);

    useEffect(() => {
        if (stop) return;

        const typingInterval = setInterval(() => {
            if (index.current < text.length) {
                setDisplayText((prevText) => {
                    return prevText + text.charAt(index.current);
                });
                index.current++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => {
            clearInterval(typingInterval);
        };
    }, [text, speed, stop]);

    return displayText;
}
