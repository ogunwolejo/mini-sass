"use client";

import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);
        const listener = (event: MediaQueryListEvent) => setMatches(event.matches); // Event listener callback
        media.addEventListener('change', listener);
        return () => {
            media.removeEventListener('change', listener);
        };
    }, [query]);
    return matches;
};
