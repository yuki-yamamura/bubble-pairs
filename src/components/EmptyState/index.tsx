type Props = React.PropsWithChildren<{
  image: string;
  alt: string;
}>;

const EmptyState = ({ image, alt, children }: Props) => (
  <div>
    <img src={image} alt={alt} height={240} width={240} />
    {children}
  </div>
);

export default EmptyState;
