import { Head, Link } from '@inertiajs/react';
import { AlarmClock, ArrowRight, Bell, PiggyBank, Wallet } from 'lucide-react';
import { PageBanner } from '@/components/page-banner';
import { PagePanel } from '@/components/page-panel';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/format';
import { getT, useI18n } from '@/lib/i18n';
import { cn, toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { index as cashflowsIndex } from '@/routes/cashflows';
import { index as personalIndexRoute } from '@/routes/personal';
import { index as remindersIndex } from '@/routes/reminders';
import { index as savingsIndex } from '@/routes/savings-goals';

type Props = {
    stats: {
        saved: number;
        netto: number;
        pendingReminders: number;
    };
};

export default function PersonalIndex({ stats }: Props) {
    const { t } = useI18n();
    const items = [
        {
            title: t('personalCashTitle'),
            description: t('personalCashDesc'),
            icon: Wallet,
            href: cashflowsIndex(),
            accent: 'bg-primary/10 text-primary',
        },
        {
            title: t('personalSavingsTitle'),
            description: t('personalSavingsDesc'),
            icon: PiggyBank,
            href: savingsIndex(),
            accent: 'bg-muted text-foreground',
        },
        {
            title: t('personalRemindersTitle'),
            description: t('personalRemindersDesc'),
            icon: AlarmClock,
            href: remindersIndex(),
            accent: 'bg-muted text-foreground',
        },
    ];

    return (
        <>
            <Head title={t('pagePersonal')} />

            <div className="flex min-h-screen flex-col gap-4">
                <PageBanner
                    stats={[
                        {
                            key: 'saved',
                            label: t('bannerSaved'),
                            value: formatMoney(stats.saved),
                            icon: PiggyBank,
                        },
                        {
                            key: 'netto',
                            label: t('bannerNetto'),
                            value: formatMoney(stats.netto),
                            icon: Wallet,
                        },
                        {
                            key: 'pendingReminders',
                            label: t('bannerPending'),
                            value: stats.pendingReminders,
                            icon: Bell,
                        },
                    ]}
                />

                <PagePanel>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {t('pagePersonal')}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {t('personalSubtitle')}
                        </p>
                    </div>
                </PagePanel>

                <PagePanel className="flex-1">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <Link
                                key={item.title}
                                href={toUrl(item.href)}
                                prefetch
                                cacheFor="60s"
                                className="group"
                            >
                                <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/50">
                                    <CardHeader className="gap-3">
                                        <div
                                            className={cn(
                                                'flex size-10 items-center justify-center rounded-xl',
                                                item.accent,
                                            )}
                                        >
                                            <item.icon className="size-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="flex items-center gap-2 text-base">
                                                {item.title}
                                                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                            </CardTitle>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <Link
                        href={toUrl(dashboard())}
                        className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                    >
                        {t('personalBackToHome')}
                    </Link>
                </PagePanel>
            </div>
        </>
    );
}

const personalBreadcrumb = getT();

PersonalIndex.layout = {
    breadcrumbs: [
        {
            title: personalBreadcrumb('pagePersonal'),
            href: toUrl(personalIndexRoute()),
        },
    ],
};
