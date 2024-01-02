"use client";
import { Uploader } from "../../utils/uploadthing";
import { useState } from "react";
import Link from "next/link";

interface UploadFileResponse {
    key: string;
    name: string;
    size: number;
    url: string;
    serverData?: any;
}

export default function UploadButtonPage() {
    const [images, setImages] = useState<UploadFileResponse[]>([]);


    const title = images.length > 0
        ? (
            <>
                <p>Upload complete!</p>
                <p className="mt-2">{images.length} files</p>
            </>
        ) : null;

    const imgList = (
        <>
            {title}
            <ul>
                {images.map(image => (
                    <li key={image.key} className="mt-2">
                        <Link href={image.url} className="mt-2" target="_blank">
                            {image.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Uploader
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (!res) return;

                    setImages(res);
                    // Do something with the response
                    console.log(res);
                    // console.log("Files: ", res[0]);
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
            {imgList}
        </main>
    )
}
