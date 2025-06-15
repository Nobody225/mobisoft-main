import React from "react"
import { Link } from "react-router-dom"
import {
    Flame,
    TrendingDown,
    Clock,
    Star,
    ArrowRight,
    Badge as BadgeIcon,
    MapPin,
    Calendar,
    AlertCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDealsData, dealUtils, type Deal } from "@/hooks/useDealsData"
import { getCountryByCode } from "@/hooks/geolocation/countryData"

export const DealsSection: React.FC = () => {
    // Charger les données des bons plans depuis le fichier JSON
    const { featuredDeals, loading, error } = useDealsData()

    // Fonction pour formater le prix avec la devise appropriée
    const formatPrice = (price: number, currencySymbol: string): string => {
        return dealUtils.formatPrice(price, currencySymbol)
    }

    // Fonction pour calculer le temps restant
    const getTimeLeft = (validUntil: string): string | null => {
        const expiryDate = new Date(validUntil)
        const now = new Date()
        const diffTime = expiryDate.getTime() - now.getTime()

        if (diffTime <= 0) return null

        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        const diffHours = Math.floor(
            (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )

        if (diffDays > 0) {
            return `${diffDays}j ${diffHours}h`
        } else {
            return `${diffHours}h`
        }
    }

    // État de chargement
    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-br from-marineBlue-50/30 via-white to-brandSky/5">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-marineBlue-600 via-brandSky to-marineBlue-400 bg-clip-text text-transparent mb-2 flex items-center">
                                <Flame className="w-8 h-8 text-orange-500 mr-3" />
                                Nos meilleurs bons plans
                            </h2>
                            <p className="text-lg text-gray-600">
                                Chargement des meilleures offres...
                            </p>
                        </div>
                    </div>

                    {/* Skeleton loading */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <Card key={index} className="overflow-hidden">
                                <div className="h-40 bg-gray-200 animate-pulse"></div>
                                <CardContent className="p-4">
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                                        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    // État d'erreur
    if (error) {
        return (
            <section className="py-16 bg-gradient-to-br from-marineBlue-50/30 via-white to-brandSky/5">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Erreur de chargement
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Impossible de charger les bons plans : {error}
                        </p>
                        <Button onClick={() => window.location.reload()}>
                            Réessayer
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-gradient-to-br from-marineBlue-50/30 via-white to-brandSky/5">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-marineBlue-600 via-brandSky to-marineBlue-400 bg-clip-text text-transparent mb-2 flex items-center">
                            <Flame className="w-8 h-8 text-orange-500 mr-3" />
                            Nos meilleurs bons plans
                        </h2>
                        <p className="text-lg text-gray-600">
                            Économisez jusqu'à 50% sur les meilleurs produits et
                            services africains
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="outline"
                        className="hidden md:flex border-marineBlue-600 text-marineBlue-600 hover:bg-marineBlue-600 hover:text-white"
                    >
                        <Link to="/deals">
                            Voir tous les bons plans
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredDeals.map((deal: Deal) => {
                        const country = getCountryByCode(deal.country)
                        const timeLeft = getTimeLeft(deal.validUntil)
                        const isExpiringSoon = dealUtils.isExpiringSoon(
                            deal.validUntil
                        )

                        return (
                            <Card
                                key={deal.id}
                                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="relative">
                                    {/* Image avec fallback */}
                                    <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <div className="text-gray-400 text-sm text-center">
                                            <div className="font-semibold">
                                                {deal.sectorName}
                                            </div>
                                            <div className="text-xs">
                                                {country?.flag_emoji}{" "}
                                                {deal.countryName}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badge principal */}
                                    <div className="absolute top-2 left-2">
                                        <Badge
                                            className={`${dealUtils.getBadgeColor(
                                                deal.discountPercentage ||
                                                    undefined
                                            )} text-white border-0 shadow-sm`}
                                        >
                                            <BadgeIcon className="w-3 h-3 mr-1" />
                                            {deal.badge}
                                        </Badge>
                                    </div>

                                    {/* Pourcentage de réduction */}
                                    {deal.discountPercentage && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-gradient-to-r from-marineBlue-600 to-brandSky text-white px-2 py-1 rounded-full text-sm font-bold flex items-center shadow-sm">
                                                <TrendingDown className="w-3 h-3 mr-1" />
                                                -{deal.discountPercentage}%
                                            </div>
                                        </div>
                                    )}

                                    {/* Temps restant */}
                                    {timeLeft && (
                                        <div
                                            className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs flex items-center ${
                                                isExpiringSoon
                                                    ? "bg-red-600/90 text-white"
                                                    : "bg-black/70 text-white"
                                            }`}
                                        >
                                            <Clock className="w-3 h-3 mr-1" />
                                            {timeLeft}
                                        </div>
                                    )}

                                    {/* Taux d'intérêt pour les produits bancaires */}
                                    {deal.interestRate && (
                                        <div className="absolute bottom-2 right-2 bg-green-600/90 text-white px-2 py-1 rounded text-xs font-bold">
                                            {deal.interestRate}% / an
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    {/* Secteur et pays */}
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            {deal.sectorName}
                                        </Badge>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {deal.countryName}
                                        </div>
                                    </div>

                                    {/* Titre et fournisseur */}
                                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-marineBlue-600 transition-colors line-clamp-2">
                                        {deal.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 mb-3">
                                        {deal.provider}
                                    </p>

                                    {/* Description courte */}
                                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                        {deal.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center mb-3">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium ml-1">
                                                {deal.rating}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500 ml-2">
                                            (
                                            {deal.reviewsCount.toLocaleString()}{" "}
                                            avis)
                                        </span>
                                    </div>

                                    {/* Pricing */}
                                    <div className="space-y-1">
                                        {deal.originalPrice &&
                                            deal.discountedPrice &&
                                            deal.originalPrice >
                                                deal.discountedPrice && (
                                                <div className="text-sm text-gray-500 line-through">
                                                    {formatPrice(
                                                        deal.originalPrice,
                                                        deal.currencySymbol
                                                    )}
                                                </div>
                                            )}

                                        {deal.discountedPrice ? (
                                            <div className="text-lg font-bold text-marineBlue-600">
                                                {formatPrice(
                                                    deal.discountedPrice,
                                                    deal.currencySymbol
                                                )}
                                            </div>
                                        ) : deal.interestRate ? (
                                            <div className="text-lg font-bold text-green-600">
                                                Taux {deal.interestRate}% / an
                                            </div>
                                        ) : (
                                            <div className="text-lg font-bold text-marineBlue-600">
                                                Voir conditions
                                            </div>
                                        )}

                                        {deal.originalPrice &&
                                            deal.discountedPrice &&
                                            deal.originalPrice >
                                                deal.discountedPrice && (
                                                <div className="text-sm text-marineBlue-600 font-medium">
                                                    Économie:{" "}
                                                    {dealUtils.calculateSavings(
                                                        deal.originalPrice,
                                                        deal.discountedPrice,
                                                        deal.currencySymbol
                                                    )}
                                                </div>
                                            )}
                                    </div>

                                    {/* Date d'expiration */}
                                    <div className="flex items-center text-xs text-gray-500 mt-2 mb-3">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        Valide jusqu'au{" "}
                                        {dealUtils.formatExpiryDate(
                                            deal.validUntil
                                        )}
                                    </div>

                                    <Button
                                        asChild
                                        className="w-full mt-2 bg-gradient-to-r from-marineBlue-600 to-brandSky hover:from-marineBlue-700 hover:to-brandSky-dark text-white shadow-sm"
                                        size="sm"
                                    >
                                        <Link to={`/deal/${deal.id}`}>
                                            Voir l'offre
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* CTA mobile */}
                <div className="mt-8 text-center md:hidden">
                    <Button asChild variant="outline" size="lg">
                        <Link to="/deals">
                            Voir tous les bons plans
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>

                {/* Informations sur les économies */}
                <div className="mt-12 bg-gradient-to-r from-marineBlue-50 via-brandSky/10 to-marineBlue-50 rounded-2xl p-8 border border-marineBlue-100">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-marineBlue-600 via-brandSky to-marineBlue-400 bg-clip-text text-transparent mb-4">
                            Pourquoi choisir AfricaHub ?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-marineBlue-600 mb-2">
                                    100%
                                </div>
                                <div className="text-gray-600">
                                    Gratuit et sans engagement
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-brandSky mb-2">
                                    500+
                                </div>
                                <div className="text-gray-600">
                                    Fournisseurs comparés
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-marineBlue-600 mb-2">
                                    25%
                                </div>
                                <div className="text-gray-600">
                                    Économies moyennes
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
