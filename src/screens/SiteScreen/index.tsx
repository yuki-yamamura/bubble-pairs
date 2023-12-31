import SiteDetail from '@/features/sites/components/SiteDetail';

import type { Site } from '@prisma/client';

type Props = {
  site: Site;
};

const SiteScreen = ({ site }: Props) => (
  <>
    <h1>サイト 詳細</h1>
    <SiteDetail site={site} />
  </>
);

export default SiteScreen;
