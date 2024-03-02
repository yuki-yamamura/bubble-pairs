import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Faq = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="question-1">
      <AccordionTrigger>
        登録したメンバーや活動場所を削除できません。
      </AccordionTrigger>
      <AccordionContent>機能を実装予定です。</AccordionContent>
    </AccordionItem>
    <AccordionItem value="question-2">
      <AccordionTrigger>
        途中参加者をアクティビティに追加したいのですが。
      </AccordionTrigger>
      <AccordionContent>機能を実装予定です。</AccordionContent>
    </AccordionItem>
    <AccordionItem value="question-3">
      <AccordionTrigger>
        ペアをランダム以外の方法で決めることはできますか？
      </AccordionTrigger>
      <AccordionContent>
        現時点ではランダムのペア決めのみ対応しています。
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="question-4">
      <AccordionTrigger>
        アクティビティを終了するとどうなりますか？
      </AccordionTrigger>
      <AccordionContent>ゲームの追加ができなくなります。</AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default Faq;
