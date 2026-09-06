import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';

export function NettoBadge({ netto }: { netto: number }) {
    const { t } = useI18n();

    if (netto > 0) {
        return (
            <Badge className="bg-emerald-500 text-white">
                {t('nettoSurplus')}
            </Badge>
        );
    }

    if (netto < 0) {
        return <Badge variant="destructive">{t('nettoDeficit')}</Badge>;
    }

    return <Badge variant="secondary">{t('nettoEven')}</Badge>;
}
