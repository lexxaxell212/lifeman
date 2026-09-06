import { Link, router, usePage } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import {
    Bell,
    Briefcase,
    Home,
    PiggyBank,
    Settings,
    Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { useI18n } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';
import { cn, toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { index as businessesIndex } from '@/routes/businesses';
import { index as cashflowsIndex } from '@/routes/cashflows';
import profile from '@/routes/profile';
import { index as remindersIndex } from '@/routes/reminders';
import { index as savingsIndex } from '@/routes/savings-goals';

const CACHE_FOR = '60s';

type DrawerNavItem = {
    title: TranslationKey;
    icon: LucideIcon;
    href: NonNullable<InertiaLinkProps['href']>;
};

type DrawerSection = {
    label: TranslationKey;
    items: DrawerNavItem[];
};

function getNavItems(): DrawerSection[] {
    return [
        {
            label: 'navMenu',
            items: [{ title: 'navDashboard', icon: Home, href: dashboard() }],
        },
        {
            label: 'navPersonal',
            items: [
                { title: 'navSavings', icon: PiggyBank, href: savingsIndex() },
                { title: 'navCashflow', icon: Wallet, href: cashflowsIndex() },
            ],
        },
        {
            label: 'navBusiness',
            items: [
                {
                    title: 'navBusiness',
                    icon: Briefcase,
                    href: businessesIndex(),
                },
            ],
        },
        {
            label: 'navOthers',
            items: [
                { title: 'navReminders', icon: Bell, href: remindersIndex() },
                { title: 'navSettings', icon: Settings, href: profile.edit() },
            ],
        },
    ];
}

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function NavDrawer({ open, onOpenChange }: Props) {
    const page = usePage();
    const user = page.props.auth?.user;
    const getInitials = useInitials();
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const { t } = useI18n();
    const sections = getNavItems();
    const urlRef = useRef(page.url);

    useEffect(() => {
        urlRef.current = page.url;
    }, [page.url]);

    // Prefetch every menu target right after each navigation so the next
    // visit (and the drawer items) feel instant.
    useEffect(() => {
        const offFinish = router.on('finish', () => {
            const currentPath = new URL(urlRef.current, window.location.origin)
                .pathname;

            getNavItems()
                .flatMap((section) => section.items)
                .forEach((item) => {
                    const targetPath = new URL(
                        toUrl(item.href),
                        window.location.origin,
                    ).pathname;

                    if (targetPath !== currentPath) {
                        router.prefetch(item.href, {}, { cacheFor: CACHE_FOR });
                    }
                });
        });

        return offFinish;
    }, []);

    return (
        <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
            <SheetContent
                side="left"
                hideClose
                onOverlayClick={() => onOpenChange(false)}
                className="z-50 w-[80%] max-w-xs gap-0 p-0 sm:max-w-sm"
            >
                <SheetHeader className="border-b px-6 py-5 text-left">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-11">
                            <AvatarFallback className="bg-primary/15 text-sm font-bold text-primary">
                                {user ? getInitials(user.name) : 'LM'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <SheetTitle className="truncate">
                                {user?.name ?? 'Life Man'}
                            </SheetTitle>
                            {user?.email && (
                                <p className="truncate text-xs text-muted-foreground">
                                    {user.email}
                                </p>
                            )}
                        </div>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-3 py-4">
                    {sections.map((section) => (
                        <div key={section.label} className="mb-5 last:mb-0">
                            <p className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                                {t(section.label)}
                            </p>
                            <nav className="flex flex-col gap-1">
                                {section.items.map((item) => {
                                    const active = isCurrentOrParentUrl(
                                        item.href,
                                    );

                                    return (
                                        <Link
                                            key={toUrl(item.href)}
                                            href={toUrl(item.href)}
                                            prefetch="mount"
                                            cacheFor={CACHE_FOR}
                                            className={cn(
                                                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                                                active
                                                    ? 'bg-primary/15 text-primary'
                                                    : 'text-foreground/80 hover:bg-muted hover:text-foreground',
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon className="size-5 shrink-0" />
                                            )}
                                            <span className="truncate">
                                                {t(item.title)}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
