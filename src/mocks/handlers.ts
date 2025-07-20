import { http, HttpResponse } from 'msw';
import { persianText, englishText, archiveData } from './mockData';

const deletedRequestIds: number[] = [];

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
    const limit = parseInt(url.searchParams.get("limit") ?? "10");
    const offset = parseInt(url.searchParams.get("offset") ?? "0");
    const all = archiveData.results.filter(item => !deletedRequestIds.includes(item.id));
    const totalCount = all.length;
    const pageSlice = all.slice(offset, offset + limit);
    const icons = ['mic', 'upload', 'chain'];
    const results = pageSlice.map(item => ({
      ...item,
      icon: icons[Math.floor(Math.random() * icons.length)]
    }));
    const nextOffset = offset + limit;
    const hasNext = nextOffset < totalCount;
    const prevOffset = Math.max(offset - limit, 0);
    const hasPrev = offset > 0;
    return HttpResponse.json({
      count:    totalCount,
      next:     hasNext ? `limit=${limit}&offset=${nextOffset}` : null,
      previous: hasPrev ? `limit=${limit}&offset=${prevOffset}` : null,
      results,
    });
  }),

  http.delete(`${import.meta.env.VITE_MOCK_URL}/requests/:id/`, async ({ request }) => {
    const url = new URL(request.url);
    const segments = url.pathname.split('/').filter(Boolean);
    const idStr = segments[segments.length - 1];
    const id = parseInt(idStr, 10);
    if (!deletedRequestIds.includes(id)) {
      deletedRequestIds.push(id);
    }
    return HttpResponse.text('', { status: 204 });
  }),
];
