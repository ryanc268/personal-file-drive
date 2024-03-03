import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileTextIcon,
  GanttChartIcon,
  ImageIcon,
  MoreVertical,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

interface FileCardProps {
  file: Doc<"files">;
}

const FileCardDropdown: React.FC<FileCardProps> = ({ file }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavourite = useMutation(api.files.toggleFavourite);
  const { toast } = useToast();
  return (
    <>
      <AlertDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              file from the directory
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await deleteFile({
                    fileId: file._id,
                  });
                  toast({
                    variant: "default",
                    title: "File Deleted!",
                  });
                } catch (err) {
                  toast({
                    variant: "destructive",
                    title: "Issue Deleting",
                  });
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => window.open(getFileUrl(file.fileId), "_blank")}
          >
            <Download className="w-4 h-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-1 text-yellow-600 items-center cursor-pointer"
            onClick={() =>
              toggleFavourite({
                fileId: file._id,
                isFavourite: !file.isFavourite,
              })
            }
          >
            {file.isFavourite ? (
              <>
                <StarOff className="w-4 h-4" /> UnFavourite
              </>
            ) : (
              <>
                <Star className="w-4 h-4" /> Favourite
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-1 text-red-600 items-center cursor-pointer"
            onClick={() => setIsConfirmationOpen(true)}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardDropdown file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === "image" && (
          <Image
            alt={file.name}
            width="200"
            height="100"
            src={getFileUrl(file.fileId)}
          />
        )}
        {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
        {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="text-xs flex flex-col items-start">
        <h3>Uploaded by: {file.createdByName}</h3>
        <h3>Email: {file.createdByEmail}</h3>
      </CardFooter>
    </Card>
  );
};
export default FileCard;
