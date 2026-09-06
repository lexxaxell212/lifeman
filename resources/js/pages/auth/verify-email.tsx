// Components
import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getT, useI18n } from '@/lib/i18n';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    const { t } = useI18n();

    return (
        <>
            <Head title={t('authVerifyTitle')} />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {t('authVerifySent')}
                </div>
            )}

            <Form {...send.form()} className="space-y-4 text-center">
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            {t('authResendVerification')}
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm"
                        >
                            {t('authLogout')}
                        </TextLink>
                    </>
                )}
            </Form>
        </>
    );
}

const authVerify = getT();

VerifyEmail.layout = {
    title: authVerify('authVerifyTitle'),
    description: authVerify('authVerifyDescription'),
};
