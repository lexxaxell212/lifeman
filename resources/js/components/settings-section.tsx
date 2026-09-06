import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type SettingsSectionProps = {
    icon: LucideIcon;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    tone?: 'accent' | 'neutral';
};

export default function SettingsSection({
    icon: Icon,
    title,
    description,
    children,
    footer,
    tone = 'accent',
}: SettingsSectionProps) {
    return (
        <section className="overflow-hidden rounded-2xl border border-border/70 bg-card">
            <header className="flex items-center gap-3 border-b px-4 py-3">
                <span
                    className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-xl',
                        tone === 'accent'
                            ? 'bg-brand-500/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
                            : 'bg-muted text-muted-foreground',
                    )}
                >
                    <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-card-foreground">
                        {title}
                    </h3>
                    {description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            </header>
            <div className="px-4 py-4">{children}</div>
            {footer && (
                <footer className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/40 px-4 py-3">
                    {footer}
                </footer>
            )}
        </section>
    );
}
