/**
 * Export de toutes les pages publiques d'AfricaHub
 * 
 * Organisation des vues publiques :
 * - Pages principales (About, Contact)
 * - Pages légales (Terms, Privacy)
 * - Navigation et exploration (Sectors, Categories)
 * - Produits et comparaison (Products, ProductDetail)
 * - Sociétés et partenaires (Companies, CompanyDetail)
 * - Guides et ressources (Guides, GuideDetail, FAQ)
 * - Demandes et devis (QuoteRequest, QuoteConfirmation)
 */

// Pages principales
export { default as AboutPage } from './AboutPage'
export { default as ContactPage } from './ContactPage'

// Pages légales
export { default as TermsPage } from './legal/TermsPage'
export { default as PrivacyPage } from './legal/PrivacyPage'

// Navigation et exploration
export { default as SectorsPage } from './SectorsPage'
export { default as SectorDetailPage } from './SectorDetailPage'
export { default as CategoriesPage } from './CategoriesPage'
export { default as CategoryDetailPage } from './CategoryDetailPage'

// Produits et comparaison
export { default as ProductsPage } from './ProductsPage'
export { default as ProductDetailPage } from './ProductDetailPage'

// Sociétés et partenaires
export { default as CompaniesPage } from './CompaniesPage'
export { default as CompanyDetailPage } from './CompanyDetailPage'

// Guides et ressources
export { default as GuidesPage } from './GuidesPage'
export { default as GuideDetailPage } from './GuideDetailPage'
export { default as FAQPage } from './FAQPage'

// Demandes et devis
export { default as QuoteRequestPage } from './quote/QuoteRequestPage'
export { default as QuoteConfirmationPage } from './quote/QuoteConfirmationPage'

/**
 * Routes publiques correspondantes :
 * 
 * Pages principales :
 * - /about → AboutPage
 * - /contact → ContactPage
 * 
 * Pages légales :
 * - /legal/terms → TermsPage
 * - /legal/privacy → PrivacyPage
 * 
 * Navigation et exploration :
 * - /sectors → SectorsPage
 * - /sectors/[sector] → SectorDetailPage
 * - /categories → CategoriesPage
 * - /categories/[category] → CategoryDetailPage
 * 
 * Produits et comparaison :
 * - /products → ProductsPage
 * - /products/[id] → ProductDetailPage
 * 
 * Sociétés et partenaires :
 * - /companies → CompaniesPage
 * - /companies/[id] → CompanyDetailPage
 * 
 * Guides et ressources :
 * - /guides → GuidesPage
 * - /guides/[slug] → GuideDetailPage
 * - /faq → FAQPage
 * 
 * Demandes et devis :
 * - /quote/request → QuoteRequestPage
 * - /quote/confirmation → QuoteConfirmationPage
 */
