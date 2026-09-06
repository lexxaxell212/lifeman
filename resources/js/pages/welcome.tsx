import { Head, Link, usePage } from '@inertiajs/react';
import { AlarmClock, ArrowRight, PiggyBank, Sparkles } from 'lucide-react';
import type { ComponentType } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import { toUrl } from '@/lib/utils';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import { index as remindersIndex } from '@/routes/reminders';
import { index as savingsIndex } from '@/routes/savings-goals';

type Feature = {
    title: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    href: string;
};

export default function Welcome() {
    const { t } = useI18n();
    const { auth } = usePage().props;

    const features: Feature[] = [
        {
            title: t('welcomeAppName'),
            description: t('welcomeTagline1'),
            icon: AlarmClock,
            href: toUrl(remindersIndex()),
        },
        {
            title: t('welcomeSavings'),
            description: t('welcomeSavingsTagline'),
            icon: PiggyBank,
            href: toUrl(savingsIndex()),
        },
    ];

    return (
        <>
            <Head title={t('pageDashboard')} />

            <div className="flex min-h-dvh flex-col p-6 lg:justify-center lg:p-8">
                <header className="mx-auto mb-10 flex w-full max-w-3xl items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold tracking-tight">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                            <Sparkles className="size-4" />
                        </span>
                        Life Man
                    </span>
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            {t('welcomeOpenDashboard')}
                        </Link>
                    ) : (
                        <nav className="flex items-center gap-2">
                            <Button asChild variant="ghost" size="sm">
                                <Link href={login()}>{t('welcomeSignIn')}</Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href={register()}>
                                    {t('welcomeSignUp')}
                                </Link>
                            </Button>
                        </nav>
                    )}
                </header>

                <main className="mx-auto flex w-full max-w-3xl flex-col gap-10">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                            <Sparkles className="size-3.5" />
                            {t('welcomeHeroTitle')}
                        </span>
                        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
                            {t('welcomeHeroLife')}{' '}
                            <span className="text-brand-600 dark:text-brand-400">
                                {t('welcomeHeroOrganized')}
                            </span>{' '}
                            dengan Life Man
                        </h1>
                        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                            {t('welcomeHeroDescription')}
                        </p>
                        {!auth.user && (
                            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <Link href={register()}>
                                        {t('welcomeCTA')}
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="rounded-xl"
                                >
                                    <Link href={login()}>
                                        {t('welcomeSignIn')}
                                    </Link>
                                </Button>
                            </div>
                        )}
                        {auth.user && (
                            <Button
                                asChild
                                size="lg"
                                className="mt-2 rounded-xl shadow-lg shadow-primary/25"
                            >
                                <Link href={dashboard()}>
                                    {t('welcomeOpenDashboard')}
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {features.map((feature) => (
                            <Link
                                key={feature.title}
                                href={feature.href}
                                prefetch
                                className="group block h-full"
                            >
                                <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-lg">
                                    <CardHeader className="pb-2">
                                        <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-110">
                                            <feature.icon className="size-5" />
                                        </div>
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            {feature.title}
                                            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
