import { Link, usePage } from '@inertiajs/react';
import { Info, Palette, User } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import Heading from '@/components/heading';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useI18n } from '@/lib/i18n';
import { checkForUpdates } from '@/lib/update-check';
import type { UpdateInfo } from '@/lib/update-check';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAbout } from '@/routes/about';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import type { NavItem } from '@/types';

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const { t } = useI18n();
    const { appVersion } = usePage().props;
    const [update, setUpdate] = useState<UpdateInfo | null>(null);

    const sidebarNavItems: NavItem[] = [
        {
            title: t('settingsAccount'),
            href: edit(),
            icon: User,
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
        <div className="px-3 py-4 sm:px-6">
            <div className="mb-4">
                <Heading
                    variant="small"
                    title={t('settingsTitle')}
                    description={t('settingsDescription')}
                />
            </div>

            <nav
                className="mb-4 flex gap-1.5 overflow-x-auto rounded-2xl border border-border/70 bg-card p-1.5"
                aria-label={t('settingsTitle')}
            >
                {sidebarNavItems.map((item) => {
                    const active = isCurrentOrParentUrl(item.href);

                    return (
                        <Link
                            key={toUrl(item.href)}
                            href={item.href}
                            prefetch="mount"
                            cacheFor="60s"
                            className={cn(
                                'relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200',
                                active
                                    ? 'bg-primary/15 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                            )}
                        >
                            {item.icon && <item.icon className="size-4" />}
                            <span>{item.title}</span>
                            {item.title === t('settingsAbout') &&
                                update?.updateAvailable && (
                                    <span
                                        className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive"
                                        aria-label={t(
                                            'settingsUpdateAvailable',
                                        )}
                                    />
                                )}
                        </Link>
                    );
                })}
            </nav>

            <section className="space-y-3">{children}</section>
        </div>
    );
}
