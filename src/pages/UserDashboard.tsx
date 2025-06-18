import React, { useState } from "react"
import {
    Home,
    BarChart3,
    Grid3X3,
    PlayCircle,
    Percent,
    MessageSquare,
    Shield,
    Search,
    Bell,
    User,
    Heart,
    ShoppingCart,
    Star,
    TrendingUp,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const UserDashboard: React.FC = () => {
    const [userName, setUserName] = useState("Utilisateur"); // État pour le nom de l'utilisateur

    // Données mockées pour les produits populaires
    const popularProducts = [
        {
            id: 1,
            name: "Assurance Auto Premium",
            provider: "Allianz",
            price: "45 000",
            currency: "FCFA",
            rating: 4.8,
            reviews: 1245,
            image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyJTIwaW5zdXJhbmNlfGVufDB8fDB8fHww",
            trending: true,
            popular: true,
        },
        {
            id: 2,
            name: "Forfait Mobile 4G+",
            provider: "Orange",
            price: "25 000",
            currency: "FCFA",
            rating: 4.5,
            reviews: 892,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D",
            trending: true,
        },
        {
            id: 3,
            name: "Compte Bancaire Premium",
            provider: "UBA",
            price: "0",
            currency: "FCFA",
            rating: 4.7,
            reviews: 567,
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D",
            popular: true,
        },
    ]

    // Données mockées pour les catégories
    const categories = [
        {
            name: "Assurances",
            icon: Shield,
            count: 45,
            href: "/secteur/insurance",
        },
        {
            name: "Télécoms",
            icon: PlayCircle,
            count: 28,
            href: "/secteur/telecom",
        },
        {
            name: "Banques",
            icon: TrendingUp,
            count: 32,
            href: "/secteur/banking",
        },
        {
            name: "Énergie",
            icon: Percent,
            count: 18,
            href: "/secteur/energy",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-marineBlue-50/30 to-brandSky/5">
            {/* Barre de navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <img
                                src="/logo.png"
                                alt="AfricaHub"
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="search"
                                    placeholder="Rechercher un produit ou service..."
                                    className="pl-10 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon">
                                <Bell className="w-5 h-5 text-white" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Heart className="w-5 h-5 text-white" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="w-5 h-5 text-white" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <User className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Section Hero */}
            <section className="relative py-12 bg-gradient-to-br from-marineBlue-600 via-brandSky to-marineBlue-500">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xl font-bold text-white drop-shadow-lg mb-2">Bienvenue, {userName} !</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">
                            Bienvenue sur votre espace personnel
                        </h1>
                        <p className="text-lg font-semibold text-white/90 drop-shadow-lg mb-8">
                            Gérez vos produits, suivez vos comparaisons et profitez des meilleures offres
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-afroGold text-white hover:bg-afroGold-light hover:text-marineBlue-600"
                            >
                                Comparer des produits
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-white border-white hover:bg-white/10"
                            >
                                Voir mes favoris
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Statistiques */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-marineBlue-100 flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-marineBlue-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">12</div>
                                        <div className="text-sm text-gray-600">Favoris</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-brandSky/10 flex items-center justify-center">
                                        <ShoppingCart className="w-6 h-6 text-brandSky" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">3</div>
                                        <div className="text-sm text-gray-600">Comparaisons</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                        <Star className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">8</div>
                                        <div className="text-sm text-gray-600">Avis laissés</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">15%</div>
                                        <div className="text-sm text-gray-600">Économies moy.</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Section Produits Populaires */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Produits populaires
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {popularProducts.map(product => (
                            <Card
                                key={product.id}
                                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                            >
                                <CardContent className="p-6">
                                    <div className="relative mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            {product.trending && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-orange-50 text-orange-600 border-orange-200"
                                                >
                                                    🔥 Tendance
                                                </Badge>
                                            )}
                                            {product.popular && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-brandSky/10 text-brandSky border-brandSky/20"
                                                >
                                                    ⭐ Populaire
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {product.provider}
                                    </p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <span className="text-2xl font-bold text-marineBlue-600">
                                                {product.price} {product.currency}
                                            </span>
                                            <span className="text-sm text-gray-500 ml-2">
                                                /mois
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                            <span className="text-sm font-medium">
                                                {product.rating}
                                            </span>
                                            <span className="text-sm text-gray-500 ml-1">
                                                ({product.reviews})
                                            </span>
                                        </div>
                                    </div>
                                    <Button className="w-full">Comparer</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Catégories */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Parcourir par catégorie
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {categories.map(category => (
                            <Card
                                key={category.name}
                                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-xl bg-marineBlue-100 flex items-center justify-center group-hover:bg-marineBlue-200 transition-colors">
                                            <category.icon className="w-6 h-6 text-marineBlue-600" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-semibold text-gray-900">
                                                {category.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {category.count} produits
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UserDashboard