/**
 * @format
 * @type {import('next').NextConfig}
 */

export function webpack(
  config,
  { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
) {
  config.resolve.alias.canvas = false;
  config.resolve.alias.encoding = false;

  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ["@svgr/webpack"],
  });
  // Important: return the modified config

  return config;
}
export async function redirects() {
  return [
    {
      source: "/",
      destination: "/landing",
      permanent: true,
    },
  ];
}
