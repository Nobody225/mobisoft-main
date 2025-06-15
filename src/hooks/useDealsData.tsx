import { useState, useEffect } from "react"

// Interface pour un deal/bon plan
export interface Deal {
    id: string
    title: string
    provider: string
    country: string
    countryName: string
    sector: string
    sectorName: string
    originalPrice?: number | null
    discountedPrice?: number | null
    discountPercentage?: number | null
    interestRate?: number
    currency: string
    currencySymbol: string
    description: string
    features: string[]
    validUntil: string
    isLimitedTime: boolean
    badge: string
    rating: number
    reviewsCount: number
    image: string
    providerLogo: string
}

// Interface pour une catégorie
export interface DealCategory {
    id: string
    name: string
    icon: string
    color: string
}

// Interface pour les données complètes
export interface DealsData {
    deals: Deal[]
    featuredDeals: string[]
    categories: DealCategory[]
}

// Interface pour le retour du hook
export interface UseDealsDataReturn {
    deals: Deal[]
    featuredDeals: Deal[]
    categories: DealCategory[]
    loading: boolean
    error: string | null
    refreshDeals: () => void
}

/**
 * Hook personnalisé pour charger et gérer les données des bons plans
 * Charge les données depuis le fichier JSON et fournit des fonctions utilitaires
 */
export const useDealsData = (): UseDealsDataReturn => {
    const [dealsData, setDealsData] = useState<DealsData>({
        deals: [],
        featuredDeals: [],
        categories: []
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fonction pour charger les données
    const loadDealsData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Simulation d'un délai de chargement réaliste
            await new Promise(resolve => setTimeout(resolve, 800))

            // Import dynamique du fichier JSON
            const response = await import("@/data/products.json")
            const data: DealsData = response.default

            // Validation des données
            if (!data.deals || !Array.isArray(data.deals)) {
                throw new Error("Format de données invalide : deals manquants")
            }

            if (!data.categories || !Array.isArray(data.categories)) {
                throw new Error("Format de données invalide : categories manquantes")
            }

            setDealsData(data)
        } catch (err) {
            console.error("Erreur lors du chargement des deals:", err)
            setError(err instanceof Error ? err.message : "Erreur lors du chargement des données")
        } finally {
            setLoading(false)
        }
    }

    // Charger les données au montage du composant
    useEffect(() => {
        loadDealsData()
    }, [])

    // Fonction pour rafraîchir les données
    const refreshDeals = () => {
        loadDealsData()
    }

    // Calculer les deals mis en avant
    const featuredDeals = dealsData.deals.filter(deal => 
        dealsData.featuredDeals.includes(deal.id)
    )

    return {
        deals: dealsData.deals,
        featuredDeals,
        categories: dealsData.categories,
        loading,
        error,
        refreshDeals
    }
}

/**
 * Hook pour filtrer les deals par critères
 */
export const useFilteredDeals = (
    deals: Deal[],
    filters: {
        sector?: string
        country?: string
        maxPrice?: number
        minRating?: number
    } = {}
) => {
    const [filteredDeals, setFilteredDeals] = useState<Deal[]>(deals)

    useEffect(() => {
        let filtered = [...deals]

        // Filtrer par secteur
        if (filters.sector) {
            filtered = filtered.filter(deal => deal.sector === filters.sector)
        }

        // Filtrer par pays
        if (filters.country) {
            filtered = filtered.filter(deal => deal.country === filters.country)
        }

        // Filtrer par prix maximum
        if (filters.maxPrice && filters.maxPrice > 0) {
            filtered = filtered.filter(deal => {
                const price = deal.discountedPrice || deal.originalPrice
                return price ? price <= filters.maxPrice! : true
            })
        }

        // Filtrer par note minimum
        if (filters.minRating && filters.minRating > 0) {
            filtered = filtered.filter(deal => deal.rating >= filters.minRating!)
        }

        setFilteredDeals(filtered)
    }, [deals, filters])

    return filteredDeals
}

/**
 * Fonctions utilitaires pour les deals
 */
export const dealUtils = {
    // Formater le prix avec la devise
    formatPrice: (price: number, currencySymbol: string): string => {
        return `${price.toLocaleString()} ${currencySymbol}`
    },

    // Calculer les économies
    calculateSavings: (originalPrice: number, discountedPrice: number, currencySymbol: string): string => {
        const savings = originalPrice - discountedPrice
        return `${savings.toLocaleString()} ${currencySymbol}`
    },

    // Vérifier si l'offre expire bientôt
    isExpiringSoon: (validUntil: string, daysThreshold: number = 7): boolean => {
        const expiryDate = new Date(validUntil)
        const today = new Date()
        const diffTime = expiryDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= daysThreshold && diffDays > 0
    },

    // Obtenir la couleur du badge selon le pourcentage de réduction
    getBadgeColor: (discountPercentage?: number): string => {
        if (!discountPercentage) return "bg-blue-500"
        if (discountPercentage >= 40) return "bg-red-500"
        if (discountPercentage >= 25) return "bg-orange-500"
        if (discountPercentage >= 15) return "bg-yellow-500"
        return "bg-blue-500"
    },

    // Formater la date d'expiration
    formatExpiryDate: (validUntil: string): string => {
        const date = new Date(validUntil)
        return date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }
}

// Export par défaut
export default useDealsData
