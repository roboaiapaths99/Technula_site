/**
 * JSON-LD Schema generators for Technula's local SEO and enterprise identity.
 * Used by the SEO component on key pages.
 */

// ── Core Organization Schema ──────────────────────────────────────
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Technula',
  legalName: 'Technula Private Limited',
  url: 'https://technula.com',
  logo: 'https://technula.com/img/technula_logo.jpg',
  description:
    'Technula is a leading enterprise SaaS and STEM education company based in Delhi NCR, India. We build School ERP, CRM, HRMS, Hospital Management software and deliver robotics & AI education programs for K-12 schools.',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'S20, Amolik Sankalp, Sector 85',
    addressLocality: 'Faridabad',
    addressRegion: 'Haryana',
    postalCode: '121002',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.367,
    longitude: 77.3178,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-9990911093',
      contactType: 'sales',
      areaServed: ['IN'],
      availableLanguage: ['English', 'Hindi'],
    },
    {
      '@type': 'ContactPoint',
      email: 'info@technula.com',
      contactType: 'customer support',
    },
  ],
  sameAs: [
    'https://www.facebook.com/Technulasolution9',
    'https://www.instagram.com/technulasolution/',
    'https://www.linkedin.com/company/agpk1/',
  ],
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 28.6139,
      longitude: 77.209,
    },
    geoRadius: '200000', // 200 km covers Delhi NCR + North India
  },
};

// ── Local Business Schema (for Google Maps / Local 3-Pack) ────────
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://technula.com/#localbusiness',
  name: 'Technula - Enterprise SaaS & STEM Robotics',
  image: 'https://technula.com/favicon.svg',
  url: 'https://technula.com',
  telephone: '+91-9990911093',
  email: 'info@technula.com',
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'S20, Amolik Sankalp, Sector 85',
    addressLocality: 'Faridabad',
    addressRegion: 'Haryana',
    postalCode: '121002',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.367,
    longitude: 77.3178,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '120',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Enterprise Software & STEM Education',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'SchoolOS ERP',
          applicationCategory: 'BusinessApplication',
          description: 'Complete school management ERP with admissions, fee management, attendance, and parent portal for K-12 schools in Delhi NCR and North India.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'LogDay HRMS',
          applicationCategory: 'BusinessApplication',
          description: 'Field & office HRMS with GPS attendance, payroll automation, and leave management for enterprises in Delhi, Gurgaon, Noida, and Faridabad.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'HIMS Hospital Management',
          applicationCategory: 'BusinessApplication',
          description: 'Hospital Information Management System for clinics and hospitals in North India.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'StockMaster E-Commerce ERP',
          applicationCategory: 'BusinessApplication',
          description: 'Inventory and e-commerce management platform for SMEs and retailers across India.',
        },
      },
    ],
  },
  areaServed: [
    { '@type': 'City', name: 'Faridabad' },
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'City', name: 'Gurgaon' },
    { '@type': 'City', name: 'Noida' },
    { '@type': 'City', name: 'Greater Noida' },
    { '@type': 'City', name: 'Ghaziabad' },
    { '@type': 'City', name: 'Chandigarh' },
    { '@type': 'City', name: 'Lucknow' },
    { '@type': 'City', name: 'Jaipur' },
    { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
    { '@type': 'AdministrativeArea', name: 'North India' },
  ],
};

// ── Website Schema (for sitelinks search box) ─────────────────────
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Technula',
  url: 'https://technula.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://technula.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

// ── SaaS Product Page Schema ──────────────────────────────────────
export const saasPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Enterprise SaaS Software Solutions - Technula',
  description:
    'Explore Technula\'s enterprise SaaS suite: SchoolOS ERP, LogDay HRMS, HIMS Hospital Management, StockMaster E-Commerce, FitOS Gym SaaS, and 360° Digital Marketing services. Serving Delhi NCR, Faridabad, Gurgaon, Noida, and all of North India.',
  url: 'https://technula.com/saas',
  isPartOf: { '@type': 'WebSite', url: 'https://technula.com' },
  about: {
    '@type': 'Thing',
    name: 'Enterprise Software as a Service (SaaS)',
  },
};

// ── Academy / Education Schema ────────────────────────────────────
export const academySchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Technula STEM Academy',
  url: 'https://technula.com/academy',
  description:
    'Hands-on STEM Robotics and AI coding education for K-12 school students in Delhi NCR. DIY robotics kits, Arduino projects, and structured coding courses for schools in Faridabad, Gurgaon, Noida, and North India.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'S20, Amolik Sankalp, Sector 85',
    addressLocality: 'Faridabad',
    addressRegion: 'Haryana',
    postalCode: '121002',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'City', name: 'Faridabad' },
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'City', name: 'Gurgaon' },
    { '@type': 'City', name: 'Noida' },
    { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
  ],
};

// ── FAQ Schema Generator ──────────────────────────────────────────
export function generateFAQSchema(faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q || item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a || item.answer,
      },
    })),
  };
}

// ── Breadcrumb Schema Generator ───────────────────────────────────
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `https://technula.com${item.url}` : undefined,
    })),
  };
}
