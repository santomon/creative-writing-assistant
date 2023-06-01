import { z } from "zod";
import {createTRPCRouter, privateProcedure, publicProcedure} from "~/server/api/trpc";
import {utapi} from "uploadthing/server"

import { Configuration, OpenAIApi } from "openai";
import {OpenAI} from "langchain/llms/openai"
import {PromptTemplate} from "langchain";

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const model = new OpenAI({ temperature: 0.9,
    modelName: "gpt-3.5-turbo",

})
const eventTemplate = new PromptTemplate({
    template: `   
Prompt:

Please extract the events from my creative text about the world and the story i am currently working on as a list

the output should look like so (JSON Object model)

Output format:
[
  {{
    "id": "string",
    "name": "string",
    "description": "string",
    "begin": float,
    "end": float,
    "timeframe": "string"
    "significance": int  // value between 1 and 100
  }}
]

Example JSON output:
json
[
  {{
    "id": "event_1",
    "name": "The Great War",
    "description": "A devastating war breaks out between two powerful nations, resulting in widespread destruction and loss of life.",
    "begin": 14353,
    "end": 14355,
    "timeframe": "20th century",
    "significance": 90
  }},
  {{
    "id": "event_2",
    "name": "Discovery of a New Continent",
    "description": "Explorers stumble upon an uncharted continent, rich in resources and inhabited by unknown civilizations.",
    "begin": 1587,
    "end": 1590,
    "timeframe": "16th century",
    "significance": 100,
  }}
]

further explanations:
- the time_begin and time_end are arbitrary integer; the only rule here is that if a number is lower than the other, that
means it happened before.

- for the significance, rate the impact of the event with respect to the world. events like large scale wars are considered
significant, characters travelling might be considered less significant.

- the event_id can be left undefined

the text is given in the following inside "\`\`\`"

    \`\`\`{text}\`\`\`
    `,
    inputVariables: ["text"],
})



export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(  async({ input }) => {
        const result = await model.call(await eventTemplate.format({text: input.text}))
      return {
        greeting: `Hello ${input.text}`
      };
    }),

  uploadFiles: privateProcedure
    // definitely dangerous; but dont know how to tell zod that we expect a file
    .input(z.object({ files: z.array(z.instanceof(File))}))
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

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
