import { http, HttpResponse } from 'msw';
import { persianText, englishText, archiveData } from './mockData';

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

  http.get(`${import.meta.env.VITE_MOCK_URL}/requests/`, async ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") ?? "8");
    const offset = parseInt(url.searchParams.get("offset") ?? "0");
    const results = archiveData["results"];
    const totalCount = results.length;
    const icons = ["mic", "upload", "chain"];
    const paginatedResults = results
      .slice(offset, offset + limit)
      .map((item, idx) => ({
        ...item,
        icon: icons[(offset + idx) % icons.length],
      }));
    const nextOffset = offset + limit;
    const hasNext = nextOffset < totalCount;
    const nextUrl = hasNext ? `limit=${limit}&offset=${nextOffset}` : null;
    const prevOffset = Math.max(offset - limit, 0);
    const hasPrev = offset > 0;
    const prevUrl = hasPrev? `limit=${limit}&offset=${prevOffset}` : null;
    return HttpResponse.json({
      count: totalCount,
      next: nextUrl,
      previous: prevUrl,
      results: paginatedResults,
    });
  }),
];
