import Link from "next/link";

export default function Footer() {
  return (
    <div className="h-40 bg-zinc-100 mt-12 flex items-center">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg">Personal File Drive</div>
        <Link href="https://ryancoppa.com" target="_blank">
          My Portfilio
        </Link>
      </div>
    </div>
  );
}
