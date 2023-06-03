import {initTRPC} from "@trpc/server";
import {privateProcedure} from "~/server/api/trpc";
import {z} from "zod";
import {utapi} from "uploadthing/server";

import * as core from "~/server/core"
import {asDocuments2} from "~/server/core";
import {UnstructuredLoader} from "langchain/document_loaders/fs/unstructured";

const t = initTRPC.create()

export const inferenceRouter = t.router({
    inferEvents: privateProcedure
      .input(z.object({url: z.string()}).array())
      .query(async ({ctx, input}) => {

          const nestedEvents = asDocuments2(input).map(async doc => {
            await doc.then(
              async _doc => {
                const events = (_doc)
                return events
              }
            ).catch(
              err => {
                console.log(err)
              }
            )
          })
        }
      ),
    inferEventsSimple: privateProcedure
      .input(z.object({url: z.string()}))
      .query(async ({ctx, input}) => {
        const loader = new UnstructuredLoader(input.url, {
          apiUrl: "https://api.unstructured.io/general/v0/general"
        }
        )
        const docs = await loader.load()

        const response = "xd"

      }),
  }
)