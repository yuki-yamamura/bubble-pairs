import { createTransport } from 'nodemailer';

import type { Theme } from 'next-auth';
import type { SendVerificationRequestParams } from 'next-auth/providers';

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: `Bubble Pairs <${provider.from}>`,
    subject: 'ログイン用のリンク',
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error('Failed to send an email.');
  }
};

const html = (params: { url: string; host: string; theme: Theme }) => {
  const { url, theme } = params;

  const brandColor = theme.brandColor || '#4F86F7';
  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fff',
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Bubble Pairs にログイン
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">ログイン
                </a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        メールに心当たりがない場合は無視してください。
      </td>
    </tr>
  </table>
</body>
`;
};

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
