import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SettingsGroupProps = {
    label?: ReactNode;
    children: ReactNode;
    className?: string;
};

export function SettingsGroup({
    label,
    children,
    className,
}: SettingsGroupProps) {
    return (
        <section className={className}>
            {label && (
                <h3 className="px-1 pb-1.5 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                    {label}
                </h3>
            )}
            <div className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card">
                {children}
            </div>
        </section>
    );
}

type SettingsRowProps = {
    icon?: LucideIcon | ReactNode;
    title: ReactNode;
    subtitle?: ReactNode;
    trailing?: ReactNode;
    chevron?: boolean;
    active?: boolean;
    destructive?: boolean;
    disabled?: boolean;
    href?: NonNullable<InertiaLinkProps['href']>;
    onClick?: () => void;
    className?: string;
    'data-test'?: string;
};

export function SettingsRow({
    icon,
    title,
    subtitle,
    trailing,
    chevron = false,
    active = false,
    destructive = false,
    disabled = false,
    href,
    onClick,
    className,
    ...rest
}: SettingsRowProps) {
    const isIconComponent =
        typeof icon === 'function' ||
        (typeof icon === 'object' &&
            icon !== null &&
            typeof (icon as { render?: unknown }).render === 'function');
    const IconComponent = isIconComponent ? (icon as LucideIcon) : null;

    const content = (
        <>
            {icon && (
                <span
                    className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150',
                        destructive
                            ? 'bg-destructive/10 text-destructive'
                            : active
                              ? 'bg-primary/15 text-primary'
                              : 'bg-muted text-muted-foreground',
                    )}
                >
                    {IconComponent ? (
                        <IconComponent className="size-4" />
                    ) : (
                        (icon as ReactNode)
                    )}
                </span>
            )}
            <span className="min-w-0 flex-1">
                <span
                    className={cn(
                        'block truncate text-sm font-medium',
                        destructive && 'text-destructive',
                    )}
                >
                    {title}
                </span>
                {subtitle && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                        {subtitle}
                    </span>
                )}
            </span>
            {trailing ??
                (chevron && (
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground/60" />
                ))}
        </>
    );

    const classes = cn(
        'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150',
        active ? 'bg-primary/10' : 'hover:bg-muted/60 active:bg-muted/80',
        destructive && 'hover:bg-destructive/5',
        disabled && 'pointer-events-none opacity-60',
        className,
    );

    if (href) {
        return (
            <Link
                href={href}
                className={classes}
                aria-current={active ? 'page' : undefined}
                onClick={onClick}
                {...rest}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={classes}
            aria-current={active ? 'page' : undefined}
            {...rest}
        >
            {content}
        </button>
    );
}

export function SettingsRadioDot({
    selected,
    className,
}: {
    selected: boolean;
    className?: string;
}) {
    return (
        <span
            className={cn(
                'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150',
                selected ? 'border-primary' : 'border-border',
                className,
            )}
        >
            <span
                className={cn(
                    'size-2.5 rounded-full bg-primary transition-transform duration-150',
                    selected ? 'scale-100' : 'scale-0',
                )}
            />
        </span>
    );
}
