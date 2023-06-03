/* file where we will execute some of the langchains and see how they work;
*  similiar to a unit test, but more of a playground
* */

import { IMSDBLoader } from "langchain/document_loaders/web/imsdb";

const loader = new IMSDBLoader("https://imsdb.com/scripts/BlacKkKlansman.html");

const docs = await loader.load();