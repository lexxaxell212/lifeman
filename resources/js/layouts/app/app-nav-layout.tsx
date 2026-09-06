import { AppContent } from '@/components/app-content';
import { AppNav } from '@/components/app-nav';
import { AppShell } from '@/components/app-shell';
import { ReminderBanner } from '@/components/reminders/reminder-banner';
import { usePageFlash } from '@/hooks/use-page-flash';
import type { AppLayoutProps } from '@/types';

export default function AppNavLayout({ children }: AppLayoutProps) {
    usePageFlash();

    return (
        <AppShell variant="header">
            <AppNav />
            <AppContent
                variant="header"
                className="h-auto pt-6 pr-4 pb-28 pl-4"
            >
                {children}
            </AppContent>
            <ReminderBanner />
        </AppShell>
    );
}
