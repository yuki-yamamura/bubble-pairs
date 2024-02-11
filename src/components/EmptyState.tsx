type Props = React.PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>>;

const EmptyState = ({ children, alt, ...rest }: Props) => (
  <div className="flex flex-col items-center justify-center">
    <img alt={alt} {...rest} className="w-240 h-60" />
    {children}
  </div>
);

export default EmptyState;
