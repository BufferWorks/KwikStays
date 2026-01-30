export async function GET() {
  const content = `
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /account/
Disallow: /checkout/
Disallow: /booking/
Disallow: /auth/
Disallow: /api/

Disallow: /search
Disallow: /*?

Sitemap: https://kwikstays.in/sitemap.xml
`.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
