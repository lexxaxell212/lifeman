import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'lifeman.nav_drawer_open';

/**
 * Shared state for the navigation drawer (sidebar).
 * Persists across Inertia page loads so the sidebar stays open while
 * the user browses, and survives hard reloads via localStorage.
 */
export function useNavDrawer() {
    const [open, setOpen] = useState<boolean>(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        try {
            return window.localStorage.getItem(STORAGE_KEY) === 'true';
        } catch {
            // localStorage unavailable (private mode / SSR) - stay closed
            return false;
        }
    });

    const setDrawerOpen = useCallback((next: boolean) => {
        setOpen(next);

        try {
            window.localStorage.setItem(STORAGE_KEY, String(next));
        } catch {
            // ignore storage failures
        }
    }, []);

    const closeDrawer = useCallback(
        () => setDrawerOpen(false),
        [setDrawerOpen],
    );

    // Lock body scroll while the drawer is open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return {
        open,
        setOpen: setDrawerOpen,
        close: closeDrawer,
    };
}
