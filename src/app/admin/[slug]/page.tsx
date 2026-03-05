import { AdminPage } from '@/features/admin';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminEditRoute({ params }: Props) {
  const { slug } = await params;
  return <AdminPage slug={slug} />;
}
