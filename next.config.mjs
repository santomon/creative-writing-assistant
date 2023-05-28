/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
            process.env.NODE_ENV === "development"
                ? "http://127.0.0.1:8000/api/:path*"
                : "/api/",
      },
    ];
  },

};
export default config;
