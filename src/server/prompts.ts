import {PromptTemplate,} from "langchain";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  AIMessagePromptTemplate

} from "langchain/prompts";

const eventInferenceTemplate = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate("" +
    "" +
    "" +
    "", ),
  HumanMessagePromptTemplate.fromTemplate("",),
])

const prompt = await eventInferenceTemplate.format({

})

