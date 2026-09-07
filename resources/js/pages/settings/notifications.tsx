import { Head, router, usePage } from '@inertiajs/react';
import { Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SettingsGroup, SettingsRadioDot } from '@/components/settings-list';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import {
    SOUNDS,
    isNativePlatform,
    rescheduleUpcomingReminders,
} from '@/lib/notification';
import { cn } from '@/lib/utils';
import { edit as editNotifications } from '@/routes/notifications';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Notifications() {
    const { t } = useI18n();
    const { auth } = usePage<PageProps>().props;
    const [selected, setSelected] = useState(
        auth.user.notification_sound ?? 'default',
    );
    const [saving, setSaving] = useState(false);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(
        () => () => {
            audioRef.current?.pause();
        },
        [],
    );

    function preview(soundId: string): void {
        if (soundId === 'default') {
            return;
        }

        if (audioRef.current && playingId === soundId) {
            audioRef.current.pause();
            setPlayingId(null);

            return;
        }

        audioRef.current?.pause();
        const audio = new Audio(`/sounds/${soundId}.wav`);
        audio.onplay = () => setPlayingId(soundId);
        audio.onended = () => setPlayingId(null);
        audio.onpause = () => setPlayingId(null);
        audioRef.current = audio;
        void audio.play();
    }

    function choose(soundId: string): void {
        if (soundId === selected || saving) {
            return;
        }

        setSelected(soundId);
        setSaving(true);

        router.put(
            editNotifications(),
            { notification_sound: soundId },
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (isNativePlatform()) {
                        void rescheduleUpcomingReminders(soundId);
                    }
                },
                onFinish: () => setSaving(false),
            },
        );
    }

    return (
        <>
            <Head title={t('notificationsTitle')} />

            <div className="space-y-4">
                <SettingsGroup label={t('notificationsSoundLabel')}>
                    {SOUNDS.map((sound) => {
                        const isSelected = selected === sound.id;
                        const isDefault = sound.id === 'default';
                        const isPlaying = playingId === sound.id;

                        return (
                            <div
                                key={sound.id}
                                role="radio"
                                aria-checked={isSelected}
                                tabIndex={0}
                                onClick={() => choose(sound.id)}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === 'Enter' ||
                                        event.key === ' '
                                    ) {
                                        event.preventDefault();
                                        choose(sound.id);
                                    }
                                }}
                                className={cn(
                                    'flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors duration-150',
                                    isSelected
                                        ? 'bg-primary/10'
                                        : 'hover:bg-muted/60 active:bg-muted/80',
                                )}
                            >
                                <span
                                    className={cn(
                                        'flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150',
                                        isSelected
                                            ? 'bg-primary/15 text-primary'
                                            : 'bg-muted text-muted-foreground',
                                    )}
                                >
                                    <Volume2 className="size-4" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p
                                        className={cn(
                                            'truncate text-sm font-medium',
                                            isSelected && 'text-primary',
                                        )}
                                    >
                                        {sound.label}
                                    </p>
                                    {isDefault && (
                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            {t('notificationsDefaultSound')}
                                        </p>
                                    )}
                                </div>

                                {isPlaying ? (
                                    <div
                                        className="flex h-4 shrink-0 items-end gap-0.5"
                                        aria-label={t('notificationsPlaying')}
                                    >
                                        {[0, 1, 2].map((i) => (
                                            <span
                                                key={i}
                                                className="w-1 animate-pulse rounded-full bg-primary"
                                                style={{
                                                    height: `${6 + i * 4}px`,
                                                    animationDelay: `${i * 0.18}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    !isDefault && (
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="size-8 shrink-0 rounded-full"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                preview(sound.id);
                                            }}
                                            title={`${t('notifPlay')} ${sound.label}`}
                                        >
                                            <Volume2 className="size-4" />
                                        </Button>
                                    )
                                )}

                                <SettingsRadioDot selected={isSelected} />
                            </div>
                        );
                    })}
                </SettingsGroup>
            </div>
        </>
    );
}

Notifications.layout = {
    breadcrumbs: [
        {
            title: 'Notifikasi',
            href: editNotifications(),
        },
    ],
};
