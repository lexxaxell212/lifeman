import { Bell, Briefcase, Info, PiggyBank, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateTime } from '@/lib/format';
import { useI18n } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { AppNotification } from '@/types';

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

export function NotificationCard({ item }: { item: AppNotification }) {
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
