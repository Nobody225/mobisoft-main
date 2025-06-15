import React from "react";
import { Link } from "react-router-dom";
import { 
    Zap, 
    Battery, 
    Sun, 
    Wind, 
    Droplets, 
    ChevronRight,
    TrendingUp,
    Shield,
    Clock,
    Users,
    Building2,
    Factory,
    Home,
    Car,
    Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EnergySectorPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-marineBlue-50 to-white">
            {/* Hero Section */}
            <div className="relative bg-marineBlue-800 text-white py-20">
                <div className="absolute inset-0 bg-[url('/images/energy-pattern.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Secteur de l'Énergie
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            Comparez et trouvez les meilleures offres d'énergie pour votre consommation. 
                            Électricité, gaz, énergies renouvelables : faites le choix qui vous correspond.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/compare">
                                <Button className="bg-white text-marineBlue-800 hover:bg-white/90">
                                    Comparer les offres
                                </Button>
                            </Link>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                En savoir plus
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtres de recherche */}
            <div className="container mx-auto px-4 -mt-8">
                <Card className="p-6 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type d'énergie
                            </label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="electricite">Électricité</SelectItem>
                                    <SelectItem value="gaz">Gaz</SelectItem>
                                    <SelectItem value="renouvelable">Énergies renouvelables</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Consommation mensuelle
                            </label>
                            <Input type="number" placeholder="kWh" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type de logement
                            </label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="maison">Maison</SelectItem>
                                    <SelectItem value="appartement">Appartement</SelectItem>
                                    <SelectItem value="bureau">Bureau</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button className="w-full bg-marineBlue-600 hover:bg-marineBlue-700">
                                Rechercher
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Types d'énergie */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                    Types d'énergie disponibles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold">Électricité</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Comparez les offres d'électricité des différents fournisseurs et trouvez le meilleur tarif.
                        </p>
                        <Link to="/energy/electricity" className="text-marineBlue-600 hover:text-marineBlue-700 flex items-center gap-2">
                            Voir les offres <ChevronRight className="w-4 h-4" />
                        </Link>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Sun className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold">Énergies renouvelables</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Découvrez les solutions d'énergie solaire, éolienne et autres sources renouvelables.
                        </p>
                        <Link to="/energy/renewable" className="text-marineBlue-600 hover:text-marineBlue-700 flex items-center gap-2">
                            Voir les offres <ChevronRight className="w-4 h-4" />
                        </Link>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Droplets className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-semibold mt-4">Gaz</h3>
                        <p className="text-gray-600 mb-4">
                            Comparez les offres de gaz naturel et trouvez le meilleur tarif pour votre consommation.
                        </p>
                        <Link to="/energy/gas" className="text-marineBlue-600 hover:text-marineBlue-700 flex items-center gap-2">
                            Voir les offres <ChevronRight className="w-4 h-4" />
                        </Link>
                    </Card>
                </div>
            </div>

            {/* Avantages */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Pourquoi choisir AfricaHub pour votre énergie ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                                <TrendingUp className="w-8 h-8 text-marineBlue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Meilleurs prix</h3>
                            <p className="text-gray-600">Comparez et trouvez les offres les plus compétitives</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                                <Shield className="w-8 h-8 text-marineBlue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Fournisseurs vérifiés</h3>
                            <p className="text-gray-600">Des partenaires de confiance sélectionnés</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                                <Clock className="w-8 h-8 text-marineBlue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Changement rapide</h3>
                            <p className="text-gray-600">Transition simple vers votre nouveau fournisseur</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                                <Users className="w-8 h-8 text-marineBlue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Service client</h3>
                            <p className="text-gray-600">Support disponible 7j/7</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secteurs d'activité */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                    Solutions pour tous les secteurs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <Building2 className="w-12 h-12 text-marineBlue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Entreprises</h3>
                        <p className="text-gray-600">Solutions adaptées aux besoins professionnels</p>
                    </Card>
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <Factory className="w-12 h-12 text-marineBlue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Industries</h3>
                        <p className="text-gray-600">Optimisation de la consommation industrielle</p>
                    </Card>
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <Home className="w-12 h-12 text-marineBlue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Particuliers</h3>
                        <p className="text-gray-600">Offres adaptées à votre consommation</p>
                    </Card>
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <Car className="w-12 h-12 text-marineBlue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Mobilité</h3>
                        <p className="text-gray-600">Solutions pour véhicules électriques</p>
                    </Card>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-marineBlue-800 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Prêt à optimiser votre consommation d'énergie ?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Comparez gratuitement les offres des meilleurs fournisseurs d'énergie et faites des économies.
                    </p>
                    <Link to="/compare">
                        <Button className="bg-white text-marineBlue-800 hover:bg-white/90 px-8 py-6 text-lg">
                            Comparer maintenant
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EnergySectorPage; 