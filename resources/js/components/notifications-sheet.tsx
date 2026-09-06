import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NotificationCard } from '@/components/notifications/notification-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { httpJson } from '@/lib/http';
import { useI18n } from '@/lib/i18n';
import type { AppNotification } from '@/types';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function NotificationsSheet({ open, onOpenChange }: Props) {
    const { t } = useI18n();
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    useEffect(() => {
        if (!open || notifications.length > 0) {
            return;
        }

        let cancelled = false;

        httpJson<AppNotification[]>('/notifications/data')
            .then((data) => {
                if (!cancelled) {
                    setNotifications(data);
                }
            })
            .catch(() => {
                // ignore fetch errors; the empty state is shown instead
            });

        return () => {
            cancelled = true;
        };
    }, [open, notifications.length]);

    const unread = notifications.filter((item) => !item.read).length;

    return (
        <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
            <SheetContent
                side="right"
                hideClose
                onOverlayClick={() => onOpenChange(false)}
                className="z-[60] w-[80%] max-w-xs gap-0 p-0 sm:max-w-sm"
            >
                <SheetHeader className="flex-row items-center justify-between gap-3 px-4 py-4">
                    <div>
                        <SheetTitle>{t('pageNotifications')}</SheetTitle>
                        <p className="text-sm text-muted-foreground">
                            {t('notificationsPageDescription')}
                        </p>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl text-foreground"
                            aria-label={t('close')}
                            onClick={() => onOpenChange(false)}
                        >
                            <X className="size-5" />
                        </Button>
                        {unread > 0 && (
                            <Badge className="bg-primary/15 text-primary">
                                {unread} {t('notifUnread')}
                            </Badge>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <p className="py-10 text-center text-sm text-muted-foreground">
                            {t('notifEmptyTitle')}
                            <br />
                            {t('notifEmptyBody')}
                        </p>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {notifications.map((item) => (
                                <NotificationCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
