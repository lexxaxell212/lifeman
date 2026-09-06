import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PagePanel({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <section
            className={cn(
                'rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm',
                className,
            )}
        >
            {children}
        </section>
    );
}
