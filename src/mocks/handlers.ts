import { http, HttpResponse } from 'msw';
import { persianText } from './mockData';

export const handlers = [
  http.post(`${import.meta.env.VITE_MOCK_URL}/transcribe_files/`, async ({ request }) => {
    const body = await request.json() as { media_urls: string[] };
    const mediaUrls = body.media_urls;
    if (!Array.isArray(mediaUrls) || mediaUrls.length === 0) {
      return HttpResponse.json({ error: 'No media URL provided' }, { status: 400 });
    }
    const resText = persianText.map((pText, idx) => ({
      ...pText,
      media_url: mediaUrls[idx],
    }));
    return HttpResponse.json(resText);
  }),
];
