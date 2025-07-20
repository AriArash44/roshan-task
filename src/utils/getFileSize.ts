async function getFileSize(url: string): Promise<string | null> {
  let sizeInMB: string | null = null;
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = response.headers.get('Content-Length');
    if (contentLength) {
      sizeInMB = (parseInt(contentLength) / (1024 * 1024)).toFixed(2);
    }
  } catch (error) {
    console.log(error);
  }
  return sizeInMB;
}

export default getFileSize;
