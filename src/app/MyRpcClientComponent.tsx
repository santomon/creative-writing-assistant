'use client';

import {trpc} from "~/trpc";
import {UploadButton} from "@uploadthing/react"
import {OurFileRouter} from "~/app/api/uploadthing/core";

// a Client Component that makes an RPC and displays the result

export default function MyRpcClientComponent(): JSX.Element {
    const name = trpc.userById.useQuery(1)

    if (name.data == undefined) {
        console.log('name.data undefined')
        return (<p>did not work</p>)
    }
    console.log(`result.data is ${JSON.stringify(name.data)}`)

    return (
      <>
          <p>
              Hello, {name.data.name}, greetings from client component land!
          </p>
          <UploadButton<OurFileRouter>
            endpoint="textUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
            }}
          />
      </>
    )
}
