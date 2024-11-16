import { useCallback, useRef } from "react";

const useScrollToBottom = () => {
    const scrollRef = useRef(null);
    // Function to scroll to the bottom
    const scrollToBottom = useCallback((options = { behavior: "smooth" }) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                ...options,
            });
        }
    }, []);

    return { scrollRef, scrollToBottom };
};

export default useScrollToBottom;
