import type { InertiaLinkProps } from '@inertiajs/react';
import { router, usePage } from '@inertiajs/react';
import { Bell, ChevronRight, Info, Palette } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { SettingsGroup, SettingsRow } from '@/components/settings-list';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { useI18n } from '@/lib/i18n';
import { checkForUpdates } from '@/lib/update-check';
import type { UpdateInfo } from '@/lib/update-check';
import { toUrl } from '@/lib/utils';
import { edit as editAbout } from '@/routes/about';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editNotifications } from '@/routes/notifications';
import { edit } from '@/routes/profile';
import type { Auth } from '@/types';

type Href = NonNullable<InertiaLinkProps['href']>;

type PageProps = {
    auth: Auth;
};

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl, currentUrl } = useCurrentUrl();
    const { t } = useI18n();
    const { appVersion } = usePage().props;
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;
    const getInitials = useInitials();
    const [update, setUpdate] = useState<UpdateInfo | null>(null);
    const [pendingHref, setPendingHref] = useState<string | null>(null);

    useEffect(() => {
        const clearPending = (): void => {
            setPendingHref((current) => (current ? null : current));
        };

        const unlisten: Array<() => void> = [
            router.on('success', clearPending),
            router.on('error', clearPending),
            router.on('cancel', clearPending),
            router.on('networkError', clearPending),
        ];

        return () => {
            unlisten.forEach((remove) => remove());
        };
    }, []);

    const selectRow = (href: Href): void => {
        setPendingHref(toUrl(href));
    };

    const isRowActive = (href: Href): boolean => {
        const hrefString = toUrl(href);

        if (pendingHref !== null && pendingHref !== currentUrl) {
            return pendingHref === hrefString;
        }

        return isCurrentOrParentUrl(href);
    };

    const navItems = [
        {
            title: t('settingsNotifications'),
            href: editNotifications(),
            icon: Bell,
        },
        {
            title: t('settingsAppearance'),
            href: editAppearance(),
            icon: Palette,
        },
        {
            title: t('settingsAbout'),
            href: editAbout(),
            icon: Info,
        },
    ];

    useEffect(() => {
        let cancelled = false;

        checkForUpdates(appVersion).then((info) => {
            if (!cancelled) {
                setUpdate(info);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [appVersion]);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-4 px-3 py-4 sm:px-6">
            <header className="space-y-0.5">
                <h1 className="text-xl font-semibold tracking-tight">
                    {t('settingsTitle')}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {t('settingsDescription')}
                </p>
            </header>

            <nav aria-label={t('settingsTitle')}>
                <SettingsGroup>
                    {user && (
                        <SettingsRow
                            href={edit()}
                            icon={
                                <Avatar className="size-8">
                                    <AvatarFallback className="bg-primary/15 text-[11px] font-bold text-primary">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            }
                            title={user.name}
                            subtitle={user.email}
                            chevron
                            active={isRowActive(edit())}
                            onClick={() => selectRow(edit())}
                        />
                    )}
                    {navItems.map((item) => (
                        <SettingsRow
                            key={toUrl(item.href)}
                            href={item.href}
                            icon={item.icon}
                            title={item.title}
                            chevron
                            active={isRowActive(item.href)}
                            onClick={() => selectRow(item.href)}
                            trailing={
                                item.title === t('settingsAbout') &&
                                update?.updateAvailable ? (
                                    <span className="flex items-center gap-2">
                                        <span
                                            className="size-2 rounded-full bg-destructive"
                                            aria-label={t(
                                                'settingsUpdateAvailable',
                                            )}
                                        />
                                        <ChevronRight className="size-4 text-muted-foreground/60" />
                                    </span>
                                ) : undefined
                            }
                        />
                    ))}
                </SettingsGroup>
            </nav>

            <main className="space-y-4">{children}</main>
        </div>
    );
}
