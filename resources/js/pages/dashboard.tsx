import { Head, Link } from '@inertiajs/react';
import { AlarmClock, PiggyBank, Target, Wallet } from 'lucide-react';
import { NettoBadge } from '@/components/netto-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatMoney } from '@/lib/format';
import { getT, useI18n } from '@/lib/i18n';
import { cn, toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { index as remindersIndex } from '@/routes/reminders';
import { index as savingsIndex } from '@/routes/savings-goals';
import type { Auth } from '@/types';

type Props = {
    auth: Auth;
    stats: {
        pendingReminders: number;
        overdueReminders: number;
        activeGoals: number;
        savedAmount: number;
        latestCashflow: {
            title: string;
            incomeTotal: number;
            expenseTotal: number;
        } | null;
    };
};

export default function Dashboard({ auth, stats }: Props) {
    const { t } = useI18n();
    const firstName = auth.user.name.split(' ')[0];
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const cashflowNetto = stats.latestCashflow
        ? stats.latestCashflow.incomeTotal - stats.latestCashflow.expenseTotal
        : 0;

    return (
        <>
            <Head title={t('pageDashboard')} />

            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {t('dashGreeting')}{' '}
                        <span className="text-brand-600 dark:text-brand-400">
                            {firstName}
                        </span>
                    </h1>
                    <p className="text-sm text-muted-foreground">{today}</p>
                </div>

                <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                    <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">
                                {t('dashSubtitle')}
                            </p>
                            <p className="mt-1 text-xl font-bold tracking-tight">
                                {t('dashTagline')}
                            </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <Button asChild variant="secondary">
                                <Link href={toUrl(remindersIndex())}>
                                    <AlarmClock className="size-4" />
                                    {t('dashReminders')}
                                </Link>
                            </Button>
                            <Button asChild variant="secondary">
                                <Link href={toUrl(savingsIndex())}>
                                    <PiggyBank className="size-4" />
                                    {t('dashSavings')}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
                    <Card
                        className={cn(
                            'h-full',
                            stats.overdueReminders > 0 &&
                                'border-destructive/40 bg-destructive/5',
                        )}
                    >
                        <CardHeader className="pb-2">
                            <div className="mb-2 flex items-center justify-between">
                                <div
                                    className={cn(
                                        'flex size-8 items-center justify-center rounded-xl',
                                        stats.overdueReminders > 0
                                            ? 'bg-destructive/10 text-destructive'
                                            : 'bg-primary/10 text-primary',
                                    )}
                                >
                                    <AlarmClock className="size-4" />
                                </div>
                                {stats.overdueReminders > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="font-medium"
                                    >
                                        {stats.overdueReminders}{' '}
                                        {t('dashOverdue')}
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {t('dashActiveReminders')}
                            </p>
                            <CardTitle className="text-2xl">
                                {stats.pendingReminders}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="h-full">
                        <CardHeader className="pb-2">
                            <div className="mb-2 flex size-8 items-center justify-center rounded-xl bg-muted text-foreground">
                                <Target className="size-4" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {t('dashActiveSavings')}
                            </p>
                            <CardTitle className="text-2xl">
                                {stats.activeGoals}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="h-full">
                        <CardHeader className="pb-2">
                            <div className="mb-2 flex size-8 items-center justify-center rounded-xl bg-muted text-foreground">
                                <Wallet className="size-4" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {t('dashTotalSaved')}
                            </p>
                            <CardTitle className="text-2xl">
                                {formatMoney(stats.savedAmount)}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="h-full">
                        <CardHeader className="pb-2">
                            <div className="mb-2 flex size-8 items-center justify-center rounded-xl bg-muted text-foreground">
                                <Wallet className="size-4" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {t('dashLastNetto')}
                            </p>
                            <CardTitle className="text-2xl">
                                {stats.latestCashflow
                                    ? formatMoney(cashflowNetto)
                                    : '—'}
                            </CardTitle>
                            {stats.latestCashflow ? (
                                <NettoBadge netto={cashflowNetto} />
                            ) : (
                                <CardDescription className="text-xs">
                                    {t('dashNoCashflow')}
                                </CardDescription>
                            )}
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </>
    );
}

const t = getT();

Dashboard.layout = {
    breadcrumbs: [
        {
            title: t('pageDashboard'),
            href: dashboard(),
        },
    ],
};
