import {
  createUploadthing,
  type FileRouter,
} from "uploadthing/next";

const f =
  createUploadthing();

export const ourFileRouter = {

  challengeAttachment:
    f({
      blob: {
        maxFileSize: "64MB",
      },
      image: {
        maxFileSize: "8MB",
      },
      pdf: {
        maxFileSize: "16MB",
      },
      text: {
        maxFileSize: "4MB",
      },
    })

      .onUploadComplete(
        async ({ file }) => {

          return {
            url: file.url,
            name: file.name,
          };

        }
      ),

} satisfies FileRouter;

export type OurFileRouter =
  typeof ourFileRouter;