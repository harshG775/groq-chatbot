import { useState, useEffect } from "react";

/**
 * Custom hook for detecting media query matches
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
const useMediaQuery = (query: string): boolean => {
    // Initialize with null check for SSR
    const [matches, setMatches] = useState<boolean>(() => {
        // Check if window is defined for SSR
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        // Check if window is defined for SSR
        if (typeof window === "undefined") return undefined;

        const mediaQuery: MediaQueryList = window.matchMedia(query);

        // Set initial value
        setMatches(mediaQuery.matches);

        // Create event listener function
        const handleChange = (event: MediaQueryListEvent): void => {
            setMatches(event.matches);
        };

        // Add listener
        mediaQuery.addEventListener("change", handleChange);

        // Cleanup function
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [query]); // Re-run effect if query changes

    return matches;
};

// Common media query helpers
export const mediaQueries = {
    mobile: "(max-width: 768px)",
    tablet: "(min-width: 769px) and (max-width: 1024px)",
    desktop: "(min-width: 1025px)",
    darkMode: "(prefers-color-scheme: dark)",
    lightMode: "(prefers-color-scheme: light)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
    retina: "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
} as const;

// Type for the media queries object
export type MediaQueries = typeof mediaQueries;
export type MediaQueryKey = keyof MediaQueries;

export default useMediaQuery;
