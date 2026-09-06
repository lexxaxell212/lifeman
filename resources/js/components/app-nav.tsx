import { useEffect, useState } from 'react';
import { NavBar } from '@/components/nav-bar';
import { NavDrawer } from '@/components/nav-drawer';
import { NotificationsSheet } from '@/components/notifications-sheet';
import { useNavDrawer } from '@/hooks/use-nav-drawer';

export function AppNav() {
    const { open, setOpen } = useNavDrawer();
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = notificationsOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [notificationsOpen]);

    return (
        <>
            <NavBar
                open={open}
                onToggle={() => setOpen(!open)}
                notificationsOpen={notificationsOpen}
                onNotificationsToggle={() =>
                    setNotificationsOpen(!notificationsOpen)
                }
            />
            <NavDrawer open={open} onOpenChange={setOpen} />
            <NotificationsSheet
                open={notificationsOpen}
                onOpenChange={setNotificationsOpen}
            />
        </>
    );
}
