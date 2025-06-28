import { Helmet } from 'react-helmet'

export function Seo ({ title, description, keywords, image, url }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {image && <meta property='og:image' content={image} />}
      {url && <meta property='og:url' content={url} />}
      <meta property='og:type' content='website' />
      <meta name='twitter:card' content='summary_large_image' />
    </Helmet>
  )
}
