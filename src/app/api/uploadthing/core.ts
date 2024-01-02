import { createUploadthing, type FileRouter, } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  // Example "profile picture upload" route - these can be named whatever you want!
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 3 } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),

  // This route takes an attached image OR video
  messageAttachment: f(["image", "video"])
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),

  // Takes ONE image up to 2MB
  strictImageAttachment: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),

  // Takes a 4 2mb images and/or 1 256mb video
  mediaPost: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;