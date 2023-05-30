import React, {useState, useCallback, useEffect} from 'react';
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';
import { Textarea } from "@material-tailwind/react";
import {Input} from "@mui/base";
import {className} from "postcss-selector-parser";

    <div className="w-96">
    </div>
const MainContent: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    useEffect(() => {
        console.log(files)
    }, [files])

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);

    return (
        <div className="p-4">
            <Input slotProps={
                {input : {className: "bg-amber-500 h-20 w-20"},
                    root: {className: ""}
                }
            }>

            </Input>
            <Textarea label="Message" className="bg-amber-500" />

            <div {...getRootProps()} className="mt-4 p-4 border border-gray-300 rounded shadow cursor-pointer">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                      <p>Drop the files here...</p> :
                      <p>Drag n drop some files here, or click to select files</p>
                }
            </div>

            <ul>
                {files.map((file, i) => (
                    <li key={i}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MainContent;
