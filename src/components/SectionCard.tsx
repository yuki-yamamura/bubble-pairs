import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = React.PropsWithChildren<{
  title: string;
  description?: string;
}>;

const SectionCard = ({ title, description, children }: Props) => (
  <section>
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-light">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="text-muted-foreground">{children}</CardContent>
    </Card>
  </section>
);

export default SectionCard;
