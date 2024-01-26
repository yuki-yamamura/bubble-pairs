import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  imagePath: string;
  title: string;
  content: string;
};
const FeatureCard = ({ imagePath, title, content }: Props) => (
  <Card className="max-w-sm border-none md:max-w-72">
    <CardHeader className="flex flex-row items-center justify-center gap-x-4 p-3">
      <img
        src={imagePath}
        alt=""
        aria-hidden
        className="relative top-[2px] h-6 w-6"
      />
      <CardTitle className="text-lg font-extralight">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{content}</p>
    </CardContent>
  </Card>
);

export default FeatureCard;
