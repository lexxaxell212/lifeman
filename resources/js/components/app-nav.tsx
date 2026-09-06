import { NavBar } from '@/components/nav-bar';
import { NavDrawer } from '@/components/nav-drawer';
import { useNavDrawer } from '@/hooks/use-nav-drawer';

export function AppNav() {
    const { open, setOpen } = useNavDrawer();

    return (
        <>
            <NavBar open={open} onToggle={() => setOpen(!open)} />
            <NavDrawer open={open} onOpenChange={setOpen} />
        </>
    );
}
