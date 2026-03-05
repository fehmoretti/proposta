import { ProposalViewPage } from '@/features/proposal/components/ProposalViewPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProposalRoute({ params }: Props) {
  const { slug } = await params;
  return <ProposalViewPage slug={slug} />;
}
