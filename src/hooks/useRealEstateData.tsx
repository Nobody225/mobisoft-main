import { useState, useEffect } from "react"

// Interface pour une propriété immobilière
export interface Property {
    id: string
    title: string
    provider: string
    country: string
    countryName: string
    city: string
    district: string
    type: string
    typeName: string
    transactionType: string
    transactionTypeName: string
    price: number
    pricePerSqm: number
    currency: string
    currencySymbol: string
    surface: number
    landSize: number | null
    rooms: number
    bathrooms: number
    parking: number
    description: string
    features: string[]
    amenities: string[]
    rating: number
    reviewsCount: number
    images: string[]
    providerLogo: string
    isVerified: boolean
    isFeatured: boolean
    availableFrom: string
    energyClass: string
    yearBuilt: number
}

// Interface pour un type de propriété
export interface PropertyType {
    id: string
    name: string
    icon: string
    description: string
}

// Interface pour un type de transaction
export interface TransactionType {
    id: string
    name: string
    icon: string
    description: string
}

// Interface pour les données complètes
export interface RealEstateData {
    sector: {
        id: string
        name: string
        description: string
        icon: string
        color: string
    }
    properties: Property[]
    propertyTypes: PropertyType[]
    transactionTypes: TransactionType[]
    featuredProperties: string[]
}

// Interface pour le retour du hook
export interface UseRealEstateDataReturn {
    properties: Property[]
    featuredProperties: Property[]
    propertyTypes: PropertyType[]
    transactionTypes: TransactionType[]
    sector: RealEstateData['sector']
    loading: boolean
    error: string | null
    refreshData: () => void
}

/**
 * Hook personnalisé pour charger et gérer les données immobilières
 */
export const useRealEstateData = (): UseRealEstateDataReturn => {
    const [realEstateData, setRealEstateData] = useState<RealEstateData>({
        sector: { id: '', name: '', description: '', icon: '', color: '' },
        properties: [],
        propertyTypes: [],
        transactionTypes: [],
        featuredProperties: []
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fonction pour charger les données
    const loadRealEstateData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Simulation d'un délai de chargement
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Import dynamique du fichier JSON
            const response = await import("@/data/real-estate.json")
            const data: RealEstateData = response.default

            // Validation des données
            if (!data.properties || !Array.isArray(data.properties)) {
                throw new Error("Format de données invalide : propriétés manquantes")
            }

            setRealEstateData(data)
        } catch (err) {
            console.error("Erreur lors du chargement des données immobilières:", err)
            setError(err instanceof Error ? err.message : "Erreur lors du chargement des données")
        } finally {
            setLoading(false)
        }
    }

    // Charger les données au montage du composant
    useEffect(() => {
        loadRealEstateData()
    }, [])

    // Fonction pour rafraîchir les données
    const refreshData = () => {
        loadRealEstateData()
    }

    // Calculer les propriétés mises en avant
    const featuredProperties = realEstateData.properties.filter(property => 
        realEstateData.featuredProperties.includes(property.id)
    )

    return {
        properties: realEstateData.properties,
        featuredProperties,
        propertyTypes: realEstateData.propertyTypes,
        transactionTypes: realEstateData.transactionTypes,
        sector: realEstateData.sector,
        loading,
        error,
        refreshData
    }
}

/**
 * Hook pour filtrer les propriétés par critères
 */
export const useFilteredProperties = (
    properties: Property[],
    filters: {
        type?: string
        transactionType?: string
        city?: string
        minPrice?: number
        maxPrice?: number
        minRooms?: number
        maxRooms?: number
        minSurface?: number
        maxSurface?: number
    } = {}
) => {
    const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties)

    useEffect(() => {
        let filtered = [...properties]

        // Filtrer par type de propriété
        if (filters.type) {
            filtered = filtered.filter(property => property.type === filters.type)
        }

        // Filtrer par type de transaction
        if (filters.transactionType) {
            filtered = filtered.filter(property => property.transactionType === filters.transactionType)
        }

        // Filtrer par ville
        if (filters.city) {
            filtered = filtered.filter(property => 
                property.city.toLowerCase().includes(filters.city!.toLowerCase())
            )
        }

        // Filtrer par prix minimum
        if (filters.minPrice && filters.minPrice > 0) {
            filtered = filtered.filter(property => property.price >= filters.minPrice!)
        }

        // Filtrer par prix maximum
        if (filters.maxPrice && filters.maxPrice > 0) {
            filtered = filtered.filter(property => property.price <= filters.maxPrice!)
        }

        // Filtrer par nombre de chambres minimum
        if (filters.minRooms && filters.minRooms > 0) {
            filtered = filtered.filter(property => property.rooms >= filters.minRooms!)
        }

        // Filtrer par nombre de chambres maximum
        if (filters.maxRooms && filters.maxRooms > 0) {
            filtered = filtered.filter(property => property.rooms <= filters.maxRooms!)
        }

        // Filtrer par surface minimum
        if (filters.minSurface && filters.minSurface > 0) {
            filtered = filtered.filter(property => property.surface >= filters.minSurface!)
        }

        // Filtrer par surface maximum
        if (filters.maxSurface && filters.maxSurface > 0) {
            filtered = filtered.filter(property => property.surface <= filters.maxSurface!)
        }

        setFilteredProperties(filtered)
    }, [properties, filters])

    return filteredProperties
}

/**
 * Fonctions utilitaires pour l'immobilier
 */
export const realEstateUtils = {
    // Formater le prix avec la devise
    formatPrice: (price: number, currencySymbol: string): string => {
        return `${price.toLocaleString()} ${currencySymbol}`
    },

    // Formater le prix par m²
    formatPricePerSqm: (pricePerSqm: number, currencySymbol: string): string => {
        return `${pricePerSqm.toLocaleString()} ${currencySymbol}/m²`
    },

    // Calculer le rendement locatif (pour les investissements)
    calculateYield: (monthlyRent: number, purchasePrice: number): number => {
        const annualRent = monthlyRent * 12
        return (annualRent / purchasePrice) * 100
    },

    // Formater la surface
    formatSurface: (surface: number): string => {
        return `${surface} m²`
    },

    // Obtenir la couleur selon le type de propriété
    getPropertyTypeColor: (type: string): string => {
        const colors: Record<string, string> = {
            villa: "bg-emerald-500",
            apartment: "bg-blue-500",
            duplex: "bg-purple-500",
            house: "bg-green-500",
            riad: "bg-orange-500",
            penthouse: "bg-yellow-500"
        }
        return colors[type] || "bg-gray-500"
    },

    // Obtenir l'icône selon le type de transaction
    getTransactionIcon: (transactionType: string): string => {
        return transactionType === "sale" ? "tag" : "key"
    },

    // Formater la date de disponibilité
    formatAvailableDate: (availableFrom: string): string => {
        const date = new Date(availableFrom)
        return date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    },

    // Vérifier si la propriété est disponible bientôt
    isAvailableSoon: (availableFrom: string, daysThreshold: number = 30): boolean => {
        const availableDate = new Date(availableFrom)
        const today = new Date()
        const diffTime = availableDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= daysThreshold && diffDays >= 0
    }
}

// Export par défaut
export default useRealEstateData
