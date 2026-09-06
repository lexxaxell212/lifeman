import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, CalendarClock, PiggyBank, Plus } from 'lucide-react';
import { useState } from 'react';
import { FilterBar } from '@/components/filter-bar';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDate, formatMoney, formatPercent } from '@/lib/format';
import { useI18n } from '@/lib/i18n';
import { cn, toUrl } from '@/lib/utils';
import { show, store, index } from '@/routes/savings-goals';
import type { PaginatedData, SavingsGoal } from '@/types';

type Props = {
    goals: PaginatedData<SavingsGoal>;
    filters: {
        search: string;
        status: string;
        sort: string;
        dir: string;
    };
};

type GoalForm = {
    title: string;
    target_amount: string;
    start_date: string;
    end_date: string;
    notes: string;
};

export default function SavingsIndex({ goals, filters }: Props) {
    const [open, setOpen] = useState(false);
    const { t } = useI18n();

    return (
        <>
            <Head title={t('pageSavingsIndex')} />

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {t('savingsLetSave')}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {t('savingsSubtitle')}
                        </p>
                    </div>
                    <Button onClick={() => setOpen(true)}>
                        <Plus className="size-4" />
                        {t('savingsNewTarget')}
                    </Button>
                </div>

                <FilterBar
                    url={toUrl(index())}
                    search={filters.search}
                    status={filters.status}
                    sort={filters.sort}
                    statusOptions={[
                        { value: 'active', label: t('savingsStatusRunning') },
                        {
                            value: 'completed',
                            label: t('savingsStatusAchieved'),
                        },
                    ]}
                    sortOptions={[
                        { value: 'created_at', label: t('savingsColCreated') },
                        {
                            value: 'target_amount',
                            label: t('savingsColTarget'),
                        },
                        { value: 'end_date', label: t('savingsColDeadline') },
                        { value: 'title', label: t('savingsColTitle') },
                    ]}
                />

                <div className="grid gap-3 sm:grid-cols-2">
                    <>
                        {goals.data.length === 0 && (
                            <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
                                {t('savingsEmpty')}
                            </p>
                        )}

                        {goals.data.map((goal) => (
                            <GoalCard key={goal.id} goal={goal} />
                        ))}
                    </>
                </div>

                <Pagination links={goals.links} />
            </div>

            <GoalFormDialog open={open} onOpenChange={setOpen} />
        </>
    );
}

function GoalCard({ goal }: { goal: SavingsGoal }) {
    const { t } = useI18n();
    const paid = Number(goal.paid_amount ?? 0);
    const target = Number(goal.target_amount);
    const percent = target > 0 ? (paid / target) * 100 : 0;
    const reached = paid >= target;
    const remaining = Math.max(target - paid, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = goal.end_date ? new Date(`${goal.end_date}T00:00:00`) : null;
    const missed = !reached && end !== null && end.getTime() < today.getTime();
    const daysLeft = end
        ? Math.max(Math.ceil((end.getTime() - today.getTime()) / 86_400_000), 0)
        : 0;
    const perDay =
        !reached && !missed && end !== null && daysLeft > 0
            ? Math.ceil(remaining / daysLeft)
            : 0;

    return (
        <Link
            href={toUrl(show({ savings_goal: goal.id }))}
            prefetch
            className="group"
        >
            <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/50">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <PiggyBank className="size-4 text-primary" />
                            {goal.title}
                            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                        </CardTitle>
                        <Badge
                            variant={reached ? 'default' : 'secondary'}
                            className={cn(
                                missed &&
                                    'bg-destructive text-destructive-foreground',
                            )}
                        >
                            {reached
                                ? t('savingsStatusAchieved')
                                : missed
                                  ? t('savingsStatusOverdue')
                                  : t('savingsStatusRunning')}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <div className="flex items-baseline justify-between text-sm">
                        <span className="font-semibold">
                            {formatMoney(paid)}
                        </span>
                        <span className="text-muted-foreground">
                            dari {formatMoney(target)}
                        </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                            className={cn(
                                'h-full rounded-full transition-all duration-700',
                                reached
                                    ? 'bg-emerald-500'
                                    : missed
                                      ? 'bg-destructive'
                                      : 'bg-primary',
                            )}
                            style={{ width: `${Math.min(percent, 100)}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatPercent(percent)} terkumpul</span>
                        <span>
                            {goal.start_date && formatDate(goal.start_date)}
                            {goal.end_date
                                ? ` – ${formatDate(goal.end_date)}`
                                : ''}
                        </span>
                    </div>

                    {!reached && perDay > 0 && (
                        <div className="flex items-center gap-1.5 rounded-lg bg-primary/5 px-2.5 py-1.5 text-[11px] text-muted-foreground">
                            <CalendarClock className="size-3.5 shrink-0 text-primary" />
                            <span>
                                {t('savingsCollect')}{' '}
                                <span className="font-semibold text-foreground">
                                    ±{formatMoney(perDay)}
                                </span>
                                {t('savingsPerDay')} ·{' '}
                                <span className="font-semibold text-foreground">
                                    ±{formatMoney(perDay * 7)}
                                </span>
                                {t('savingsPerWeek')} ·{' '}
                                <span className="font-semibold text-foreground">
                                    ±{formatMoney(perDay * 30)}
                                </span>
                                {t('savingsPerMonth')}
                            </span>
                        </div>
                    )}

                    {!reached && missed && (
                        <p className="text-xs font-medium text-destructive">
                            {t('savingsOverdueMsg')} {formatMoney(remaining)}
                        </p>
                    )}

                    {!reached && !missed && perDay === 0 && (
                        <p className="text-xs text-muted-foreground">
                            {t('savingsRemainingMsg')} {formatMoney(remaining)}
                        </p>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}

function GoalFormDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { data, setData, errors, processing, post, reset } =
        useForm<GoalForm>({
            title: '',
            target_amount: '',
            start_date: new Date().toISOString().slice(0, 10),
            end_date: '',
            notes: '',
        });
    const { t } = useI18n();

    function submit(): void {
        post(toUrl(store()), {
            onSuccess: () => {
                onOpenChange(false);
                reset();
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{t('savingsNewTitle')}</DialogTitle>
                    <DialogDescription>
                        {t('savingsNewTitleHelp')}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="goal-title">
                            {t('savingsTitlePlaceholder')}
                        </Label>
                        <Input
                            id="goal-title"
                            value={data.title}
                            onChange={(event) =>
                                setData('title', event.target.value)
                            }
                            placeholder={t('savingsTitleExample')}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="goal-target">
                            {t('savingsNominalLabel')}
                        </Label>
                        <Input
                            id="goal-target"
                            type="number"
                            min="1"
                            inputMode="numeric"
                            value={data.target_amount}
                            onChange={(event) =>
                                setData('target_amount', event.target.value)
                            }
                            placeholder="5000000"
                        />
                        {errors.target_amount && (
                            <p className="text-sm text-destructive">
                                {errors.target_amount}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                            <Label htmlFor="goal-start">
                                {t('savingsStartDate')}
                            </Label>
                            <Input
                                id="goal-start"
                                type="date"
                                value={data.start_date}
                                onChange={(event) =>
                                    setData('start_date', event.target.value)
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="goal-end">
                                {t('savingsEndDate')}
                            </Label>
                            <Input
                                id="goal-end"
                                type="date"
                                value={data.end_date}
                                onChange={(event) =>
                                    setData('end_date', event.target.value)
                                }
                            />
                            {errors.end_date && (
                                <p className="text-sm text-destructive">
                                    {errors.end_date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="goal-notes">{t('note')}</Label>
                        <Input
                            id="goal-notes"
                            value={data.notes}
                            onChange={(event) =>
                                setData('notes', event.target.value)
                            }
                            placeholder={t('noteDetail')}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            onOpenChange(false);
                            reset();
                        }}
                    >
                        {t('cancel')}
                    </Button>
                    <Button onClick={submit} disabled={processing}>
                        {t('savingsCreateButton')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
