import Button from '@/components/Button';
import { ExternalLinkIcon } from 'lucide-react';

const OpenManualButton = () => {
  const handleClick = () => {
    window.open(
      'https://ymmr.notion.site/Bubble-Pairs-f5f94e9de8ac4a539a7ed9d1de1adf52',
      '_blank',
    );
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      <ExternalLinkIcon size={14} className="mr-1" />
      マニュアルを見る
    </Button>
  );
};

export default OpenManualButton;
