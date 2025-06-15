import { useState, useEffect } from "react"

// Interface pour le contenu configurable de la section Hero
export interface HeroContent {
    title: string
    subtitle: string
    description: string
    primaryButtonText: string
    secondaryButtonText: string
    features: string[]
    backgroundImage?: string
    videoUrl?: string
}

// Interface pour le retour du hook principal
export interface UseConfigurableContentReturn {
    getContent: (key: string, defaultValue: string) => string
    loading: boolean
    error: string | null
}

// Hook personnalisé pour récupérer le contenu configurable
export const useConfigurableContent = (): UseConfigurableContentReturn => {
    const [contentMap, setContentMap] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Simulation d'un appel API pour récupérer le contenu configurable
        const fetchConfigurableContent = async () => {
            try {
                setLoading(true)
                setError(null)

                // Simulation d'un délai d'API
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Contenu configurable par défaut pour AfricaHub - à remplacer par un vrai appel API
                const mockContentMap: Record<string, string> = {
                    // Platform
                    "platform.tagline":
                        "Votre comparateur africain de confiance",

                    // Hero Section
                    "hero.main_title":
                        "Comparez et trouvez les meilleurs services en Afrique",
                    "hero.subtitle":
                        "Notre plateforme intelligente vous aide à comparer les offres d'assurance, banques, télécoms et bien plus, adaptées à votre profil et à votre pays.",

                    // Buttons
                    "button.compare": "Comparer maintenant",
                    "button.quote": "Obtenir un devis",

                    // Features
                    "features.african_optimization": "Optimisé pour l'Afrique",
                    "features.african_optimization_desc":
                        "Solutions adaptées aux marchés africains",
                    "features.smart_comparison": "Comparaison intelligente",
                    "features.smart_comparison_desc":
                        "Algorithmes avancés de matching",
                    "features.ai_assistant": "Assistant IA",
                    "features.ai_assistant_desc":
                        "Conseils personnalisés par IA",

                    // About
                    "about.title": "À Propos d'AfricaHub",
                    "about.description":
                        "La plateforme de comparaison de référence en Afrique",

                    // Services
                    "services.title": "Nos Services",
                    "services.description":
                        "Une gamme complète de comparaisons",
                }

                setContentMap(mockContentMap)
                setLoading(false)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Erreur lors du chargement du contenu"
                )
                setLoading(false)
            }
        }

        fetchConfigurableContent()
    }, [])

    // Fonction pour récupérer le contenu avec une valeur par défaut
    const getContent = (key: string, defaultValue: string): string => {
        return contentMap[key] || defaultValue
    }

    return { getContent, loading, error }
}

// Hook pour récupérer le contenu spécifique d'une section
export const useSectionContent = (sectionName: string) => {
    const [sectionContent, setSectionContent] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSectionContent = async () => {
            try {
                setLoading(true)
                setError(null)

                // Simulation d'un appel API pour une section spécifique
                await new Promise(resolve => setTimeout(resolve, 800))

                // Contenu par défaut selon la section
                let mockContent: any = {}

                switch (sectionName) {
                    case "about":
                        mockContent = {
                            title: "À Propos d'AfricaHub",
                            description:
                                "La plateforme de comparaison de référence en Afrique",
                            content:
                                "AfricaHub est né de la vision de démocratiser l'accès à l'information sur les services en Afrique...",
                        }
                        break
                    case "services":
                        mockContent = {
                            title: "Nos Services",
                            description: "Une gamme complète de comparaisons",
                            services: [
                                {
                                    name: "Assurances",
                                    icon: "shield",
                                    count: 2500,
                                },
                                {
                                    name: "Banques",
                                    icon: "building",
                                    count: 1800,
                                },
                                { name: "Télécoms", icon: "phone", count: 450 },
                                { name: "Énergie", icon: "zap", count: 320 },
                            ],
                        }
                        break
                    default:
                        mockContent = {
                            title: `Contenu ${sectionName}`,
                            description: `Description pour la section ${sectionName}`,
                        }
                }

                setSectionContent(mockContent)
                setLoading(false)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Erreur lors du chargement"
                )
                setLoading(false)
            }
        }

        fetchSectionContent()
    }, [sectionName])

    return { content: sectionContent, loading, error }
}

// Hook pour mettre à jour le contenu configurable (pour l'admin)
export const useUpdateConfigurableContent = () => {
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState<string | null>(null)

    const updateContent = async (sectionName: string, newContent: any) => {
        try {
            setUpdating(true)
            setUpdateError(null)

            // Simulation d'un appel API pour mettre à jour le contenu
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Ici, on ferait un vrai appel API pour sauvegarder
            console.log(
                `Mise à jour du contenu pour ${sectionName}:`,
                newContent
            )

            setUpdating(false)
            return { success: true, message: "Contenu mis à jour avec succès" }
        } catch (error) {
            setUpdateError(
                error instanceof Error
                    ? error.message
                    : "Erreur lors de la mise à jour"
            )
            setUpdating(false)
            return { success: false, message: "Erreur lors de la mise à jour" }
        }
    }

    return { updateContent, updating, updateError }
}

// Export par défaut du hook principal
export default useConfigurableContent
