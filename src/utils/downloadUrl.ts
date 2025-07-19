export async function handleDownload(fileUrl: string) {
  if (!fileUrl) return;

  try {
    const res = await fetch(fileUrl, { mode: "cors" });
    if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const rawName = fileUrl.split("/").pop()?.split("?")[0] || "audio";
    const baseName = rawName.replace(/\.[^/.]+$/, "");
    const downloadName = `${baseName}.mp3`;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
  }
}
