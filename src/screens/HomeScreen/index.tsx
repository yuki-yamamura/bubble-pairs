import FeatureCard from './FeatureCard';
import Heading from './Heading';
import LoginButton from './LoginButton';

const HomeScreen = () => (
  <div className="my-auto h-full">
    <section id="hero" className="mb-20 flex flex-col items-center">
      <img src="/images/gestures.png" alt="gestures" className="h-80 w-80" />
      <Heading title="ペア決めを簡単に" />
      <div className="pb-4 leading-7 md:text-center md:leading-10">
        <p>
          Bubble Pairs
          はテニスやバドミントン、卓球といったスポーツのペア決めを簡単にするアプリです。
        </p>
        <p>試合前のペア決めが意外と大変だと思うことはありませんか？</p>
        <p>いつもの作業はアプリに任せて、試合を楽しみましょう。</p>
      </div>
      <LoginButton />
    </section>

    <section id="features" className="flex flex-col items-center">
      <Heading title="Features" />
      <div className="flex flex-col items-center gap-y-6 md:flex-row md:items-stretch md:gap-x-6">
        <FeatureCard
          imagePath="/images/die.png"
          title="平等なペア決め"
          content="アプリが試合回数や前のペアを記憶しているため、平等に試合を回せます。また、ランダムだけでなく、お好みの試合条件にも対応しています。"
        />
        <FeatureCard
          imagePath="/images/announcement.png"
          title="簡単に共有"
          content="公開リンクを使うことで、LINE グループ内で試合の情報を共有できます。ペアの確認を各自のスマートフォンから行えるようになります。"
        />
        <FeatureCard
          imagePath="/images/clock.png"
          title="入力は必要なだけ"
          content="前回と同じ条件で試合をはじめられます。アプリ全体で入力を減らす工夫がされているため、操作に慣れていなくても安心して使用できます。"
        />
      </div>
    </section>
  </div>
);

export default HomeScreen;
