import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = React.ComponentPropsWithoutRef<typeof Card> & {
  title: string;
  headerImage: string;
  content: string;
};
const FeatureCard = ({ title, headerImage, content }: Props) => (
  <Card className="max-w-lg">
    <CardHeader className="flex flex-row items-center justify-center gap-x-4 p-3">
      <img
        src={headerImage}
        alt=""
        aria-hidden
        className="relative top-[2px] h-6 w-6"
      />
      <CardTitle className="text-lg font-light">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{content}</p>
    </CardContent>
  </Card>
);

export default FeatureCard;
