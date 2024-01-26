type Props = {
  title: string;
};

const Heading = ({ title }: Props) => (
  <h2 className="pb-6 text-2xl font-extralight italic tracking-wide">
    {title}
  </h2>
);

export default Heading;
