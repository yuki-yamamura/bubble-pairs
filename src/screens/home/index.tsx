import FeatureCard from './FeatureCard';
import SignInButton from './SignInButton';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { ExternalLinkIcon } from 'lucide-react';

import type { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

const HomeScreen = ({ session }: Props) => {
  // for users who logged in.
  if (session) {
    return (
      <PageContainer title="Home">
        <div className="flex flex-col gap-y-16">
          <Card>
            <CardHeader className="text-base font-light">使い方</CardHeader>
            <CardContent>
              <CardDescription>
                基本的な使い方については、マニュアルをご覧ください。
              </CardDescription>
              <div className="mt-12 flex items-center justify-end md:mt-4">
                <Button variant="outline" onClick={() => console.log('foo!')}>
                  <ExternalLinkIcon size={14} className="mr-1" />
                  マニュアルを見る
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-base font-light">問い合わせ</CardHeader>
            <CardContent>
              <CardDescription>
                ご質問や不具合については、以下のメールアドレスに連絡ください。
              </CardDescription>
              <div className="mt-2">
                <a
                  href={`mailto: contact@ymmr.dev`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline"
                >
                  contact@ymmr.dev
                </a>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-base font-light">
              FAQ / よくあるご質問
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="question-1">
                  <AccordionTrigger className="font-extralight">
                    What is this?
                  </AccordionTrigger>
                  <AccordionContent>
                    This is a peace of abstract art!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="question-2">
                  <AccordionTrigger className="font-extralight">
                    What is this?
                  </AccordionTrigger>
                  <AccordionContent>
                    This is a peace of abstract art!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="question-3">
                  <AccordionTrigger className="font-extralight">
                    What is this?
                  </AccordionTrigger>
                  <AccordionContent>
                    This is a peace of abstract art!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="question-4">
                  <AccordionTrigger className="font-extralight">
                    What is this?
                  </AccordionTrigger>
                  <AccordionContent>
                    This is a peace of abstract art!
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <main className="flex h-full flex-col gap-y-20">
      <section id="hero" className="flex flex-col items-center">
        <img src="/images/gestures.png" alt="gestures" className="h-80 w-80" />
        <h2 className="pb-6 text-2xl font-light italic tracking-wide">
          ペア決めを簡単に
        </h2>
        <div className="pb-4 leading-8 md:pb-6 md:text-center md:leading-10">
          <p>Bubble Pairs はバドミントンのペア決めを簡単にするアプリです。</p>
          <p>試合前のペア決めが大変だと思うことはありませんか？</p>
          <p>いつもの作業はアプリに任せて、試合を楽しみましょう。</p>
        </div>
        <SignInButton />
      </section>

      <section id="features" className="flex flex-col items-center">
        <h2 className="pb-6 text-2xl font-light italic tracking-wide">
          Features
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <FeatureCard
            title="平等なペア決め"
            headerImage="/images/die.png"
            content="アプリが試合回数やペアを記録しているため、平等に試合を回せます。また、途中参加といったよくあるケースにも対応しています。"
          />
          <FeatureCard
            title="簡単に共有"
            headerImage="/images/announcement.png"
            content="公開リンクを使うことで、試合の情報を LINE グループ内で共有できます。ペアの確認を各自のスマートフォンから行えます。"
          />
          <FeatureCard
            title="入力は必要なだけ"
            headerImage="/images/clock.png"
            content="前回と同じ条件で試合をはじめられます。このようにアプリ全体で、入力の負担を減らす工夫がされています。"
          />
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
