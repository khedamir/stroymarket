/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/404.html'],
  robotsTxtOptions: {
    policy: [{ userAgent: '*', allow: '/' }],
  },
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
};
