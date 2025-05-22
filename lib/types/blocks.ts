export interface BaseBlock {
  __typename: string;
  id: number;
}

export interface LandingPageBlock extends BaseBlock {
  __typename: "ComponentBlocksLandingPage";
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundMedia: {
    url: string;
    alternativeText?: string;
  };
}

export interface AlterBlock extends BaseBlock {
  __typename: "ComponentBlocksAlterBlock";
  heading: string;
  subheading: string;
  data_component: Array<{
    title: string;
    subtitle: string;
    image: {
      url: string;
      alternativeText?: string;
    };
  }>;
}

export type Block = LandingPageBlock | AlterBlock;

export interface HomePage {
  blocks: Block[];
}
