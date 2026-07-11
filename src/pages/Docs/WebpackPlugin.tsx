import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode } from '../../styles/docs.chain.ts';

export default function WebpackPlugin() {
  return (
    <>
      <h1 className={contentTitle}>Webpack Plugin</h1>
      <p className={contentDesc}>Use ChainCSS with Webpack, Next.js, or any webpack-based build system.</p>
      <pre className={codeBlock}>{`// next.config.js
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.chain\.ts$/,
      use: 'chaincss/webpack'
    })
    return config
  }
}`}</pre>
    </>
  );
}
