export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen w-screen">
        <main className="bg-[#151515]">{children}</main>
      </div>
    </>
  );
}
