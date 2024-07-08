// app/robots.ts


export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://your-website-url.com/sitemap.xml",
  };
}
