import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plan my Journey | Hyperspace Tunneling Corp.",
  description: "The cosmos is calling, and the journey begins with Star Seeker. Start your cosmic adventure now!",
};

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
