import { useState, useEffect } from "react";
import * as Bytescale from "@bytescale/sdk";

const uploadManager = new Bytescale.UploadManager({
  apiKey: import.meta.env.VITE_BYTESCALE_API_KEY
});

export function useBytescaleUploader(file: Blob | null) {
  const [uploading, setUploading] = useState(false);
  const [errorUploading, setErrorUploading] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const uploadFile = async () => {
      try {
        setUploading(true);
        const { fileUrl } = await uploadManager.upload({ data: file });
        setFileUrl(fileUrl);
      } catch (e: any) {
        setErrorUploading(e.message || "An error occurred");
      } finally {
        setUploading(false);
      }
    };
    uploadFile();
  }, [file]);

  return { uploading, errorUploading, fileUrl };
}
