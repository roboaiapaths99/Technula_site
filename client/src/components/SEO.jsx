import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO component for per-page meta tags, Open Graph, and JSON-LD Schema.
 *
 * @param {string}  title        – Page title (appended with " | Technula")
 * @param {string}  description  – Meta description (max ~160 chars recommended)
 * @param {string}  keywords     – Comma-separated keyword string
 * @param {string}  canonical    – Canonical URL path (e.g. "/saas")
 * @param {string}  ogImage      – Open Graph image URL
 * @param {object}  schema       – Optional JSON-LD schema object
 */
export default function SEO({
  title = 'Technula | Enterprise SaaS Solutions & STEM Robotics Education',
  description = 'Technula — leading enterprise SaaS company in Delhi NCR offering School ERP, CRM, HRMS, Hospital Management, and STEM Robotics Education for K-12 schools across North India.',
  keywords = 'Technula, SaaS company Delhi NCR, School ERP software, CRM software India, HRMS software Faridabad, STEM robotics kits, enterprise software North India',
  canonical = '',
  ogImage = 'https://technula.com/img/og-default.png',
  schema = null,
}) {
  const siteUrl = 'https://technula.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullTitle = title.includes('Technula') ? title : `${title} | Technula`;

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />

      {/* Geo Tags for Delhi NCR / North India local SEO */}
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Faridabad, Haryana" />
      <meta name="geo.position" content="28.3670;77.3178" />
      <meta name="ICBM" content="28.3670, 77.3178" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Technula" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
