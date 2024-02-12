type Props = React.PropsWithChildren;

const PageContainer = ({ children }: Props) => (
  <div className="mx-auto w-full max-w-screen-md px-6 sm:px-10">{children}</div>
);

export default PageContainer;
