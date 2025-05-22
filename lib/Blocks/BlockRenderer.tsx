import dynamic from "next/dynamic";
import { Block } from "@/lib/types/blocks";

const LandingPage = dynamic(() => import("@/components/Blocks/LandingPage"), {
  ssr: false,
});
const AlterCompLayout = dynamic(
  () => import("@/components/Blocks/AlterCompLayout"),
  { ssr: false },
);

export default function BlockRenderer({ block }: { block: Block }) {
  switch (block.__typename) {
    case "ComponentBlocksLandingPage":
      return <LandingPage block={block} />;
    case "ComponentBlocksAlterBlock":
      return <AlterCompLayout block={block} />;
    default:
      return null;
  }
}
