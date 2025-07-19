export const handleCopy = (text: string) => {
  if (!text) return;
  navigator.clipboard.writeText(text).catch(console.error);
};