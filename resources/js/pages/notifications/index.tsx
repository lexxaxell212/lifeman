import { Head } from '@inertiajs/react';
import {
    Bell,
    BellOff,
    Briefcase,
    Info,
    PiggyBank,
    Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageBanner } from '@/components/page-banner';
import { PagePanel } from '@/components/page-panel';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateTime } from '@/lib/format';
import { getT, useI18n } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { index } from '@/routes/notifications';
import type { AppNotification } from '@/types';

type Props = {
    notifications: AppNotification[];
};

const TYPE_ICONS: Record<
    AppNotification['type'],
    { icon: LucideIcon; label: TranslationKey }
> = {
    reminder_due: { icon: Bell, label: 'notifTypeReminder' },
    savings_achieved: { icon: PiggyBank, label: 'notifTypeSavings' },
    cashflow: { icon: Wallet, label: 'notifTypeCashflow' },
    business: { icon: Briefcase, label: 'notifTypeBusiness' },
    info: { icon: Info, label: 'notifTypeInfo' },
};

export default function NotificationsIndex({ notifications }: Props) {
    const { t } = useI18n();
    const unread = notifications.filter((item) => !item.read).length;

    return (
        <>
            <Head title={t('pageNotifications')} />

            <div className="flex min-h-screen flex-col gap-4">
                <PageBanner
                    stats={[
                        {
                            key: 'unread',
                            label: t('bannerUnread'),
                            value: unread,
                            icon: Bell,
                        },
                        {
                            key: 'total',
                            label: t('bannerTotal'),
                            value: notifications.length,
                            icon: BellOff,
                        },
                    ]}
                />

                <PagePanel>
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                {t('pageNotifications')}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {t('notificationsPageDescription')}
                            </p>
                        </div>
                        {unread > 0 && (
                            <Badge className="bg-primary/15 text-primary">
                                {unread} {t('notifUnread')}
                            </Badge>
                        )}
                    </div>
                </PagePanel>

                <PagePanel className="flex-1">
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
                </PagePanel>
            </div>
        </>
    );
}

function NotificationCard({ item }: { item: AppNotification }) {
    const { t } = useI18n();
    const meta = TYPE_ICONS[item.type] ?? TYPE_ICONS.info;
    const Icon = meta.icon;

    return (
        <Card
            className={cn(
                'border-border/60',
                !item.read && 'border-primary/40 bg-primary/5',
            )}
        >
            <CardContent className="flex items-start gap-3 p-3.5">
                <span
                    className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-xl',
                        item.read
                            ? 'bg-muted text-muted-foreground'
                            : 'bg-primary/15 text-primary',
                    )}
                >
                    <Icon className="size-4" />
                </span>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p
                            className={cn(
                                'min-w-0 flex-1 truncate font-semibold',
                                item.read &&
                                    'font-medium text-muted-foreground',
                            )}
                        >
                            {item.title}
                        </p>
                        {!item.read && (
                            <span className="size-2 shrink-0 rounded-full bg-primary" />
                        )}
                    </div>
                    {item.body && (
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {item.body}
                        </p>
                    )}
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="rounded-full bg-muted px-1.5 py-0.5">
                            {t(meta.label)}
                        </span>
                        {formatDateTime(item.created_at)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

const notificationsBreadcrumb = getT();

NotificationsIndex.layout = {
    breadcrumbs: [
        {
            title: notificationsBreadcrumb('pageNotifications'),
            href: index(),
        },
    ],
};
