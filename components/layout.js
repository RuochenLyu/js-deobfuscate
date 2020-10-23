import NextHead from 'next/head';

export default function Layout({
  children,
  title = 'JS Deobfuscate',
  description = 'JavaScript Deobfuscator and Unpacker',
  url = 'https://jsdeo.now.sh',
  image = 'https://jsdeo.now.sh/card.png',
}) {
  return (
    <>
      <NextHead>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" sizes="192x192" href="/touch-icon.png" />
        <link rel="apple-touch-icon" href="/touch-icon.png" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:site" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="referrer" content="no-referrer" />
      </NextHead>

      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          max-width: 1280px;
          margin: 20px auto;
          width: 90%;
        }
      `}</style>
    </>
  );
}