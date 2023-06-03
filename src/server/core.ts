import { UnstructuredLoader} from "langchain/document_loaders/fs/unstructured";
import {PDFLoader} from "langchain/document_loaders/fs/pdf"
import {DocxLoader} from "langchain/document_loaders/fs/docx";
import {TextLoader} from "langchain/document_loaders/fs/text"

const asDocuments = (files: File[]) => {
  return files.map(async file => {
    if (file.type === "application/pdf") {
      const loader = new PDFLoader(file)
      return await loader.load()
    }
    if (file.name.endsWith(".docx")) {
      const loader = new DocxLoader(file)
      return await loader.load()
    }

    if (file.name.endsWith(".txt")) {
      const loader = new TextLoader(file)
      return await loader.load()
    }
    throw new Error("Unsupported file type")
  })
}

export const asDocuments2 = (files: { url: string }[]) => {
  return files.map(async file => {
      const loader = new UnstructuredLoader(file.url, {
        apiUrl: "https://api.unstructured.io/general/v0/general"
      })
      return await loader.load()
    }
  )
}

const lmao = asDocuments([])