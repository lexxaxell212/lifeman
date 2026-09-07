import { Head, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Download,
    ExternalLink,
    Heart,
    ListOrdered,
    LoaderCircle,
    RefreshCw,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { SettingsGroup } from '@/components/settings-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { checkForUpdates } from '@/lib/update-check';
import type { UpdateInfo } from '@/lib/update-check';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'Life Man';
const DEVELOPER_NAME = 'HumanoidType';
const SUPPORT_URL = 'https://saweria.co/';
const MIN_CHECK_MS = 600;

function openExternal(url: string): void {
    window.open(url, '_system');
}

export default function About() {
    const { t } = useI18n();
    const { appVersion } = usePage().props;
    const [update, setUpdate] = useState<UpdateInfo | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let cancelled = false;

        void checkForUpdates(appVersion).then(async (info) => {
            await new Promise((resolve) => setTimeout(resolve, MIN_CHECK_MS));

            if (!cancelled) {
                setUpdate(info);
                setChecking(false);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [appVersion]);

    function recheck(): void {
        setChecking(true);
        const started = Date.now();

        checkForUpdates(appVersion, true).then((info) => {
            const elapsed = Date.now() - started;

            if (elapsed >= MIN_CHECK_MS) {
                setUpdate(info);
                setChecking(false);

                return;
            }

            window.setTimeout(() => {
                setUpdate(info);
                setChecking(false);
            }, MIN_CHECK_MS - elapsed);
        });
    }

    const checkedLabel = update?.checkedAt
        ? new Date(update.checkedAt).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
          })
        : null;
    const releaseUrl = update?.releaseUrl;

    return (
        <>
            <Head title={t('aboutVersion')} />

            <h1 className="sr-only">{t('aboutAppInfo')}</h1>

            <div className="space-y-4">
                <SettingsGroup label={t('aboutAppInfo')}>
                    <div className="flex items-center gap-3 px-4 py-4">
                        <AppLogoIcon className="size-10 rounded-xl" />
                        <div className="min-w-0">
                            <p className="text-base font-semibold">
                                {APP_NAME}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {t('aboutVersionLabel')} {appVersion}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {t('aboutDevelopedBy')} {DEVELOPER_NAME}
                            </p>
                        </div>
                    </div>
                </SettingsGroup>

                <SettingsGroup label={t('aboutUpdate')}>
                    <div className="space-y-3 p-4">
                        {checking ? (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <LoaderCircle className="size-4 animate-spin" />
                                {t('aboutCheckingUpdates')}
                            </div>
                        ) : update?.failed ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <AlertCircle className="size-4 text-destructive" />
                                    {t('aboutUpdateError')}
                                </div>
                                {update.errorMessage && (
                                    <p className="text-xs text-muted-foreground">
                                        Detail: {update.errorMessage}
                                    </p>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl"
                                    onClick={recheck}
                                >
                                    <RefreshCw className="size-4" />
                                    {t('tryAgain')}
                                </Button>
                            </div>
                        ) : update?.updateAvailable ? (
                            <div className="space-y-3">
                                <Badge variant="destructive">
                                    {t('aboutUpdateAvailable')}
                                </Badge>
                                <p className="text-sm text-muted-foreground">
                                    {t('aboutUpdateVersionHelp')
                                        .replace(
                                            '{latest}',
                                            update.latestVersion ?? '',
                                        )
                                        .replace('{current}', appVersion)}
                                </p>
                                <Button
                                    className="rounded-xl"
                                    onClick={() =>
                                        openExternal(
                                            update.downloadUrl ??
                                                update.releaseUrl ??
                                                '',
                                        )
                                    }
                                >
                                    <Download className="size-4" />
                                    {t('aboutUpdateButton')}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <Badge
                                    variant="secondary"
                                    className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                                >
                                    <CheckCircle2 className="size-3.5" />
                                    {t('aboutUpToDate')}
                                </Badge>
                                <p className="text-sm text-muted-foreground">
                                    {t('aboutCurrentVersion').replace(
                                        '{version}',
                                        appVersion,
                                    )}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl"
                                onClick={recheck}
                                disabled={checking}
                            >
                                <RefreshCw className="size-4" />
                                {t('aboutCheckUpdates')}
                            </Button>
                            {checkedLabel && (
                                <span className="text-sm text-muted-foreground">
                                    {t('aboutLastChecked').replace(
                                        '{time}',
                                        checkedLabel,
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                </SettingsGroup>

                <SettingsGroup label={t('aboutChangelog')}>
                    <div className="space-y-3 p-4">
                        {update?.changelog ? (
                            <>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {t('aboutVersionLabel')}{' '}
                                    {update.latestVersion ?? appVersion}
                                </p>
                                <p className="max-h-56 overflow-y-auto text-sm whitespace-pre-wrap">
                                    {update.changelog}
                                </p>
                                {releaseUrl && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl"
                                        onClick={() => openExternal(releaseUrl)}
                                    >
                                        <ExternalLink className="size-4" />
                                        {t('aboutViewAllReleases')}
                                    </Button>
                                )}
                            </>
                        ) : (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ListOrdered className="size-4" />
                                {update?.failed
                                    ? t('aboutChangelogEmpty')
                                    : t('aboutChangelogNone')}
                            </div>
                        )}
                    </div>
                </SettingsGroup>

                <SettingsGroup label={t('aboutSupportDeveloper')}>
                    <div className="space-y-3 p-4">
                        <p className="text-sm text-muted-foreground">
                            {t('aboutSupportHelp').replace('{app}', APP_NAME)}
                        </p>
                        <Button
                            className="rounded-xl"
                            onClick={() => openExternal(SUPPORT_URL)}
                        >
                            <Heart className="size-4" />
                            {t('aboutSupportButton')}
                        </Button>
                    </div>
                </SettingsGroup>
            </div>
        </>
    );
}
