import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<typeof Button>;

export function FloatingActionButton({ className, ...props }: Props) {
    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] mx-auto w-full max-w-5xl px-3 md:px-4 lg:px-5">
            <div className="flex justify-end">
                <Button
                    className={cn(
                        'pointer-events-auto h-12 gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90',
                        className,
                    )}
                    {...props}
                />
            </div>
        </div>
    );
}
