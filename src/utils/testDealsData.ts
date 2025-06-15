/**
 * Utilitaire de test pour vérifier les données des bons plans
 * Ce fichier peut être utilisé pour tester le chargement des données
 */

import { Deal, DealCategory } from "@/hooks/useDealsData"

// Fonction pour valider la structure d'un deal
export const validateDeal = (deal: Deal): boolean => {
    const requiredFields = [
        'id', 'title', 'provider', 'country', 'countryName', 
        'sector', 'sectorName', 'currency', 'currencySymbol',
        'description', 'features', 'validUntil', 'badge',
        'rating', 'reviewsCount', 'image', 'providerLogo'
    ]

    for (const field of requiredFields) {
        if (!(field in deal) || deal[field as keyof Deal] === undefined) {
            console.error(`Champ manquant dans le deal ${deal.id}: ${field}`)
            return false
        }
    }

    // Validation des types
    if (typeof deal.rating !== 'number' || deal.rating < 0 || deal.rating > 5) {
        console.error(`Rating invalide pour le deal ${deal.id}: ${deal.rating}`)
        return false
    }

    if (typeof deal.reviewsCount !== 'number' || deal.reviewsCount < 0) {
        console.error(`Nombre d'avis invalide pour le deal ${deal.id}: ${deal.reviewsCount}`)
        return false
    }

    // Validation des prix
    if (deal.originalPrice !== null && deal.originalPrice !== undefined) {
        if (typeof deal.originalPrice !== 'number' || deal.originalPrice < 0) {
            console.error(`Prix original invalide pour le deal ${deal.id}: ${deal.originalPrice}`)
            return false
        }
    }

    if (deal.discountedPrice !== null && deal.discountedPrice !== undefined) {
        if (typeof deal.discountedPrice !== 'number' || deal.discountedPrice < 0) {
            console.error(`Prix réduit invalide pour le deal ${deal.id}: ${deal.discountedPrice}`)
            return false
        }
    }

    // Validation de la date d'expiration
    const expiryDate = new Date(deal.validUntil)
    if (isNaN(expiryDate.getTime())) {
        console.error(`Date d'expiration invalide pour le deal ${deal.id}: ${deal.validUntil}`)
        return false
    }

    return true
}

// Fonction pour valider une catégorie
export const validateCategory = (category: DealCategory): boolean => {
    const requiredFields = ['id', 'name', 'icon', 'color']

    for (const field of requiredFields) {
        if (!(field in category) || category[field as keyof DealCategory] === undefined) {
            console.error(`Champ manquant dans la catégorie ${category.id}: ${field}`)
            return false
        }
    }

    return true
}

// Fonction pour tester toutes les données
export const testDealsData = async (): Promise<boolean> => {
    try {
        console.log("🧪 Test des données des bons plans...")

        // Import des données
        const data = await import("@/data/products.json")
        const { deals, categories, featuredDeals } = data.default

        // Test de la structure générale
        if (!Array.isArray(deals)) {
            console.error("❌ Les deals ne sont pas un tableau")
            return false
        }

        if (!Array.isArray(categories)) {
            console.error("❌ Les catégories ne sont pas un tableau")
            return false
        }

        if (!Array.isArray(featuredDeals)) {
            console.error("❌ Les deals mis en avant ne sont pas un tableau")
            return false
        }

        console.log(`📊 ${deals.length} deals trouvés`)
        console.log(`📂 ${categories.length} catégories trouvées`)
        console.log(`⭐ ${featuredDeals.length} deals mis en avant`)

        // Validation de chaque deal
        let validDeals = 0
        for (const deal of deals) {
            if (validateDeal(deal)) {
                validDeals++
            }
        }

        console.log(`✅ ${validDeals}/${deals.length} deals valides`)

        // Validation de chaque catégorie
        let validCategories = 0
        for (const category of categories) {
            if (validateCategory(category)) {
                validCategories++
            }
        }

        console.log(`✅ ${validCategories}/${categories.length} catégories valides`)

        // Validation des deals mis en avant
        const invalidFeaturedDeals = featuredDeals.filter(
            (dealId: string) => !deals.find((deal: Deal) => deal.id === dealId)
        )

        if (invalidFeaturedDeals.length > 0) {
            console.error(`❌ Deals mis en avant introuvables: ${invalidFeaturedDeals.join(', ')}`)
            return false
        }

        console.log("✅ Tous les deals mis en avant sont valides")

        // Test des pays et devises
        const countries = [...new Set(deals.map((deal: Deal) => deal.country))]
        const currencies = [...new Set(deals.map((deal: Deal) => deal.currency))]
        const sectors = [...new Set(deals.map((deal: Deal) => deal.sector))]

        console.log(`🌍 ${countries.length} pays: ${countries.join(', ')}`)
        console.log(`💰 ${currencies.length} devises: ${currencies.join(', ')}`)
        console.log(`🏢 ${sectors.length} secteurs: ${sectors.join(', ')}`)

        // Test des dates d'expiration
        const now = new Date()
        const expiredDeals = deals.filter((deal: Deal) => new Date(deal.validUntil) < now)
        const expiringSoonDeals = deals.filter((deal: Deal) => {
            const expiryDate = new Date(deal.validUntil)
            const diffTime = expiryDate.getTime() - now.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays <= 7 && diffDays > 0
        })

        if (expiredDeals.length > 0) {
            console.warn(`⚠️ ${expiredDeals.length} deals expirés trouvés`)
        }

        if (expiringSoonDeals.length > 0) {
            console.warn(`⏰ ${expiringSoonDeals.length} deals expirent bientôt`)
        }

        console.log("🎉 Test des données terminé avec succès !")
        return true

    } catch (error) {
        console.error("❌ Erreur lors du test des données:", error)
        return false
    }
}

// Fonction pour afficher un résumé des deals
export const displayDealsStats = (deals: Deal[]): void => {
    console.log("\n📈 Statistiques des bons plans:")
    
    // Répartition par secteur
    const sectorStats = deals.reduce((acc, deal) => {
        acc[deal.sector] = (acc[deal.sector] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    console.log("🏢 Par secteur:")
    Object.entries(sectorStats).forEach(([sector, count]) => {
        console.log(`  - ${sector}: ${count} deals`)
    })

    // Répartition par pays
    const countryStats = deals.reduce((acc, deal) => {
        acc[deal.countryName] = (acc[deal.countryName] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    console.log("🌍 Par pays:")
    Object.entries(countryStats).forEach(([country, count]) => {
        console.log(`  - ${country}: ${count} deals`)
    })

    // Statistiques de prix
    const dealsWithDiscount = deals.filter(deal => deal.discountPercentage)
    const avgDiscount = dealsWithDiscount.reduce((sum, deal) => sum + (deal.discountPercentage || 0), 0) / dealsWithDiscount.length

    console.log(`💰 Réductions moyennes: ${avgDiscount.toFixed(1)}%`)

    // Statistiques de rating
    const avgRating = deals.reduce((sum, deal) => sum + deal.rating, 0) / deals.length
    console.log(`⭐ Note moyenne: ${avgRating.toFixed(1)}/5`)
}

// Export par défaut
export default testDealsData
