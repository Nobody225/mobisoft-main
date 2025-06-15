import { useState, useEffect } from "react"

// Interface pour les statistiques utilisées dans StatsSection
export interface Stats {
    companies: number
    users: number
    comparisons: number
    countries: number
    reviews: number
    satisfaction: number
}

// Interface pour le retour du hook
export interface UseGlobalStatsReturn {
    stats: Stats | null
    loading: boolean
    error: string | null
}

// Hook personnalisé pour récupérer les statistiques globales d'AfricaHub
export const useGlobalStats = (): UseGlobalStatsReturn => {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Simulation d'un appel API pour récupérer les statistiques
        const fetchGlobalStats = async () => {
            try {
                setLoading(true)
                setError(null)
                
                // Simulation d'un délai d'API réaliste
                await new Promise(resolve => setTimeout(resolve, 1500))
                
                // Données simulées pour AfricaHub - à remplacer par un vrai appel API
                const mockStats: Stats = {
                    companies: 15420, // Nombre total d'entreprises référencées
                    users: 89, // En milliers (89K utilisateurs actifs)
                    comparisons: 234, // En milliers (234K comparaisons effectuées)
                    countries: 54, // Nombre de pays africains couverts
                    reviews: 45230, // Nombre total d'avis clients
                    satisfaction: 97, // Taux de satisfaction en pourcentage
                }
                
                setStats(mockStats)
                setLoading(false)
            } catch (error) {
                setError(error instanceof Error ? error.message : "Erreur lors du chargement des statistiques")
                setLoading(false)
            }
        }

        fetchGlobalStats()
    }, [])

    return { stats, loading, error }
}

// Hook pour formater les nombres avec des séparateurs français
export const useFormattedNumber = (number: number): string => {
    return new Intl.NumberFormat('fr-FR').format(number)
}

// Hook pour formater les statistiques avec des suffixes (K, M, etc.)
export const useCompactNumber = (number: number): string => {
    return new Intl.NumberFormat('fr-FR', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(number)
}

// Export par défaut du hook principal
export default useGlobalStats
