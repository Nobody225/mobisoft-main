import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
    Globe,
    ChevronDown,
    Menu,
    X,
    Search,
    User,
    Bell,
    Settings,
    LogOut,
    Shield,
    Zap,
    Sparkles,
    Grid3X3,
    MapPin,
    TrendingUp,
    Phone,
    Car,
    Home,
    GraduationCap,
    Heart,
    Plane,
    ShoppingBag,
    Building,
    Languages,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTranslation } from "@/hooks/useTranslation"
import { useAuth } from "@/contexts/AuthContext"
// Interface pour les secteurs
interface Sector {
    id: string
    nameKey: string // Clé de traduction pour le nom
    descriptionKey: string // Clé de traduction pour la description
    icon: React.ReactNode
    isPopular?: boolean
}

// Liste des pays d'Afrique
const africanCountries = [
    { code: 'DZ', name: 'Algérie' },
    { code: 'AO', name: 'Angola' },
    { code: 'BJ', name: 'Bénin' },
    { code: 'BW', name: 'Botswana' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'BI', name: 'Burundi' },
    { code: 'CM', name: 'Cameroun' },
    { code: 'CV', name: 'Cap-Vert' },
    { code: 'CF', name: 'République centrafricaine' },
    { code: 'TD', name: 'Tchad' },
    { code: 'KM', name: 'Comores' },
    { code: 'CG', name: 'Congo' },
    { code: 'CD', name: 'République démocratique du Congo' },
    { code: 'CI', name: 'Côte d\'Ivoire' },
    { code: 'DJ', name: 'Djibouti' },
    { code: 'EG', name: 'Égypte' },
    { code: 'GQ', name: 'Guinée équatoriale' },
    { code: 'ER', name: 'Érythrée' },
    { code: 'ET', name: 'Éthiopie' },
    { code: 'GA', name: 'Gabon' },
    { code: 'GM', name: 'Gambie' },
    { code: 'GH', name: 'Ghana' },
    { code: 'GN', name: 'Guinée' },
    { code: 'GW', name: 'Guinée-Bissau' },
    { code: 'KE', name: 'Kenya' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'LR', name: 'Libéria' },
    { code: 'LY', name: 'Libye' },
    { code: 'MG', name: 'Madagascar' },
    { code: 'MW', name: 'Malawi' },
    { code: 'ML', name: 'Mali' },
    { code: 'MR', name: 'Mauritanie' },
    { code: 'MU', name: 'Maurice' },
    { code: 'MA', name: 'Maroc' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'NA', name: 'Namibie' },
    { code: 'NE', name: 'Niger' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'ST', name: 'São Tomé-et-Principe' },
    { code: 'SN', name: 'Sénégal' },
    { code: 'SC', name: 'Seychelles' },
    { code: 'SL', name: 'Sierra Leone' },
    { code: 'SO', name: 'Somalie' },
    { code: 'ZA', name: 'Afrique du Sud' },
    { code: 'SS', name: 'Soudan du Sud' },
    { code: 'SD', name: 'Soudan' },
    { code: 'SZ', name: 'Eswatini' },
    { code: 'TZ', name: 'Tanzanie' },
    { code: 'TG', name: 'Togo' },
    { code: 'TN', name: 'Tunisie' },
    { code: 'UG', name: 'Ouganda' },
    { code: 'ZM', name: 'Zambie' },
    { code: 'ZW', name: 'Zimbabwe' }
]

// Données des secteurs avec clés de traduction
const sectors: Sector[] = [
    {
        id: "assurances",
        nameKey: "sector.assurances",
        descriptionKey: "sector.assurances.desc",
        // Icône avec couleur marineBlue-600 pour l'assurance
        icon: <Shield className="w-5 h-5 text-marineBlue-600" />,
        isPopular: true,
    },
    {
        id: "banques",
        nameKey: "sector.banques",
        descriptionKey: "sector.banques.desc",
        // Icône avec couleur marineBlue-600 pour les banques
        icon: <TrendingUp className="w-5 h-5 text-marineBlue-600" />,
        isPopular: true,
    },
    {
        id: "telecoms",
        nameKey: "sector.telecoms",
        descriptionKey: "sector.telecoms.desc",
        // Icône avec couleur marineBlue-600 pour les télécoms
        icon: <Phone className="w-5 h-5 text-marineBlue-600" />,
        isPopular: true,
    },
    {
        id: "energie",
        nameKey: "sector.energie",
        descriptionKey: "sector.energie.desc",
        // Icône avec couleur marineBlue-600 pour l'énergie
        icon: <Zap className="w-5 h-5 text-marineBlue-600" />,
    },
    {
        id: "transport",
        nameKey: "sector.transport",
        descriptionKey: "sector.transport.desc",
        // Icône avec couleur marineBlue-600 pour le transport
        icon: <Car className="w-5 h-5 text-marineBlue-600" />,
    },
    {
        id: "immobilier",
        nameKey: "sector.immobilier",
        descriptionKey: "sector.immobilier.desc",
        // Icône avec couleur marineBlue-600 pour l'immobilier
        icon: <Home className="w-5 h-5 text-marineBlue-600" />,
    },
    {
        id: "education",
        nameKey: "sector.education",
        descriptionKey: "sector.education.desc",
        // Icône avec couleur marineBlue-600 pour l'éducation
        icon: <GraduationCap className="w-5 h-5 text-marineBlue-600" />,
    },
    {
        id: "sante",
        nameKey: "sector.sante",
        descriptionKey: "sector.sante.desc",
        // Icône avec couleur marineBlue-600 pour la santé
        icon: <Heart className="w-5 h-5 text-marineBlue-600" />,
    },
    {
        id: "voyages",
        nameKey: "sector.voyages",
        descriptionKey: "sector.voyages.desc",
        // Icône avec couleur marineBlue-600 pour les voyages
        icon: <Plane className="w-5 h-5 text-marineBlue-600" />,
    },
    {
        id: "commerce",
        nameKey: "sector.commerce",
        descriptionKey: "sector.commerce.desc",
        // Icône avec couleur marineBlue-600 pour le commerce (correction de la classe CSS)
        icon: <ShoppingBag className="w-5 h-5 text-marineBlue-600" />,
    },
    {
        id: "entreprises",
        nameKey: "sector.entreprises",
        descriptionKey: "sector.entreprises.desc",
        // Icône avec couleur marineBlue-600 pour les entreprises
        icon: <Building className="w-5 h-5 text-marineBlue-600" />,
    },
]

// Composant UserActions avec gestion d'authentification et traductions
interface UserActionsProps {
    selectedCountry: string;
    handleCountryChange: (value: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({ selectedCountry, handleCountryChange }) => {
    const { t, currentLanguage, changeLanguage } = useTranslation()
    const { user, isAuthenticated, logout } = useAuth()
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    return (
        <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Sélecteur de pays */}
            <div className="flex items-center space-x-2">
                <Select value={selectedCountry} onValueChange={handleCountryChange}>
                    <SelectTrigger className="w-[200px] bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-white/80" />
                            <SelectValue placeholder="Sélectionnez un pays" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl">
                        {africanCountries.map((country) => (
                            <SelectItem 
                                key={country.code} 
                                value={country.code} 
                                className="flex items-center gap-2 py-2 px-3 hover:bg-marineBlue-50 cursor-pointer transition-colors duration-200"
                            >
                                <span className="text-base text-gray-700">{country.name}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Actions utilisateur selon l'état d'authentification */}
            {isAuthenticated && user ? (
                // Menu utilisateur connecté
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
                            <User className="w-4 h-4 text-marineBlue-600" />
                        )}
                        <span className="hidden sm:block">{user.name}</span>
                        {/* Icône ChevronDown avec couleur marineBlue-600 pour le menu utilisateur */}
                        <ChevronDown className="w-4 h-4 text-marineBlue-600" />
                    </Button>

                    {/* Menu déroulant utilisateur */}
                    {isUserMenuOpen && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl z-50 border">
                            <div className="py-2">
                                <Link
                                    to="/profile"
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                                    onClick={() => setIsUserMenuOpen(false)}
                                >
                                    {/* Icône User avec couleur marineBlue-600 pour le profil */}
                                    <User className="w-4 h-4 text-marineBlue-600" />
                                    <span>{t("header.auth.profile")}</span>
                                </Link>
                                <Link
                                    to="/settings"
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                                    onClick={() => setIsUserMenuOpen(false)}
                                >
                                    {/* Icône Settings avec couleur marineBlue-600 pour les paramètres */}
                                    <Settings className="w-4 h-4 text-marineBlue-600" />
                                    <span>{t("header.auth.settings")}</span>
                                </Link>
                                <hr className="my-1" />
                                <button
                                    onClick={() => {
                                        logout()
                                        setIsUserMenuOpen(false)
                                    }}
                                    className="flex items-center space-x-2 px-4 py-2 !text-afroRed-DEFAULT hover:!bg-afroRed-light hover:!text-afroRed-dark w-full text-left rounded-md transition-all duration-200 !border !border-transparent hover:!border-afroRed-light !bg-transparent"
                                >
                                    {/* Icône LogOut avec couleur rouge harmonisée pour indiquer la déconnexion */}
                                    <LogOut className="w-4 h-4" />
                                    <span className="font-medium">
                                        {t("header.auth.logout")}
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // Boutons pour utilisateurs non connectés
                <div className="flex items-center space-x-2">
                    <Link to="/login">
                        <Button
                            variant="ghost"
                            className="!bg-white/10 backdrop-blur-sm !text-white hover:!bg-white hover:!text-marineBlue-800 !border !border-white/20 hover:!border-white transition-all duration-200"
                        >
                            {t("header.auth.login")}
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button
                            className="!bg-afroGold-DEFAULT !text-marineBlue-800 hover:!bg-afroGold-light transition-all duration-200"
                        >
                            {t("header.auth.register")}
                        </Button>
                    </Link>
                </div>
            )}

            {/* Overlay pour fermer le menu utilisateur */}
            {isUserMenuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                />
            )}
        </div>
    )
}

const Header: React.FC = () => {
    const { t } = useTranslation()
    const location = useLocation()
    const isMobile = useIsMobile()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCountry, setSelectedCountry] = useState('CI')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Logique de recherche à implémenter
        console.log("Recherche:", searchQuery)
    }

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value)
        // Ici, vous pouvez ajouter la logique pour changer la langue ou les paramètres régionaux
    }

    // Secteurs populaires (les 3 premiers)
    const popularSectors = sectors.filter(sector => sector.isPopular)
    const allOtherSectors = sectors.filter(sector => !sector.isPopular)

    // Composant Menu Mobile avec Sheet
    const MobileMenu = () => (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden text-white hover:text-marineBlue-100 hover:bg-marineBlue-700/50 p-3 rounded-lg transition-all duration-200"
                    aria-label="Menu principal"
                >
                    {/* Icône Menu avec couleur blanche selon spécification */}
                    <Menu className="w-6 h-6 text-white" />
                    <span className="sr-only">{t("header.mobile.menu")}</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="w-80 bg-white text-marineBlue-900 border-marineBlue-200 shadow-xl"
            >
                <div className="flex flex-col h-full">
                    {/* En-tête du menu mobile avec fond blanc et couleurs harmonieuses */}
                    <div className="flex items-center justify-between p-4 border-b border-marineBlue-100 bg-marineBlue-50">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-marineBlue-600 via-brandSky to-marineBlue-500 p-1 shadow-sm">
                                <Globe className="w-full h-full text-white" />
                            </div>
                            <span className="font-bold text-lg text-marineBlue-900">
                                AfricaHub
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="!text-marineBlue-600 hover:!bg-marineBlue-100 hover:!text-marineBlue-800 p-1 rounded-md transition-colors !bg-transparent"
                        >
                            {/* Icône X avec couleur marineBlue-600 pour fermer le menu */}
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Barre de recherche mobile avec style blanc harmonieux */}
                    <div className="p-4 border-b border-marineBlue-100 bg-white">
                        <form onSubmit={handleSearch} className="relative">
                            {/* Icône Search avec couleur marineBlue-600 pour la recherche mobile */}
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-marineBlue-500 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder={t("header.search.placeholder")}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="pl-10 bg-marineBlue-50 border-marineBlue-200 text-marineBlue-900 placeholder:text-marineBlue-400 focus:border-marineBlue-500 focus:ring-marineBlue-500"
                            />
                        </form>
                    </div>

                    {/* Navigation mobile */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <nav className="space-y-4">
                            {/* Liens principaux avec style blanc harmonieux */}
                            <div className="space-y-2">
                                <Link
                                    to="/"
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-marineBlue-50 hover:shadow-sm transition-all duration-200 group"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {/* Icône Home avec couleur marineBlue-600 */}
                                    <Home className="w-5 h-5 text-marineBlue-600 group-hover:text-marineBlue-700" />
                                    <span className="text-marineBlue-800 group-hover:text-marineBlue-900 font-medium">
                                        {t("header.nav.home")}
                                    </span>
                                </Link>
                                <Link
                                    to="/produits"
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-marineBlue-50 hover:shadow-sm transition-all duration-200 group"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {/* Icône ShoppingBag avec couleur marineBlue-600 */}
                                    <ShoppingBag className="w-5 h-5 text-marineBlue-600 group-hover:text-marineBlue-700" />
                                    <span className="text-marineBlue-800 group-hover:text-marineBlue-900 font-medium">
                                        {t("header.nav.products")}
                                    </span>
                                </Link>
                            </div>

                            {/* Secteurs populaires avec style blanc harmonieux */}
                            <div>
                                <div className="flex items-center space-x-2 mb-3 px-3">
                                    <span className="text-afroGold-DEFAULT text-sm">
                                        ⭐
                                    </span>
                                    <h3 className="text-sm font-semibold text-marineBlue-700">
                                        {t("header.sectors.popular")}
                                    </h3>
                                </div>
                                <div className="space-y-1">
                                    {popularSectors.map(sector => (
                                        <Link
                                            key={sector.id}
                                            to={`/secteur/${sector.id}`}
                                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-marineBlue-50 hover:shadow-sm transition-all duration-200 group border border-transparent hover:border-marineBlue-100"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            {/* Icône du secteur avec couleur marineBlue-600 héritée */}
                                            <div className="text-marineBlue-600 group-hover:text-marineBlue-700 transition-colors">
                                                {sector.icon}
                                            </div>
                                            <div>
                                                <div className="font-medium text-marineBlue-800 group-hover:text-marineBlue-900">
                                                    {t(sector.nameKey)}
                                                </div>
                                                <div className="text-xs text-marineBlue-500 group-hover:text-marineBlue-600">
                                                    {t(sector.descriptionKey)}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Autres secteurs avec style blanc harmonieux */}
                            <div>
                                <h3 className="text-sm font-semibold text-marineBlue-700 mb-3 px-3">
                                    {t("header.sectors.all")}
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {allOtherSectors.map(sector => (
                                        <Link
                                            key={sector.id}
                                            to={`/secteur/${sector.id}`}
                                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-marineBlue-50 hover:shadow-sm transition-all duration-200 group border border-transparent hover:border-marineBlue-100"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            {/* Icône du secteur avec couleur marineBlue-600 pour une meilleure visibilité */}
                                            <div className="text-marineBlue-600 group-hover:text-marineBlue-700 transition-colors">
                                                {sector.icon}
                                            </div>
                                            <span className="text-sm text-marineBlue-800 group-hover:text-marineBlue-900 font-medium">
                                                {t(sector.nameKey)}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </div>

                    {/* Pied du menu mobile avec style blanc harmonieux */}
                    <div className="p-4 border-t border-marineBlue-100 bg-marineBlue-50">
                        <div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-white border border-marineBlue-100">
                            <span className="text-sm text-marineBlue-700 font-medium">
                                {t("header.country.cotedivoire")}
                            </span>
                            <span className="text-2xl">🇨🇮</span>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full !text-marineBlue-700 hover:!bg-marineBlue-100 hover:!text-marineBlue-900 justify-start transition-colors !border !border-marineBlue-200 hover:!border-marineBlue-300 !bg-transparent"
                        >
                            {/* Icône Languages avec couleur marineBlue-600 pour le sélecteur de langue */}
                            <Languages className="w-4 h-4 mr-2 text-marineBlue-600" />
                            <span className="font-medium">
                                {t("header.nav.language")} (
                                {t("header.nav.current")}: FR)
                            </span>
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )

    return (
        <header className="sticky top-0 z-50 bg-marineBlue-600/95 backdrop-blur-lg border-b border-marineBlue-500 shadow-lg">
            {/* Barre principale du header */}
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between py-3 gap-4">
                    {/* Section gauche : Menu mobile + Logo */}
                    <div className="flex items-center space-x-3">
                        {/* Menu mobile hamburger - visible uniquement sur mobile */}
                        <MobileMenu />

                        {/* Logo AfricaHub */}
                        <Link
                            to="/"
                            className="flex items-center space-x-3 group flex-shrink-0"
                        >
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-marineBlue-600 via-brandSky to-marineBlue-400 p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                <Globe className="w-full h-full text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                                    AfricaHub
                                </h1>
                                <p className="text-xs lg:text-sm text-marineBlue-100 font-medium">
                                    {t("header.logo.subtitle")}
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Section centrale : Barre de recherche - cachée sur mobile */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                        <form
                            onSubmit={handleSearch}
                            className="w-full relative group"
                        >
                            <div className="relative">
                                {/* Icône Search avec couleur gray-500 qui devient marineBlue-600 au focus */}
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-marineBlue-600" />
                                <Input
                                    type="text"
                                    placeholder="Rechercher des produits, services ou entreprises..."
                                    value={searchQuery}
                                    onChange={e =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-12 pr-24 h-12 lg:h-13 text-base border-white/20 bg-white/95 backdrop-blur-sm focus:border-white focus:ring-2 focus:ring-white/50 rounded-xl shadow-sm transition-all duration-200 placeholder:text-gray-500"
                                />
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 !bg-marineBlue-600 !text-white hover:!bg-marineBlue-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm"
                                >
                                    Rechercher
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Section droite : Actions utilisateur */}
                    <div className="flex-shrink-0">
                        <UserActions 
                            selectedCountry={selectedCountry}
                            handleCountryChange={handleCountryChange}
                        />
                    </div>
                </div>
            </div>

            {/* Barre de navigation secondaire - cachée sur mobile */}
            <div className="hidden md:block bg-marineBlue-700 border-t border-marineBlue-500/30">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex items-center justify-between py-2">
                        {/* Menu principal */}
                        <nav className="flex items-center space-x-6">
                            {/* Dropdown Secteurs */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 font-medium text-sm ${
                                        isDropdownOpen
                                            ? "bg-white text-marineBlue-600 border-marineBlue-300 shadow-lg"
                                            : "bg-gradient-to-r from-marineBlue-600 to-marineBlue-700 text-white border-marineBlue-500/50 hover:from-marineBlue-700 hover:to-marineBlue-800 hover:border-marineBlue-400 shadow-md hover:shadow-lg"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <Grid3X3 className="w-4 h-4" />
                                        {t("header.sectors")}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-200 ${
                                            isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {/* Menu déroulant */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-96 bg-white rounded-lg shadow-xl z-50 border">
                                        <div className="p-4">
                                            {/* Secteurs populaires */}
                                            <div className="mb-4">
                                                <div className="flex items-center space-x-1 mb-3">
                                                    <span className="text-afroGold-DEFAULT">
                                                        ⭐
                                                    </span>
                                                    <h3 className="font-semibold text-marineBlue-800">
                                                        {t(
                                                            "header.sectors.popular"
                                                        )}
                                                    </h3>
                                                </div>
                                                <div className="space-y-2">
                                                    {popularSectors.map(
                                                        sector => (
                                                            <a
                                                                key={sector.id}
                                                                href={`/secteur/${sector.id}`}
                                                                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                                                            >
                                                                {/* Icône du secteur populaire avec couleur marineBlue-600 */}
                                                                <div className="text-marineBlue-600">
                                                                    {
                                                                        sector.icon
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-gray-900">
                                                                        {t(
                                                                            sector.nameKey
                                                                        )}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {t(
                                                                            sector.descriptionKey
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Tous les secteurs */}
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-3">
                                                    {t("header.sectors.all")}
                                                </h3>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {allOtherSectors.map(
                                                        sector => (
                                                            <a
                                                                key={sector.id}
                                                                href={`/secteur/${sector.id}`}
                                                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded transition-colors"
                                                            >
                                                                {/* Icône du secteur avec couleur marineBlue-600 */}
                                                                <div className="text-marineBlue-600">
                                                                    {
                                                                        sector.icon
                                                                    }
                                                                </div>
                                                                <span className="text-sm text-gray-700">
                                                                    {t(
                                                                        sector.nameKey
                                                                    )}
                                                                </span>
                                                            </a>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Bouton voir tous harmonisé avec fond blanc */}
                                            <div className="mt-4 pt-4 border-t border-marineBlue-100">
                                                <Button className="w-full !bg-white !text-marineBlue-600 !border-2 !border-marineBlue-600 hover:!bg-marineBlue-600 hover:!text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                                                    {t(
                                                        "header.sectors.viewAll"
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Autres liens de navigation avec fond et bordure */}
                            <Link
                                to="/"
                                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md border transition-all duration-200 font-medium text-sm ${
                                    location.pathname === "/"
                                        ? "bg-white text-marineBlue-600 border-marineBlue-300 shadow-sm"
                                        : "bg-marineBlue-700/50 text-white border-marineBlue-500/50 hover:bg-marineBlue-600/70 hover:border-marineBlue-400"
                                }`}
                            >
                                {/* Icône Home avec couleur harmonisée selon l'état */}
                                <Home
                                    className={`w-4 h-4 transition-colors ${
                                        location.pathname === "/"
                                            ? "text-marineBlue-600"
                                            : "text-white"
                                    }`}
                                />
                                <span>{t("header.nav.home")}</span>
                            </Link>
                            <Link
                                to="/produits"
                                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md border transition-all duration-200 font-medium text-sm ${
                                    location.pathname === "/produits"
                                        ? "bg-white text-marineBlue-600 border-marineBlue-300 shadow-sm"
                                        : "bg-marineBlue-700/50 text-white border-marineBlue-500/50 hover:bg-marineBlue-600/70 hover:border-marineBlue-400"
                                }`}
                            >
                                {/* Icône pour cohérence visuelle */}
                                <span className="w-4 h-4 flex items-center justify-center">
                                    📦
                                </span>
                                <span>{t("header.nav.products")}</span>
                            </Link>
                        </nav>

                        {/* Boutons d'action à droite */}
                        <div className="flex items-center space-x-3">
                            <Link
                                to="/guides"
                                className="text-marineBlue-100 hover:text-white transition-all duration-200 text-sm font-medium px-3 py-1 rounded-md hover:bg-marineBlue-700/30"
                            >
                                📚 {t("header.nav.guides")}
                            </Link>
                            <Button
                                variant="ghost"
                                className="!bg-gradient-to-r !from-orange-500 !to-red-500 !text-white hover:!text-marineBlue-100 text-xs px-3 py-1 !border-0 transition-all duration-200 rounded-full font-semibold shadow-sm hover:shadow-md"
                            >
                                🔥 {t("header.nav.deals")}
                            </Button>
                            <Link
                                to="/compare"
                                className="text-marineBlue-100 hover:text-white transition-all duration-200 text-sm font-medium px-3 py-1 rounded-md hover:bg-marineBlue-700/30"
                            >
                                ⚖️ {t("header.nav.compare")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay pour fermer le dropdown */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </header>
    )
}

export default Header
