"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-40 flex flex-col gap-4">
      <Link href="/directory/files">
        <Button
          variant="link"
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes("directory/files"),
          })}
        >
          <FileIcon />
          All Files
        </Button>
      </Link>
      <Link href="/directory/favourites">
        <Button
          variant="link"
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes("directory/favourites"),
          })}
        >
          <StarIcon />
          Favourites
        </Button>
      </Link>
    </div>
  );
};

export default SideNav;
