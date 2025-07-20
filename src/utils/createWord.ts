const handleWord = (text: string) => {
  const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                "xmlns='http://www.w3.org/TR/REC-html40'>" +
                "<head><meta charset='utf-8'></head><body>";
  const footer = "</body></html>";
  const html = header + text + footer;
  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'document.doc';
  link.click();
  URL.revokeObjectURL(url);
};

export default handleWord;
