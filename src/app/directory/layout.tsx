import SideNav from "../sideNav";

export default function DirectoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto pt-12">
      <div className="flex gap-8">
        <SideNav />
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
