"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import UploadButton from "./uploadButton";
import FileCard from "./fileCard";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import SearchBar from "./searchBar";
import { useState } from "react";

interface FileBrowserProps {
  title: string;
  favourites?: boolean;
}

const FileBrowser: React.FC<FileBrowserProps> = ({ title, favourites }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { organization, isLoaded: orgIsLoaded } = useOrganization();

  const orgId = organization?.id;

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, searchTerm, favourites } : "skip"
  );
  return (
    <div>
      {files === undefined && (
        <div className="flex flex-col gap-4 w-full items-center mt-12">
          {orgIsLoaded && !orgId ? (
            <NoOrgState />
          ) : (
            <>
              <Loader2 className="w-24 h-24 animate-spin" />
              <div className="text-2xl">Loading your files...</div>
            </>
          )}
        </div>
      )}
      {files && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <UploadButton />
          </div>
          {files.length === 0 && <NoFilesState />}
          <div className="grid grid-cols-3 gap-4">
            {files?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

function NoFilesState() {
  return (
    <div className="flex flex-col gap-4 w-full items-center mt-12">
      <Image
        alt="Empty folder icon"
        width="300"
        height="300"
        src="/emptyfiles.svg"
      />
      <div className="text-2xl">No files currently uploaded</div>
    </div>
  );
}

function NoOrgState() {
  return (
    <div className="flex flex-col gap-4 w-full items-center mt-12">
      <Image
        alt="Empty folder icon"
        width="300"
        height="300"
        src="/company.svg"
      />
      <div className="text-2xl">
        You must be part of an organization to use the directory
      </div>
    </div>
  );
}

export default FileBrowser;
