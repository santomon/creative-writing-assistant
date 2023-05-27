import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import {OpenAI} from "langchain/llms/openai"
import {PromptTemplate} from "langchain";
import ignore from "ignore";

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const model = new OpenAI({ temperature: 0.9,
    modelName: "gpt-3.5-turbo",

})
const prompt = new PromptTemplate({
    template: "This is a {test} prompt",
    inputVariables: ["test"],
})



export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query( async ({ input }) => {
        const result = model.call(await prompt.format({test: input.text}))
      return {
        greeting: `Hello ${input.text}`
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
