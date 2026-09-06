import { Link } from '@inertiajs/react';
import { Bell, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { toUrl } from '@/lib/utils';
import { index as notificationsIndex } from '@/routes/notifications';

type Props = {
    open: boolean;
    onToggle: () => void;
};

export function NavBar({ open, onToggle }: Props) {
    const { t } = useI18n();

    return (
        <nav className="fixed inset-x-0 bottom-0 z-[70] border-t border-border/60 bg-background/90 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-3 px-3 md:px-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-xl text-foreground"
                    aria-label={t('openMenu')}
                    aria-expanded={open}
                    onClick={onToggle}
                >
                    <span className="relative flex size-6 items-center justify-center">
                        <Menu
                            className="absolute inset-0 size-6 transition-all duration-200 ease-out"
                            style={{
                                transform: open
                                    ? 'rotate(90deg) scale(0)'
                                    : 'rotate(0) scale(1)',
                                opacity: open ? 0 : 1,
                            }}
                        />
                        <X
                            className="absolute inset-0 size-6 transition-all duration-200 ease-out"
                            style={{
                                transform: open
                                    ? 'rotate(0) scale(1)'
                                    : 'rotate(-90deg) scale(0)',
                                opacity: open ? 1 : 0,
                            }}
                        />
                    </span>
                </Button>

                <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="ml-auto rounded-xl text-foreground"
                    aria-label={t('pageNotifications')}
                >
                    <Link href={toUrl(notificationsIndex())}>
                        <span className="relative flex size-6 items-center justify-center">
                            <Bell className="size-5" />
                            <span className="absolute top-0 right-0 size-2 rounded-full bg-destructive" />
                        </span>
                    </Link>
                </Button>
            </div>
        </nav>
    );
}
