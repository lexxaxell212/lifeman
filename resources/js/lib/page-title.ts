import type { TranslationKey } from '@/lib/i18n';

const PAGE_TITLE_KEYS: Record<string, TranslationKey> = {
    dashboard: 'pageDashboard',
    'personal/index': 'pagePersonal',
    'businesses/index': 'pageBusinessIndex',
    'businesses/create': 'pageBusinessCreate',
    'businesses/show': 'pageBusinessShow',
    'cashflows/index': 'pageCashflowIndex',
    'cashflows/show': 'pageCashflowShow',
    'reminders/index': 'pageReminders',
    'notifications/index': 'pageNotifications',
    'savings/index': 'pageSavingsIndex',
    'savings/show': 'pageSavingsShow',
    'settings/profile': 'pageSettingsProfile',
    'settings/notifications': 'pageSettingsNotifications',
    'settings/security': 'pageSettingsSecurity',
    'settings/appearance': 'pageSettingsAppearance',
    'settings/about': 'pageSettingsAbout',
};

export function pageTitleKey(component: string): TranslationKey {
    return PAGE_TITLE_KEYS[component] ?? 'pageDashboard';
}
