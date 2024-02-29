"use client";

import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  UserButton,
  useSession,
} from "@clerk/nextjs";

export default function Header() {
  const session = useSession();
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="container mx-auto justify-between flex items-center">
        <div>Personal File Drive</div>
        {session.isLoaded && session.isSignedIn ? (
          <div className="flex gap-2">
            <OrganizationSwitcher />
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
