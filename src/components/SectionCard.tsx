import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = React.PropsWithChildren<{
  title: string;
}>;

const SectionCard = ({ title, children }: Props) => (
  <section>
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-light">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </section>
);

export default SectionCard;
