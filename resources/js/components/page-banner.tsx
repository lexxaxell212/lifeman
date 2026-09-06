import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BannerStat = {
    key: string;
    label: string;
    value: string | number;
    icon?: LucideIcon;
};

export function PageBanner({
    stats,
    className,
}: {
    stats: BannerStat[];
    className?: string;
}) {
    return (
        <div
            className={cn(
                'rounded-2xl bg-primary/10 p-4 text-primary',
                className,
            )}
        >
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div key={stat.key} className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                                {Icon && <Icon className="size-3.5 shrink-0" />}
                                <span className="truncate">{stat.label}</span>
                            </div>
                            <p className="text-lg font-bold tracking-tight sm:text-xl">
                                {stat.value}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
