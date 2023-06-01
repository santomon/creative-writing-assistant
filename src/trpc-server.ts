import {initTRPC} from '@trpc/server';
import { z } from 'zod';
import {utapi} from "uploadthing/server"
import {privateProcedure, publicProcedure} from "~/server/api/trpc";

const t = initTRPC.create();

// this is our data store, used to respond to incoming RPCs from the client

interface User {
    id: string;
    name: string;
}
const userList: User[] = [
    {
        id: '1',
        name: 'KATT',
    },
    {
        id: '2',
        name: 'Foo',
    },
];

// this is our RPC API
export const appRouter = t.router({
    userById: publicProcedure
        .input(z.number())
        .query((req) => {
            const { input } = req;
            return userList.find((u) => parseInt(u.id) === input);
        }),
    uploadFiles: privateProcedure
      // definitely dangerous; but dont know how to tell zod that we expect a file
      // prob best to ignore this now
      .input(z.object({ files: z.custom<File>().array()}))

      .query(async ({ input }) => {
            if (input.files[0]) {
                const extractedText = await input.files[0].text()
                console.log(extractedText)
                return {
                    files: input.files
                };
            }
            else {
                return {
                    files: []
                }
            }
        }
      ),

    getFiles: privateProcedure
      .input(z.object({userId: z.string()}))
      .query(async ({ ctx, input }) => {
            const fileInfos = await ctx.prisma.fileRegister.findMany({
                where: {userId: input.userId},
                select: {fileKey: true, name: true}
            })
            const fileUrls = (await utapi.getFileUrls(fileInfos.map(key => key.fileKey)))
            const fileInfosWithUrls = fileInfos.map((fileInfo, index) => {
                  return {
                      ...fileInfo,
                      ...fileUrls[index]!  // fuck array zipping lmao
                  }
              }
            )
            return fileInfosWithUrls
        }
      )
    ,
});

export type AppRouter = typeof appRouter;