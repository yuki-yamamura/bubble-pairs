type Props = React.PropsWithChildren<{
  image: string;
}>;

const EmptyState = ({ image, children }: Props) => (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <img src={image} alt="" className="w-240 h-60" />
    {children}
  </div>
);

export default EmptyState;
