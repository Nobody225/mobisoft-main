import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    Filter,
    ChevronDown,
    ChevronUp,
    Star,
    Shield,
    Clock,
    TrendingUp,
    Users,
    Building2,
    Factory,
    Home,
    Car,
    Zap,
    Sun,
    Droplets,
    Phone,
    ShoppingBag,
    Heart,
    Plane,
    GraduationCap,
    Building,
    Check,
    X,
    Info,
    ArrowRight,
    Sparkles,
    Award,
    ThumbsUp,
    Globe,
    Menu,
    User,
    Bell,
    Settings,
    LogOut,
    UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";

// Types pour les produits
interface Product {
    id: string;
    name: string;
    provider: string;
    price: number;
    rating: number;
    features: string[];
    description: string;
    category: string;
    image?: string;
    isPopular?: boolean;
    isBestValue?: boolean;
    savings?: number;
    reviews: number;
    contractLength?: string;
    cancellationFee?: number;
}

interface Country {
    code: string;
    name: string;
}

const africanCountries: Country[] = [
    { code: "DZ", name: "Algérie" },
    { code: "AO", name: "Angola" },
    { code: "BJ", name: "Bénin" },
    { code: "BW", name: "Botswana" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "CM", name: "Cameroun" },
    { code: "CV", name: "Cap-Vert" },
    { code: "CF", name: "République centrafricaine" },
    { code: "TD", name: "Tchad" },
    { code: "KM", name: "Comores" },
    { code: "CG", name: "Congo" },
    { code: "CD", name: "République démocratique du Congo" },
    { code: "CI", name: "Côte d'Ivoire" },
    { code: "DJ", name: "Djibouti" },
    { code: "EG", name: "Égypte" },
    { code: "GQ", name: "Guinée équatoriale" },
    { code: "ER", name: "Érythrée" },
    { code: "ET", name: "Éthiopie" },
    { code: "GA", name: "Gabon" },
    { code: "GM", name: "Gambie" },
    { code: "GH", name: "Ghana" },
    { code: "GN", name: "Guinée" },
    { code: "GW", name: "Guinée-Bissau" },
    { code: "KE", name: "Kenya" },
    { code: "LS", name: "Lesotho" },
    { code: "LR", name: "Libéria" },
    { code: "LY", name: "Libye" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malawi" },
    { code: "ML", name: "Mali" },
    { code: "MR", name: "Mauritanie" },
    { code: "MU", name: "Maurice" },
    { code: "MA", name: "Maroc" },
    { code: "MZ", name: "Mozambique" },
    { code: "NA", name: "Namibie" },
    { code: "NE", name: "Niger" },
    { code: "NG", name: "Nigeria" },
    { code: "RW", name: "Rwanda" },
    { code: "ST", name: "Sao Tomé-et-Principe" },
    { code: "SN", name: "Sénégal" },
    { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SO", name: "Somalie" },
    { code: "ZA", name: "Afrique du Sud" },
    { code: "SS", name: "Soudan du Sud" },
    { code: "SD", name: "Soudan" },
    { code: "SZ", name: "Eswatini" },
    { code: "TZ", name: "Tanzanie" },
    { code: "TG", name: "Togo" },
    { code: "TN", name: "Tunisie" },
    { code: "UG", name: "Ouganda" },
    { code: "ZM", name: "Zambie" },
    { code: "ZW", name: "Zimbabwe" }
];

// Données de démonstration améliorées
const demoProducts: Product[] = [
    {
        id: "1",
        name: "Offre Électricité Premium",
        provider: "EDF Afrique",
        price: 89.99,
        rating: 4.5,
        features: [
            "100% énergie verte",
            "Service client 24/7",
            "Facturation en ligne",
            "Prix fixe pendant 12 mois",
            "Pas de frais de mise en service"
        ],
        description: "Offre d'électricité 100% renouvelable avec un excellent service client.",
        category: "energy",
        isPopular: true,
        savings: 15,
        reviews: 1245,
        contractLength: "12 mois",
        cancellationFee: 0
    },
    {
        id: "2",
        name: "Forfait Mobile Illimité",
        provider: "Orange Afrique",
        price: 29.99,
        rating: 4.2,
        features: [
            "Internet illimité",
            "Appels illimités",
            "SMS illimités",
            "5G incluse",
            "Roaming en Afrique"
        ],
        description: "Forfait mobile complet avec données illimitées.",
        category: "telecom",
        isBestValue: true,
        savings: 10,
        reviews: 892,
        contractLength: "24 mois",
        cancellationFee: 50
    },
    {
        id: "3",
        name: "Pack Énergie Solaire",
        provider: "Solar Africa",
        price: 149.99,
        rating: 4.8,
        features: [
            "Panneaux solaires haute performance",
            "Installation incluse",
            "Garantie 25 ans",
            "Batterie de stockage",
            "Suivi en temps réel"
        ],
        description: "Solution complète d'énergie solaire pour votre maison.",
        category: "energy",
        isPopular: true,
        savings: 30,
        reviews: 567,
        contractLength: "Aucun engagement",
        cancellationFee: 0
    }
];

const ComparisonPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("price");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
    const { user, isAuthenticated, logout } = useAuth();
    const { t, currentLanguage, changeLanguage } = useTranslation();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Icônes pour les catégories
    const categoryIcons = {
        energy: <Zap className="w-5 h-5" />,
        telecom: <Phone className="w-5 h-5" />,
        retail: <ShoppingBag className="w-5 h-5" />,
        health: <Heart className="w-5 h-5" />,
        travel: <Plane className="w-5 h-5" />,
        education: <GraduationCap className="w-5 h-5" />,
        business: <Building className="w-5 h-5" />,
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-marineBlue-50 to-white">
            {/* Header Standard */}
            <header className="bg-marineBlue-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-marineBlue-600 to-marineBlue-700 p-2 rounded-lg">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="text-xl font-bold">AfricaHub</span>
                                <p className="text-xs text-white/80">Votre comparateur africain</p>
                            </div>
                        </Link>

                        {/* Navigation principale */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="text-white/80 hover:text-white transition-colors">
                                Accueil
                            </Link>
                            <Link to="/sectors" className="text-white/80 hover:text-white transition-colors">
                                Secteurs
                            </Link>
                            <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                                À propos
                            </Link>
                            <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                                Contact
                            </Link>
                        </nav>

                        {/* Actions utilisateur */}
                        <div className="flex items-center space-x-4">
                            {/* Sélecteur de pays */}
                            <Select defaultValue="CI">
                                <SelectTrigger className="w-[180px] bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:text-white">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-white/80" />
                                        <SelectValue placeholder="Sélectionnez un pays" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-white/95 backdrop-blur-sm border border-white/20">
                                    {africanCountries.map((country) => (
                                        <SelectItem
                                            key={country.code}
                                            value={country.code}
                                            className="flex items-center gap-2 py-2 cursor-pointer hover:bg-marineBlue-50"
                                        >
                                            <span className="text-marineBlue-900">{country.name}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Actions utilisateur selon l'état d'authentification */}
                            {isAuthenticated && user ? (
                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="!bg-white/10 backdrop-blur-sm !text-white hover:!bg-white hover:!text-marineBlue-800 flex items-center space-x-2 !border !border-white/20 hover:!border-white transition-all duration-200 rounded-lg px-3 py-2"
                                    >
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-6 h-6 rounded-full"
                                            />
                                        ) : (
                                            <User className="w-4 h-4" />
                                        )}
                                        <span className="hidden sm:block">{user.name}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>

                                    {/* Menu déroulant utilisateur */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl z-50 border">
                                            <div className="py-2">
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                >
                                                    <User className="w-4 h-4 mr-2" />
                                                    Profil
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                >
                                                    <Settings className="w-4 h-4 mr-2" />
                                                    Paramètres
                                                </Link>
                                                <button
                                                    onClick={logout}
                                                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                >
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    Déconnexion
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link to="/login">
                                        <Button 
                                            variant="ghost" 
                                            className="text-white bg-gradient-to-r from-marineBlue-600 to-marineBlue-700 hover:from-marineBlue-500 hover:to-marineBlue-600 border-none px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-marineBlue-500/20 font-medium text-[15px] flex items-center gap-2 hover:scale-105"
                                        >
                                            <User className="w-4 h-4" />
                                            Connexion
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button 
                                            className="bg-white text-marineBlue-800 hover:bg-white/90 px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/20 border border-white/20 font-medium text-[15px] flex items-center gap-2 hover:scale-105"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            S'inscrire
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-marineBlue-900 via-marineBlue-800 to-marineBlue-700 text-white py-24 overflow-hidden">
                {/* Motif de fond animé */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-marineBlue-900/50 to-marineBlue-800/50"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-marineBlue-600/20 via-transparent to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block mb-4">
                            <Badge className="bg-white/10 text-white border border-white/20 px-4 py-1.5 text-sm font-medium">
                                <Sparkles className="w-4 h-4 mr-2 inline-block" />
                                Comparateur intelligent
                            </Badge>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                            Comparez les meilleures offres
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Trouvez l'offre qui correspond le mieux à vos besoins parmi tous nos partenaires africains.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                <div className="text-3xl font-bold text-white mb-1">1000+</div>
                                <div className="text-white/80">Offres disponibles</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                <div className="text-3xl font-bold text-white mb-1">50+</div>
                                <div className="text-white/80">Fournisseurs vérifiés</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                <div className="text-3xl font-bold text-white mb-1">15%</div>
                                <div className="text-white/80">Économies moyennes</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3">
                            <Badge className="bg-white/10 text-white border border-white/20 px-4 py-1.5">
                                <Award className="w-4 h-4 mr-2" />
                                Meilleurs prix garantis
                            </Badge>
                            <Badge className="bg-white/10 text-white border border-white/20 px-4 py-1.5">
                                <Shield className="w-4 h-4 mr-2" />
                                Fournisseurs vérifiés
                            </Badge>
                            <Badge className="bg-white/10 text-white border border-white/20 px-4 py-1.5">
                                <Clock className="w-4 h-4 mr-2" />
                                Changement rapide
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Vague décorative en bas */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-12 text-white" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </div>

            {/* Section de transition */}
            <div className="bg-white -mt-1">
                <div className="container mx-auto px-4">
                    <div className="h-16 flex items-center justify-center">
                        <div className="w-24 h-1 bg-marineBlue-100 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Filtres et recherche avec animation */}
            <div className="container mx-auto px-4 -mt-8 mb-12">
                <Card className="p-6 shadow-xl transform transition-all duration-300 hover:shadow-2xl border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Catégorie
                            </label>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Toutes les catégories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les catégories</SelectItem>
                                    <SelectItem value="energy">Énergie</SelectItem>
                                    <SelectItem value="telecom">Télécommunications</SelectItem>
                                    <SelectItem value="retail">Commerce</SelectItem>
                                    <SelectItem value="health">Santé</SelectItem>
                                    <SelectItem value="travel">Voyages</SelectItem>
                                    <SelectItem value="education">Éducation</SelectItem>
                                    <SelectItem value="business">Entreprises</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trier par
                            </label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Trier par" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price">Prix</SelectItem>
                                    <SelectItem value="rating">Note</SelectItem>
                                    <SelectItem value="name">Nom</SelectItem>
                                    <SelectItem value="savings">Économies</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rechercher
                            </label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Rechercher un produit..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-white"
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>
                        <div className="flex items-end">
                            <Button className="w-full bg-marineBlue-600 hover:bg-marineBlue-700 transform transition-all duration-300 hover:scale-105">
                                Filtrer
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Résultats de comparaison */}
            <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                        Offres disponibles
                    </h2>
                    <div className="grid grid-cols-1 gap-6">
                        {demoProducts.map((product) => (
                            <Card 
                                key={product.id} 
                                className={`p-6 hover:shadow-lg transition-all duration-300 ${
                                    expandedProduct === product.id ? 'ring-2 ring-marineBlue-500' : ''
                                }`}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            {categoryIcons[product.category as keyof typeof categoryIcons]}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {product.name}
                                                    </h3>
                                                    {product.isPopular && (
                                                        <Badge className="bg-yellow-100 text-yellow-800">
                                                            <TrendingUp className="w-4 h-4 mr-1" />
                                                            Populaire
                                                        </Badge>
                                                    )}
                                                    {product.isBestValue && (
                                                        <Badge className="bg-green-100 text-green-800">
                                                            <ThumbsUp className="w-4 h-4 mr-1" />
                                                            Meilleur rapport qualité/prix
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-gray-600">{product.provider}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4">{product.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {product.features.map((feature, index) => (
                                                <Badge 
                                                    key={index}
                                                    variant="secondary"
                                                    className="bg-marineBlue-50 text-marineBlue-700"
                                                >
                                                    <Check className="w-4 h-4 mr-1" />
                                                    {feature}
                                                </Badge>
                                            ))}
                                        </div>
                                        {expandedProduct === product.id && (
                                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Durée du contrat</p>
                                                        <p className="font-medium">{product.contractLength}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Frais d'annulation</p>
                                                        <p className="font-medium">{product.cancellationFee}€</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Avis clients</p>
                                                        <p className="font-medium">{product.reviews} avis</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Économies estimées</p>
                                                        <p className="font-medium text-green-600">{product.savings}%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-4">
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {product.price}€
                                            </p>
                                            <p className="text-sm text-gray-500">par mois</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                            <span className="font-semibold">{product.rating}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                variant="outline"
                                                onClick={() => setExpandedProduct(
                                                    expandedProduct === product.id ? null : product.id
                                                )}
                                            >
                                                {expandedProduct === product.id ? (
                                                    <>
                                                        <ChevronUp className="w-4 h-4 mr-2" />
                                                        Moins de détails
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-4 h-4 mr-2" />
                                                        Plus de détails
                                                    </>
                                                )}
                                            </Button>
                                            <Button className="bg-marineBlue-600 hover:bg-marineBlue-700">
                                                Voir l'offre
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Avantages avec animation */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Pourquoi comparer avec AfricaHub ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center transform transition-all duration-300 hover:scale-105">
                            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                                <TrendingUp className="w-8 h-8 text-marineBlue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Meilleurs prix</h3>
                            <p className="text-gray-600">Comparez et trouvez les offres les plus compétitives</p>
                        </div>
                        <div className="text-center transform transition-all duration-300 hover:scale-105">
                            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                                <Shield className="w-8 h-8 text-marineBlue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Fournisseurs vérifiés</h3>
                            <p className="text-gray-600">Des partenaires de confiance sélectionnés</p>
                        </div>
                        <div className="text-center transform transition-all duration-300 hover:scale-105">
                            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                                <Clock className="w-8 h-8 text-marineBlue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Changement rapide</h3>
                            <p className="text-gray-600">Transition simple vers votre nouveau fournisseur</p>
                        </div>
                        <div className="text-center transform transition-all duration-300 hover:scale-105">
                            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                                <Users className="w-8 h-8 text-marineBlue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Service client</h3>
                            <p className="text-gray-600">Support disponible 7j/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonPage; 