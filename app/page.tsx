import CommonLayout from "@/layouts/commonLayout";
import { getHomePage } from "@/graphql/query/Components";
import FadeIn from "@/components/ui/FadeIn";
import BlockRenderer from "@/lib/Blocks/BlockRenderer";
import { Block, HomePage } from "@/lib/types/blocks";

export default async function Home() {
  const homePage = (await getHomePage()) as HomePage;

  return (
    <CommonLayout>
      {homePage?.blocks?.map((block: Block) => (
        <FadeIn key={block.__typename}>
          <BlockRenderer block={block} />
        </FadeIn>
      ))}
    </CommonLayout>
  );
}
