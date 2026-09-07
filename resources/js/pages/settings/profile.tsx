import { Form, Head, Link, usePage } from '@inertiajs/react';
import { KeyRound, LogOut, Mail, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { SettingsGroup } from '@/components/settings-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { t } = useI18n();
    const { auth } = usePage<PageProps>().props;
    const verified = auth.user.email_verified_at !== null;
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <Head title={t('profileTitle')} />

            <h1 className="sr-only">{t('profileDescription')}</h1>

            <div className="space-y-4">
                <SettingsGroup label={t('profileTitle')}>
                    <div className="space-y-3 p-4">
                        <Form
                            {...ProfileController.update.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            className="space-y-3"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="name">
                                            {t('profileNameLabel')}
                                        </Label>
                                        <Input
                                            id="name"
                                            className="rounded-xl"
                                            defaultValue={auth.user.name}
                                            name="name"
                                            required
                                            autoComplete="name"
                                            placeholder={t(
                                                'profileNamePlaceholder',
                                            )}
                                        />
                                        <InputError
                                            className="mt-0.5"
                                            message={errors.name}
                                        />
                                    </div>

                                    <Button
                                        disabled={processing}
                                        className="rounded-xl"
                                        data-test="update-profile-button"
                                    >
                                        {t('save')}
                                    </Button>
                                </>
                            )}
                        </Form>
                    </div>
                </SettingsGroup>

                <SettingsGroup label={t('profileEmailLabel')}>
                    <div className="space-y-3 p-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                <Mail className="size-4" />
                            </span>
                            <p className="min-w-0 flex-1 truncate text-sm font-medium">
                                {auth.user.email}
                            </p>
                            <span
                                className={cn(
                                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                                    verified
                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-brand-500/10 text-brand-600 dark:text-brand-400',
                                )}
                            >
                                {verified ? (
                                    <ShieldCheck className="size-3.5" />
                                ) : (
                                    <ShieldAlert className="size-3.5" />
                                )}
                                {verified
                                    ? t('profileVerified')
                                    : t('profileUnverified')}
                            </span>
                        </div>

                        {mustVerifyEmail && !verified && (
                            <div className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-3 text-sm">
                                <p className="text-muted-foreground">
                                    {t('profileVerifyHelp')}
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 rounded-xl"
                                >
                                    <Link
                                        href={send()}
                                        as="button"
                                        className="font-medium"
                                    >
                                        {t('profileResendVerify')}
                                    </Link>
                                </Button>

                                {status === 'verification-link-sent' && (
                                    <p className="mt-2 text-sm font-medium text-green-600">
                                        {t('profileVerifySent')}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </SettingsGroup>

                <SettingsGroup label={t('profilePasswordSection')}>
                    <div className="space-y-3 p-4">
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <KeyRound className="size-4 shrink-0 text-primary" />
                            {t('profilePasswordHelp')}
                        </p>

                        <Form
                            {...SecurityController.update.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            resetOnError={[
                                'password',
                                'password_confirmation',
                                'current_password',
                            ]}
                            resetOnSuccess
                            onError={(errors) => {
                                if (errors.password) {
                                    passwordInput.current?.focus();
                                }

                                if (errors.current_password) {
                                    currentPasswordInput.current?.focus();
                                }
                            }}
                            className="space-y-3"
                        >
                            {({ errors, processing }) => (
                                <>
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="current_password">
                                            {t('profileCurrentPassword')}
                                        </Label>

                                        <PasswordInput
                                            id="current_password"
                                            ref={currentPasswordInput}
                                            name="current_password"
                                            className="rounded-xl"
                                            autoComplete="current-password"
                                            placeholder={t(
                                                'profileCurrentPassword',
                                            )}
                                        />

                                        <InputError
                                            message={errors.current_password}
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="password">
                                            {t('profileNewPassword')}
                                        </Label>

                                        <PasswordInput
                                            id="password"
                                            ref={passwordInput}
                                            name="password"
                                            className="rounded-xl"
                                            autoComplete="new-password"
                                            placeholder={t(
                                                'profileNewPassword',
                                            )}
                                        />

                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="password_confirmation">
                                            {t('profileConfirmPassword')}
                                        </Label>

                                        <PasswordInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            className="rounded-xl"
                                            autoComplete="new-password"
                                            placeholder={t(
                                                'profileConfirmPasswordHelp',
                                            )}
                                        />

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>

                                    <Button
                                        disabled={processing}
                                        className="rounded-xl"
                                        data-test="update-password-button"
                                    >
                                        {t('profileSavePassword')}
                                    </Button>
                                </>
                            )}
                        </Form>
                    </div>
                </SettingsGroup>

                <SettingsGroup label={t('profileAccountSection')}>
                    <div className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
                        {t('profileAccountHelp')}
                    </div>
                    <div className="p-4">
                        <Button
                            asChild
                            variant="secondary"
                            className="w-full rounded-xl"
                        >
                            <Link
                                href={logout()}
                                as="button"
                                data-test="logout-button"
                            >
                                <LogOut className="size-4" />
                                {t('profileSignOut')}
                            </Link>
                        </Button>
                    </div>
                    <div className="p-4 pt-0">
                        <DeleteUser compact />
                    </div>
                </SettingsGroup>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profil',
            href: edit(),
        },
    ],
};
