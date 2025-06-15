import { useState, useEffect } from "react"

// Interface pour une sous-catégorie
export interface Subcategory {
    id: string
    name: string
    description: string
}

// Interface pour les statistiques d'un secteur
export interface SectorStats {
    providers: number
    avgSavings: string
    reviews: number
    countries: number
}

// Interface pour la croissance d'un secteur
export interface SectorGrowth {
    yearOverYear: string
    trend: "up" | "down" | "stable"
    forecast: "very-strong" | "strong" | "moderate" | "weak"
}

// Interface pour un secteur
export interface Sector {
    id: string
    name: string
    nameEn: string
    description: string
    icon: string
    color: string
    dataFile: string
    stats: SectorStats
    isPopular: boolean
    isTrending: boolean
    subcategories: Subcategory[]
}

// Interface pour les statistiques globales
export interface GlobalStats {
    totalProviders: number
    totalReviews: number
    avgSavings: string
    countriesCovered: number
    sectorsActive: number
    lastUpdated: string
}

// Interface pour les données complètes des secteurs
export interface SectorsData {
    sectors: Sector[]
    globalStats: GlobalStats
    popularSectors: string[]
    trendingSectors: string[]
    featuredSectors: string[]
    countryAvailability: Record<string, string[]>
    sectorGrowth: Record<string, SectorGrowth>
}

// Interface pour le retour du hook
export interface UseSectorsDataReturn {
    sectors: Sector[]
    popularSectors: Sector[]
    trendingSectors: Sector[]
    featuredSectors: Sector[]
    globalStats: GlobalStats
    countryAvailability: Record<string, string[]>
    sectorGrowth: Record<string, SectorGrowth>
    loading: boolean
    error: string | null
    refreshData: () => void
    getSectorById: (id: string) => Sector | undefined
    getSectorsForCountry: (countryCode: string) => Sector[]
}

/**
 * Hook personnalisé pour charger et gérer les données de tous les secteurs
 */
export const useSectorsData = (): UseSectorsDataReturn => {
    const [sectorsData, setSectorsData] = useState<SectorsData>({
        sectors: [],
        globalStats: {
            totalProviders: 0,
            totalReviews: 0,
            avgSavings: "0%",
            countriesCovered: 0,
            sectorsActive: 0,
            lastUpdated: "",
        },
        popularSectors: [],
        trendingSectors: [],
        featuredSectors: [],
        countryAvailability: {},
        sectorGrowth: {},
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fonction pour charger les données
    const loadSectorsData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Simulation d'un délai de chargement
            await new Promise(resolve => setTimeout(resolve, 1200))

            // Import dynamique du fichier JSON
            const response = await import("@/data/sectors.json")
            const data = response.default as SectorsData

            // Validation des données
            if (!data.sectors || !Array.isArray(data.sectors)) {
                throw new Error(
                    "Format de données invalide : secteurs manquants"
                )
            }

            if (!data.globalStats) {
                throw new Error(
                    "Format de données invalide : statistiques globales manquantes"
                )
            }

            setSectorsData(data)
        } catch (err) {
            console.error(
                "Erreur lors du chargement des données des secteurs:",
                err
            )
            setError(
                err instanceof Error
                    ? err.message
                    : "Erreur lors du chargement des données"
            )
        } finally {
            setLoading(false)
        }
    }

    // Charger les données au montage du composant
    useEffect(() => {
        loadSectorsData()
    }, [])

    // Fonction pour rafraîchir les données
    const refreshData = () => {
        loadSectorsData()
    }

    // Fonction pour obtenir un secteur par ID
    const getSectorById = (id: string): Sector | undefined => {
        return sectorsData.sectors.find(sector => sector.id === id)
    }

    // Fonction pour obtenir les secteurs disponibles dans un pays
    const getSectorsForCountry = (countryCode: string): Sector[] => {
        const availableSectorIds =
            sectorsData.countryAvailability[countryCode] || []
        return sectorsData.sectors.filter(sector =>
            availableSectorIds.includes(sector.id)
        )
    }

    // Calculer les secteurs populaires
    const popularSectors = sectorsData.sectors.filter(sector =>
        sectorsData.popularSectors.includes(sector.id)
    )

    // Calculer les secteurs tendance
    const trendingSectors = sectorsData.sectors.filter(sector =>
        sectorsData.trendingSectors.includes(sector.id)
    )

    // Calculer les secteurs mis en avant
    const featuredSectors = sectorsData.sectors.filter(sector =>
        sectorsData.featuredSectors.includes(sector.id)
    )

    return {
        sectors: sectorsData.sectors,
        popularSectors,
        trendingSectors,
        featuredSectors,
        globalStats: sectorsData.globalStats,
        countryAvailability: sectorsData.countryAvailability,
        sectorGrowth: sectorsData.sectorGrowth,
        loading,
        error,
        refreshData,
        getSectorById,
        getSectorsForCountry,
    }
}

/**
 * Hook pour filtrer les secteurs par critères
 */
export const useFilteredSectors = (
    sectors: Sector[],
    filters: {
        isPopular?: boolean
        isTrending?: boolean
        color?: string
        minProviders?: number
        minReviews?: number
        country?: string
    } = {}
) => {
    const [filteredSectors, setFilteredSectors] = useState<Sector[]>(sectors)

    useEffect(() => {
        let filtered = [...sectors]

        // Filtrer par popularité
        if (filters.isPopular !== undefined) {
            filtered = filtered.filter(
                sector => sector.isPopular === filters.isPopular
            )
        }

        // Filtrer par tendance
        if (filters.isTrending !== undefined) {
            filtered = filtered.filter(
                sector => sector.isTrending === filters.isTrending
            )
        }

        // Filtrer par couleur
        if (filters.color) {
            filtered = filtered.filter(sector => sector.color === filters.color)
        }

        // Filtrer par nombre minimum de fournisseurs
        if (filters.minProviders && filters.minProviders > 0) {
            filtered = filtered.filter(
                sector => sector.stats.providers >= filters.minProviders!
            )
        }

        // Filtrer par nombre minimum d'avis
        if (filters.minReviews && filters.minReviews > 0) {
            filtered = filtered.filter(
                sector => sector.stats.reviews >= filters.minReviews!
            )
        }

        setFilteredSectors(filtered)
    }, [sectors, filters])

    return filteredSectors
}

/**
 * Fonctions utilitaires pour les secteurs
 */
export const sectorsUtils = {
    // Obtenir la couleur CSS d'un secteur
    getSectorColorClass: (
        color: string,
        variant: "bg" | "text" | "border" = "bg"
    ): string => {
        const colorMap: Record<string, Record<string, string>> = {
            blue: {
                bg: "bg-blue-500",
                text: "text-blue-500",
                border: "border-blue-500",
            },
            green: {
                bg: "bg-green-500",
                text: "text-green-500",
                border: "border-green-500",
            },
            purple: {
                bg: "bg-purple-500",
                text: "text-purple-500",
                border: "border-purple-500",
            },
            yellow: {
                bg: "bg-yellow-500",
                text: "text-yellow-500",
                border: "border-yellow-500",
            },
            emerald: {
                bg: "bg-emerald-500",
                text: "text-emerald-500",
                border: "border-emerald-500",
            },
            orange: {
                bg: "bg-orange-500",
                text: "text-orange-500",
                border: "border-orange-500",
            },
        }
        return colorMap[color]?.[variant] || `${variant}-gray-500`
    },

    // Formater les statistiques
    formatStats: (stats: SectorStats): string => {
        return `${
            stats.providers
        } fournisseurs • ${stats.reviews.toLocaleString()} avis • ${
            stats.avgSavings
        } d'économies`
    },

    // Obtenir l'icône de tendance
    getTrendIcon: (trend: SectorGrowth["trend"]): string => {
        const icons = {
            up: "trending-up",
            down: "trending-down",
            stable: "minus",
        }
        return icons[trend]
    },

    // Obtenir la couleur de tendance
    getTrendColor: (trend: SectorGrowth["trend"]): string => {
        const colors = {
            up: "text-green-500",
            down: "text-red-500",
            stable: "text-gray-500",
        }
        return colors[trend]
    },

    // Calculer le score de popularité
    calculatePopularityScore: (sector: Sector): number => {
        let score = 0
        score += sector.stats.providers * 0.1
        score += sector.stats.reviews * 0.001
        score += parseInt(sector.stats.avgSavings) * 2
        score += sector.isPopular ? 50 : 0
        score += sector.isTrending ? 30 : 0
        return Math.round(score)
    },

    // Formater la date de dernière mise à jour
    formatLastUpdated: (lastUpdated: string): string => {
        const date = new Date(lastUpdated)
        return date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    },
}

// Export par défaut
export default useSectorsData
