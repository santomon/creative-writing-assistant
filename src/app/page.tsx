"use client"

import {trpc} from "~/trpc";
import { IMSDBLoader } from "langchain/document_loaders/web/imsdb";


const LandingPage = async () => {
  const loader = new IMSDBLoader("https://imsdb.com/scripts/BlacKkKlansman.html");

  const docs = await loader.load();

  const sampleText = docs

  const data = trpc.inference.inferEvents


  return (
    <div className="landing-page">
      <h1>Landing Page</h1>
      {sampleText[0]!.pageContent}
    </div>
  );
};

export default LandingPage;