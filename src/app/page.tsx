import SideNav from "./sideNav";

export default function Home() {
  return (
    <main className="container mx-auto pt-12">
      <div className="flex gap-8">
        <SideNav />
        <div className="w-full">Home</div>
      </div>
    </main>
  );
}
