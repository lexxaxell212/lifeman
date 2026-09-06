import { Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const options: { value: Language; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'id', label: 'ID' },
];

export function LanguageSelector() {
    const { lang, setLang } = useI18n();

    return (
        <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Languages className="size-4" />
            </span>
            <div
                className="flex items-center gap-0.5 rounded-full border bg-muted p-0.5"
                role="group"
                aria-label="Language"
            >
                {options.map((option) => (
                    <Button
                        key={option.value}
                        size="sm"
                        variant="ghost"
                        onClick={() => setLang(option.value)}
                        aria-pressed={lang === option.value}
                        className={cn(
                            'h-7 rounded-full px-4 text-xs font-semibold transition-colors duration-200',
                            lang === option.value
                                ? 'bg-primary/15 text-primary'
                                : 'text-muted-foreground hover:text-foreground',
                        )}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
