/** app/api/uploadthing/core.ts */
import {createUploadthing, type FileRouter} from "uploadthing/next";
import {currentUser} from "@clerk/nextjs";
import {prisma} from "~/server/db";
import {TRPCError} from "@trpc/server";
import {TRPC_ERROR_CODES_BY_NUMBER} from "@trpc/server/rpc";
import {ApiError} from "next/dist/server/api-utils";

const f = createUploadthing();

const auth = (req: Request) => ({id: "fakeId"}); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  textUploader: f({blob: {maxFileSize: "4MB",}})
    // Set permissions and file types for this FileRoute
    .middleware(async (req) => {
      // This code runs on your server before upload
      const user = await currentUser()
      console.log("current User: ", user)

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {userId: user.id};
    })
    .onUploadComplete(async ({metadata, file}) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      await prisma.fileRegister.create({
        data: {
          userId: metadata.userId,
          fileKey: file.key,
          name: file.name,
          size: file.size,
        }
      }).then((res) => {
        console.log(`File register created: ${res}`)
        }
      ).catch((err) => {
        throw new ApiError(500, "Error creating file register")
      }
      )

    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;