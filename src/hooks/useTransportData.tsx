import { useState, useEffect } from "react"

// Interface pour un véhicule
export interface Vehicle {
    id: string
    title: string
    provider: string
    country: string
    countryName: string
    city: string
    type: string
    typeName: string
    category: string
    categoryName: string
    transactionType: string
    transactionTypeName: string
    price: number
    currency: string
    currencySymbol: string
    brand: string
    model: string
    year: number
    mileage: number
    fuelType: string
    fuelTypeName: string
    transmission: string
    transmissionName: string
    engineSize: string
    doors: number
    seats: number
    color: string
    description: string
    features: string[]
    equipment: string[]
    rating: number
    reviewsCount: number
    images: string[]
    providerLogo: string
    isVerified: boolean
    isFeatured: boolean
    availableFrom: string
    warranty: string
    financing: boolean
    exchange: boolean
}

// Interface pour un type de véhicule
export interface VehicleType {
    id: string
    name: string
    icon: string
    description: string
}

// Interface pour une catégorie
export interface VehicleCategory {
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
export interface TransportData {
    sector: {
        id: string
        name: string
        description: string
        icon: string
        color: string
    }
    vehicles: Vehicle[]
    vehicleTypes: VehicleType[]
    categories: VehicleCategory[]
    transactionTypes: TransactionType[]
    featuredVehicles: string[]
}

// Interface pour le retour du hook
export interface UseTransportDataReturn {
    vehicles: Vehicle[]
    featuredVehicles: Vehicle[]
    vehicleTypes: VehicleType[]
    categories: VehicleCategory[]
    transactionTypes: TransactionType[]
    sector: TransportData['sector']
    loading: boolean
    error: string | null
    refreshData: () => void
}

/**
 * Hook personnalisé pour charger et gérer les données de transport
 */
export const useTransportData = (): UseTransportDataReturn => {
    const [transportData, setTransportData] = useState<TransportData>({
        sector: { id: '', name: '', description: '', icon: '', color: '' },
        vehicles: [],
        vehicleTypes: [],
        categories: [],
        transactionTypes: [],
        featuredVehicles: []
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fonction pour charger les données
    const loadTransportData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Simulation d'un délai de chargement
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Import dynamique du fichier JSON
            const response = await import("@/data/transport.json")
            const data: TransportData = response.default

            // Validation des données
            if (!data.vehicles || !Array.isArray(data.vehicles)) {
                throw new Error("Format de données invalide : véhicules manquants")
            }

            setTransportData(data)
        } catch (err) {
            console.error("Erreur lors du chargement des données de transport:", err)
            setError(err instanceof Error ? err.message : "Erreur lors du chargement des données")
        } finally {
            setLoading(false)
        }
    }

    // Charger les données au montage du composant
    useEffect(() => {
        loadTransportData()
    }, [])

    // Fonction pour rafraîchir les données
    const refreshData = () => {
        loadTransportData()
    }

    // Calculer les véhicules mis en avant
    const featuredVehicles = transportData.vehicles.filter(vehicle => 
        transportData.featuredVehicles.includes(vehicle.id)
    )

    return {
        vehicles: transportData.vehicles,
        featuredVehicles,
        vehicleTypes: transportData.vehicleTypes,
        categories: transportData.categories,
        transactionTypes: transportData.transactionTypes,
        sector: transportData.sector,
        loading,
        error,
        refreshData
    }
}

/**
 * Hook pour filtrer les véhicules par critères
 */
export const useFilteredVehicles = (
    vehicles: Vehicle[],
    filters: {
        type?: string
        category?: string
        transactionType?: string
        brand?: string
        minPrice?: number
        maxPrice?: number
        minYear?: number
        maxYear?: number
        maxMileage?: number
        fuelType?: string
        transmission?: string
    } = {}
) => {
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles)

    useEffect(() => {
        let filtered = [...vehicles]

        // Filtrer par type de véhicule
        if (filters.type) {
            filtered = filtered.filter(vehicle => vehicle.type === filters.type)
        }

        // Filtrer par catégorie
        if (filters.category) {
            filtered = filtered.filter(vehicle => vehicle.category === filters.category)
        }

        // Filtrer par type de transaction
        if (filters.transactionType) {
            filtered = filtered.filter(vehicle => vehicle.transactionType === filters.transactionType)
        }

        // Filtrer par marque
        if (filters.brand) {
            filtered = filtered.filter(vehicle => 
                vehicle.brand.toLowerCase().includes(filters.brand!.toLowerCase())
            )
        }

        // Filtrer par prix minimum
        if (filters.minPrice && filters.minPrice > 0) {
            filtered = filtered.filter(vehicle => vehicle.price >= filters.minPrice!)
        }

        // Filtrer par prix maximum
        if (filters.maxPrice && filters.maxPrice > 0) {
            filtered = filtered.filter(vehicle => vehicle.price <= filters.maxPrice!)
        }

        // Filtrer par année minimum
        if (filters.minYear && filters.minYear > 0) {
            filtered = filtered.filter(vehicle => vehicle.year >= filters.minYear!)
        }

        // Filtrer par année maximum
        if (filters.maxYear && filters.maxYear > 0) {
            filtered = filtered.filter(vehicle => vehicle.year <= filters.maxYear!)
        }

        // Filtrer par kilométrage maximum
        if (filters.maxMileage && filters.maxMileage > 0) {
            filtered = filtered.filter(vehicle => vehicle.mileage <= filters.maxMileage!)
        }

        // Filtrer par type de carburant
        if (filters.fuelType) {
            filtered = filtered.filter(vehicle => vehicle.fuelType === filters.fuelType)
        }

        // Filtrer par transmission
        if (filters.transmission) {
            filtered = filtered.filter(vehicle => vehicle.transmission === filters.transmission)
        }

        setFilteredVehicles(filtered)
    }, [vehicles, filters])

    return filteredVehicles
}

/**
 * Fonctions utilitaires pour le transport
 */
export const transportUtils = {
    // Formater le prix avec la devise
    formatPrice: (price: number, currencySymbol: string): string => {
        return `${price.toLocaleString()} ${currencySymbol}`
    },

    // Formater le kilométrage
    formatMileage: (mileage: number): string => {
        return `${mileage.toLocaleString()} km`
    },

    // Calculer l'âge du véhicule
    calculateAge: (year: number): number => {
        return new Date().getFullYear() - year
    },

    // Obtenir la couleur selon la catégorie
    getCategoryColor: (category: string): string => {
        const colors: Record<string, string> = {
            sedan: "bg-blue-500",
            suv: "bg-green-500",
            luxury: "bg-purple-500",
            sport: "bg-red-500",
            "luxury-suv": "bg-indigo-500"
        }
        return colors[category] || "bg-gray-500"
    },

    // Obtenir l'icône selon le type de carburant
    getFuelIcon: (fuelType: string): string => {
        const icons: Record<string, string> = {
            essence: "fuel",
            diesel: "fuel",
            electric: "zap",
            hybrid: "leaf"
        }
        return icons[fuelType] || "fuel"
    },

    // Évaluer l'état du véhicule selon le kilométrage et l'âge
    evaluateCondition: (mileage: number, year: number): string => {
        const age = new Date().getFullYear() - year
        const avgMileagePerYear = mileage / age

        if (age <= 2 && mileage <= 30000) return "Excellent"
        if (age <= 5 && avgMileagePerYear <= 15000) return "Très bon"
        if (age <= 8 && avgMileagePerYear <= 20000) return "Bon"
        if (age <= 12 && avgMileagePerYear <= 25000) return "Correct"
        return "À vérifier"
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

    // Vérifier si le véhicule est disponible bientôt
    isAvailableSoon: (availableFrom: string, daysThreshold: number = 7): boolean => {
        const availableDate = new Date(availableFrom)
        const today = new Date()
        const diffTime = availableDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= daysThreshold && diffDays >= 0
    },

    // Calculer le coût mensuel approximatif (pour les achats avec financement)
    calculateMonthlyPayment: (price: number, downPayment: number, interestRate: number, months: number): number => {
        const loanAmount = price - downPayment
        const monthlyRate = interestRate / 100 / 12
        const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                       (Math.pow(1 + monthlyRate, months) - 1)
        return Math.round(payment)
    }
}

// Export par défaut
export default useTransportData
