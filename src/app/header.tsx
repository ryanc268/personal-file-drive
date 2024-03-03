"use client";

import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  return (
    <div className="border-b py-4 bg-zinc-900 z-40">
      <div className="container mx-auto justify-between flex items-center">
        <Link href="/" className="flex items-center gap-2 text-xl">
          <Image src="/logo.png" width="40" height="40" alt="logo" />
          Personal File Drive
        </Link>
        {session.isLoaded && session.isSignedIn ? (
          <div className="flex gap-2">
            <OrganizationSwitcher
              hidePersonal
              afterCreateOrganizationUrl="/directory/files"
              afterLeaveOrganizationUrl="/directory/files"
              afterSelectOrganizationUrl="/directory/files"
              afterSwitchOrganizationUrl="/directory/files"
            />
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
