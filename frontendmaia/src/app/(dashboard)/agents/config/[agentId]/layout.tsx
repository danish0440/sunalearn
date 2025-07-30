import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configure Agent | Kortix Suna',
  description: 'Configure an agent',
  openGraph: {
    title: 'Configure Agent | Kortix Suna',
  description: 'Configure an agent',
    type: 'website',
  },
};

export default async function AgentConfigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
