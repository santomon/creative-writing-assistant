// import React, {useState, useCallback, useEffect} from 'react';
// import {UploadButton} from "@uploadthing/react"
// import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';
// import { Textarea } from "@material-tailwind/react";
// import {Input} from "@mui/base";
// import {className} from "postcss-selector-parser";
// import {OurFileRouter} from "~/server/uploadthing";
// import {api} from "~/utils/api";
//
//     <div className="w-96">
//     </div>
// const MainColumn: React.FC = () => {
//     const [text, setText] = useState<string>('');
//     const [files, setFiles] = useState<File[]>([]);
//
//     const uploadedSuccesfully = api.example.uploadFiles.useQuery({files: files})
//
//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
//     }, []);
//
//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
//
//
//     useEffect(() => {
//         console.log(files)
//     }, [files])
//
//     const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
//
//     return (
//         <div className="p-4">
//             <Input slotProps={
//                 {input : {className: "bg-amber-500 h-20 w-20"},
//                     root: {className: ""}
//                 }
//             }>
//
//             </Input>
//             <Textarea label="Message" className="bg-amber-500" />
//
//             <div {...getRootProps()} className="mt-4 p-4 border border-gray-300 rounded shadow cursor-pointer">
//                 <input {...getInputProps()} />
//                 {
//                     isDragActive ?
//                       <p>Drop the files here...</p> :
//                       <p>Drag n drop some files here, or click to select files</p>
//                 }
//             </div>
//
//             <ul>
//                 {files.map((file, i) => (
//                     <li key={i}>{file.name}</li>
//                 ))}
//             </ul>
//           <UploadButton<OurFileRouter>
//             endpoint="textUploader"
//             onClientUploadComplete={(res) => {
//               // Do something with the response
//               console.log("Files: ", res);
//               alert("Upload Completed");
//             }}
//             onUploadError={(error: Error) => {
//               // Do something with the error.
//               alert(`ERROR! ${error.message}`);
//             }}
//           />
//         </div>
//     );
// }
//
// export default MainColumn;
