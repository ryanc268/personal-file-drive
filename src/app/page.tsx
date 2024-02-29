"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import UploadButton from "./uploadButton";
import FileCard from "./fileCard";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { organization, isLoaded: orgIsLoaded } = useOrganization();
  const { user, isLoaded: userIsLoaded } = useUser();

  let orgId: string | undefined;
  if (orgIsLoaded && userIsLoaded) orgId = organization?.id ?? user?.id;

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  return (
    <main className="container mx-auto pt-12">
      {files === undefined && (
        <div className="flex flex-col gap-4 w-full items-center mt-12">
          <Loader2 className="w-24 h-24 animate-spin" />
          <div className="text-2xl">Loading your files...</div>
        </div>
      )}
      {files && files.length === 0 && (
        <div className="flex flex-col gap-4 w-full items-center mt-12">
          <Image
            alt="Empty folder icon"
            width="300"
            height="300"
            src="/emptyfiles.svg"
          />
          <div className="text-2xl">No files currently uploaded</div>
          <UploadButton />
        </div>
      )}
      {files && files.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">File Directory</h1>
            <UploadButton />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {files?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </>
      )}
    </main>
  );
}
