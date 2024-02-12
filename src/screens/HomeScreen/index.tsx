import FeatureCard from './FeatureCard';
import SignInButton from './SignInButton';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const HomeScreen = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    void router.push('/members');
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
