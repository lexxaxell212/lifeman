import { Form, Head } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import { useRef } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { SettingsGroup } from '@/components/settings-list';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useI18n } from '@/lib/i18n';
import { edit } from '@/routes/security';

type Props = {
    passwordRules: string;
};

export default function Security(props: Props) {
    const { t } = useI18n();
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <Head title={t('securityTitle')} />

            <h1 className="sr-only">{t('securityDescription')}</h1>

            <div className="space-y-4">
                <SettingsGroup label={t('securityChangePassword')}>
                    <div className="space-y-3 p-4">
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
                                            {t('securityCurrentPassword')}
                                        </Label>

                                        <PasswordInput
                                            id="current_password"
                                            ref={currentPasswordInput}
                                            name="current_password"
                                            className="rounded-xl"
                                            autoComplete="current-password"
                                            placeholder={t(
                                                'securityCurrentPassword',
                                            )}
                                        />

                                        <InputError
                                            message={errors.current_password}
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="password">
                                            {t('securityNewPassword')}
                                        </Label>

                                        <PasswordInput
                                            id="password"
                                            ref={passwordInput}
                                            name="password"
                                            className="rounded-xl"
                                            autoComplete="new-password"
                                            placeholder={t(
                                                'securityNewPassword',
                                            )}
                                            passwordrules={props.passwordRules}
                                        />

                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="password_confirmation">
                                            {t('securityConfirmPassword')}
                                        </Label>

                                        <PasswordInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            className="rounded-xl"
                                            autoComplete="new-password"
                                            placeholder={t(
                                                'securityConfirmPasswordHelp',
                                            )}
                                            passwordrules={props.passwordRules}
                                        />

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
                                        <ShieldCheck className="size-4 shrink-0 text-primary" />
                                        <p className="text-xs text-muted-foreground">
                                            {t('securityTips')}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-1">
                                        <Button
                                            disabled={processing}
                                            className="rounded-xl"
                                            data-test="update-password-button"
                                        >
                                            {t('securitySavePassword')}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </SettingsGroup>
            </div>
        </>
    );
}

Security.layout = {
    breadcrumbs: [
        {
            title: 'Keamanan',
            href: edit(),
        },
    ],
};
