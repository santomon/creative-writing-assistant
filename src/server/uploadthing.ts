/** server/uploadthing.ts */
import {createUploadthing, type FileRouter} from "uploadthing/next-legacy";
import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "~/server/db";
import middleware from "../../middleware";


const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({image: {maxFileSize: "4MB"}})
    // Set permissions and file types for this FileRoute
    .middleware((req: NextApiRequest, res: NextApiResponse) => {
      // This code runs on your server before upload
      console.log(req.url)

      // If you throw, the user will not be able to upload
      // if (!user || !user.userId) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {userId: "xd"};
    })
    .onUploadComplete(async ({metadata, file}) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      metadata.userId;
      console.log("size", file.size)
      const fileRegister = await prisma.fileRegister.create({
        data: {
          name: file.name,
          size: file.size,
          url: file.url,
          userId: metadata.userId,
        }
      });
      console.log(`successfully uploaded file ${file.name}`)
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;