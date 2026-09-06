import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, Briefcase, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/format';
import { getT, useI18n } from '@/lib/i18n';
import { toUrl } from '@/lib/utils';
import { create, destroy, index, show } from '@/routes/businesses';
import type { Business } from '@/types';

type Props = {
    businesses: Business[];
};

export default function BusinessesIndex({ businesses }: Props) {
    const { t } = useI18n();
    const [pending, setPending] = useState<Business | null>(null);
    const [deleting, setDeleting] = useState(false);

    const periodLabels: Record<Business['rekap_period'], string> = {
        weekly: t('businessPeriodWeek'),
        monthly: t('businessPeriodMonth'),
        yearly: t('businessPeriodYear'),
    };

    function confirmDelete(): void {
        if (!pending) {
            return;
        }

        router.delete(toUrl(destroy({ business: pending.id })), {
            only: ['businesses'],
            preserveScroll: true,
            onStart: () => setDeleting(true),
            onFinish: () => {
                setDeleting(false);
                setPending(null);
            },
        });
    }

    return (
        <>
            <Head title={t('pageBusinessIndex')} />

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {t('businessManagement')}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {t('businessSubtitle')}
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={toUrl(create())}>
                            <Plus className="size-4" />
                            {t('businessNewButton')}
                        </Link>
                    </Button>
                </div>

                {businesses.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-12 text-center">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
                            <Briefcase className="size-6" />
                        </div>
                        <div>
                            <p className="font-semibold">
                                {t('businessEmpty')}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {t('businessEmptyHelp')}
                            </p>
                        </div>
                        <Button asChild>
                            <Link href={toUrl(create())}>
                                <Plus className="size-4" />
                                {t('businessCreateButton')}
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                        {businesses.map((business) => (
                            <Card key={business.id} className="group">
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <Link
                                            href={toUrl(
                                                show({ business: business.id }),
                                            )}
                                            prefetch
                                            className="flex min-w-0 items-center gap-2"
                                        >
                                            <CardTitle className="flex items-center gap-2 text-base">
                                                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <Briefcase className="size-4" />
                                                </span>
                                                <span className="truncate">
                                                    {business.name}
                                                </span>
                                                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                            </CardTitle>
                                        </Link>
                                        <div className="flex shrink-0 items-center gap-1">
                                            <Badge variant="secondary">
                                                {
                                                    periodLabels[
                                                        business.rekap_period
                                                    ]
                                                }
                                            </Badge>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    setPending(business)
                                                }
                                                className="size-8"
                                            >
                                                <Trash2 className="size-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>
                                        {t('businessStart')}{' '}
                                        {formatDate(business.period_start)}
                                    </span>
                                    <span>
                                        {business.transactions_count ?? 0}{' '}
                                        {t('businessRecords')}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={pending !== null}
                onOpenChange={(open) => !open && setPending(null)}
                title={t('businessDelete')}
                description={
                    pending
                        ? `${t('businessDeleteConfirm')} "${pending.name}"`
                        : undefined
                }
                processing={deleting}
                onConfirm={confirmDelete}
            />
        </>
    );
}

const businessIndexBreadcrumb = getT();

BusinessesIndex.layout = {
    breadcrumbs: [
        {
            title: businessIndexBreadcrumb('pageBusinessIndex'),
            href: toUrl(index()),
        },
    ],
};
