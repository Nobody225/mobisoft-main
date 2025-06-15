import { useState, useEffect } from "react"

// Types pour les langues supportées
export type Language = "fr" | "en"

// Interface pour les traductions
interface Translations {
    [key: string]: {
        [lang in Language]: string
    }
}

// Dictionnaire de traductions pour le header
const translations: Translations = {
    // Navigation principale
    "header.logo.subtitle": {
        fr: "Comparateur africain",
        en: "African Comparator",
    },
    "header.search.placeholder": {
        fr: "Rechercher des produits, services ou entreprises...",
        en: "Search for products, services or companies...",
    },

    // Menu secteurs
    "header.sectors": {
        fr: "Secteurs",
        en: "Sectors",
    },
    "header.sectors.popular": {
        fr: "Secteurs populaires",
        en: "Popular Sectors",
    },
    "header.sectors.all": {
        fr: "Tous les secteurs",
        en: "All Sectors",
    },
    "header.sectors.viewAll": {
        fr: "Voir tous les secteurs",
        en: "View All Sectors",
    },

    // Navigation
    "header.nav.home": {
        fr: "Accueil",
        en: "Home",
    },
    "header.nav.products": {
        fr: "Produits",
        en: "Products",
    },
    "header.nav.guides": {
        fr: "Guides",
        en: "Guides",
    },
    "header.nav.deals": {
        fr: "Bons plans",
        en: "Deals",
    },
    "header.nav.compare": {
        fr: "Comparer",
        en: "Compare",
    },

    // Authentification
    "header.auth.login": {
        fr: "Connexion",
        en: "Login",
    },
    "header.auth.register": {
        fr: "S'inscrire",
        en: "Sign Up",
    },
    "header.auth.profile": {
        fr: "Profil",
        en: "Profile",
    },
    "header.auth.logout": {
        fr: "Déconnexion",
        en: "Logout",
    },
    "header.auth.settings": {
        fr: "Paramètres",
        en: "Settings",
    },

    // Pays
    "header.country.cotedivoire": {
        fr: "Côte d'Ivoire",
        en: "Ivory Coast",
    },

    // Menu mobile
    "header.mobile.menu": {
        fr: "Menu",
        en: "Menu",
    },
    "header.mobile.close": {
        fr: "Fermer",
        en: "Close",
    },
    "header.nav.language": {
        fr: "Langue",
        en: "Language",
    },
    "header.nav.current": {
        fr: "Actuel",
        en: "Current",
    },

    // Secteurs spécifiques
    "sector.assurances": {
        fr: "Assurances",
        en: "Insurance",
    },
    "sector.assurances.desc": {
        fr: "Auto, habitation, santé, vie",
        en: "Auto, home, health, life",
    },
    "sector.banques": {
        fr: "Banques",
        en: "Banks",
    },
    "sector.banques.desc": {
        fr: "Comptes, crédits, épargne",
        en: "Accounts, loans, savings",
    },
    "sector.telecoms": {
        fr: "Télécoms",
        en: "Telecoms",
    },
    "sector.telecoms.desc": {
        fr: "Mobile, internet, fixe",
        en: "Mobile, internet, landline",
    },
    "sector.energie": {
        fr: "Énergie",
        en: "Energy",
    },
    "sector.energie.desc": {
        fr: "Électricité, gaz, renouvelable",
        en: "Electricity, gas, renewable",
    },
    "sector.transport": {
        fr: "Transport",
        en: "Transport",
    },
    "sector.transport.desc": {
        fr: "Véhicules, carburant, location",
        en: "Vehicles, fuel, rental",
    },
    "sector.immobilier": {
        fr: "Immobilier",
        en: "Real Estate",
    },
    "sector.immobilier.desc": {
        fr: "Achat, location, investissement",
        en: "Purchase, rental, investment",
    },
    "sector.education": {
        fr: "Éducation",
        en: "Education",
    },
    "sector.education.desc": {
        fr: "Formations, écoles, universités",
        en: "Training, schools, universities",
    },
    "sector.sante": {
        fr: "Santé",
        en: "Health",
    },
    "sector.sante.desc": {
        fr: "Cliniques, pharmacies, soins",
        en: "Clinics, pharmacies, care",
    },
    "sector.voyages": {
        fr: "Voyages",
        en: "Travel",
    },
    "sector.voyages.desc": {
        fr: "Vols, hôtels, séjours",
        en: "Flights, hotels, stays",
    },
    "sector.commerce": {
        fr: "Commerce",
        en: "Commerce",
    },
    "sector.commerce.desc": {
        fr: "Boutiques, marchés, e-commerce",
        en: "Shops, markets, e-commerce",
    },
    "sector.entreprises": {
        fr: "Entreprises",
        en: "Business",
    },
    "sector.entreprises.desc": {
        fr: "Services B2B, consulting",
        en: "B2B services, consulting",
    },
}

/**
 * Hook personnalisé pour la gestion des traductions
 * Permet de changer de langue et de récupérer les traductions
 */
export const useTranslation = () => {
    // État de la langue actuelle (par défaut français)
    const [currentLanguage, setCurrentLanguage] = useState<Language>("fr")

    // Charger la langue depuis le localStorage au montage du composant
    useEffect(() => {
        const savedLanguage = localStorage.getItem(
            "africahub-language"
        ) as Language
        if (savedLanguage && ["fr", "en"].includes(savedLanguage)) {
            setCurrentLanguage(savedLanguage)
        }
    }, [])

    // Fonction pour changer de langue
    const changeLanguage = (lang: Language) => {
        setCurrentLanguage(lang)
        localStorage.setItem("africahub-language", lang)
    }

    // Fonction pour récupérer une traduction
    const t = (key: string): string => {
        const translation = translations[key]
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`)
            return key // Retourne la clé si la traduction n'existe pas
        }
        return translation[currentLanguage] || translation.fr || key
    }

    return {
        currentLanguage,
        changeLanguage,
        t,
    }
}
