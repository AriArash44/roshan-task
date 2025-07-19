import { http, HttpResponse } from 'msw';
import { persianText, englishText } from './mockData';

export const handlers = [
  http.post(`${import.meta.env.VITE_MOCK_URL}/transcribe_files/`, async ({ request }) => {
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang')?.toLowerCase() || 'fa';
    const body = await request.json() as { media_urls: string[] };
    const mediaUrls = body.media_urls;
    if (!Array.isArray(mediaUrls) || mediaUrls.length === 0) {
      return HttpResponse.json({ error: 'No media URL provided' }, { status: 400 });
    }
    const sourceData = lang === 'en' ? englishText : persianText
    const resText = sourceData.map((pText, idx) => ({
      ...pText,
      media_url: mediaUrls[idx],
    }));
    return HttpResponse.json(resText);
  }),
];
