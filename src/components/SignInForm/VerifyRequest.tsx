type Props = {
  email: string;
};
const VerifyRequest = ({ email }: Props) => (
  <div className="flex flex-col items-center gap-y-2 md:-translate-y-1/2">
    <img
      src="/images/inbox.png"
      alt="inbox"
      height={320}
      width={320}
      className="translate-x-7"
    />
    <div className="flex flex-col items-center gap-y-2">
      <h1>{`"${email}" にメールを送信しました。`}</h1>
    </div>
  </div>
);

export default VerifyRequest;
