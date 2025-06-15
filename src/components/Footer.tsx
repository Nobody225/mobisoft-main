import React from "react"
import {
    Globe,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Smartphone,
    Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Footer: React.FC = () => {
    return (
        <footer className="text-white" style={{ backgroundColor: "#294467" }}>
            {/* Section principale du footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Colonne 1: AfricaHub */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <div
                                className="p-2 rounded-full"
                                style={{ backgroundColor: "#294467" }}
                            >
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">AfricaHub</h3>
                                <p className="text-xs text-gray-300">
                                    Comparateur africain
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-300 leading-relaxed">
                            Le comparateur de référence pour l'Afrique. Trouvez
                            et comparez les meilleurs produits et services dans
                            tous les secteurs.
                        </p>

                        <div className="space-y-2">
                            <p className="text-sm">📧 contact@africahub.com</p>
                            <p className="text-sm">📞 +225 01 02 03 04 05</p>
                            <p className="text-sm">📍 Abidjan, Côte d'Ivoire</p>
                        </div>

                        {/* Réseaux sociaux */}
                        <div className="flex space-x-3 pt-4">
                            <a
                                href="#"
                                className="p-2 rounded-full hover:bg-blue-600 transition-colors"
                                style={{ backgroundColor: "#1e3a5f" }}
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full hover:bg-blue-400 transition-colors"
                                style={{ backgroundColor: "#1e3a5f" }}
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full hover:bg-pink-600 transition-colors"
                                style={{ backgroundColor: "#1e3a5f" }}
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full hover:bg-blue-700 transition-colors"
                                style={{ backgroundColor: "#1e3a5f" }}
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full hover:bg-red-600 transition-colors"
                                style={{ backgroundColor: "#1e3a5f" }}
                            >
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Colonne 2: Secteurs populaires */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Secteurs populaires
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/secteur/assurances"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Assurances
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/secteur/banques"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Banques
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/secteur/telecoms"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Télécoms
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/secteur/energie"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Énergie
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/secteur/transport"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Transport
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/secteur/immobilier"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Immobilier
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/secteur/sante"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Santé
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/secteurs"
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Voir tous →
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3: Nos Produits */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Nos Produits
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/comparateur"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Comparateur
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/guides"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/avis"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Avis clients
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/bons-plans"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Bons plans
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/alertes"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Alertes prix
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/calculateurs"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Calculateurs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/blog"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/api"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    API
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4: Services Clients */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Services Clients
                        </h3>

                        {/* Newsletter */}
                        <div className="space-y-3">
                            <p className="text-sm text-gray-300">
                                Recevez nos dernières offres et actualités
                            </p>
                            <div className="flex space-x-2">
                                <Input
                                    type="email"
                                    placeholder="Votre email"
                                    className="text-white placeholder-gray-400 flex-1 border-gray-500"
                                    style={{ backgroundColor: "#1e3a5f" }}
                                />
                                <Button
                                    className="text-white px-4"
                                    style={{ backgroundColor: "#294467" }}
                                    onMouseEnter={e =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#1e3a5f")
                                    }
                                    onMouseLeave={e =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#294467")
                                    }
                                >
                                    S'abonner
                                </Button>
                            </div>
                        </div>

                        {/* Applications mobiles */}
                        <div className="space-y-3 pt-4">
                            <p className="text-sm font-medium">
                                Téléchargez nos apps
                            </p>
                            <div className="flex space-x-2">
                                <a
                                    href="#"
                                    className="px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors hover:opacity-80"
                                    style={{ backgroundColor: "#1e3a5f" }}
                                >
                                    <Smartphone className="w-4 h-4" />
                                    <span className="text-xs">App Store</span>
                                </a>
                                <a
                                    href="#"
                                    className="px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors hover:opacity-80"
                                    style={{ backgroundColor: "#1e3a5f" }}
                                >
                                    <Monitor className="w-4 h-4" />
                                    <span className="text-xs">Google Play</span>
                                </a>
                            </div>
                        </div>

                        {/* Liens utiles */}
                        <ul className="space-y-2 pt-4">
                            <li>
                                <a
                                    href="/aide"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Centre d'aide
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Nous contacter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/partenaires"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Devenir partenaire
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/presse"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Espace presse
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Barre du bas */}
            <div
                className="border-t border-black/20"
                style={{ backgroundColor: "#1e3a5f" }}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright et liens légaux */}
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <p className="text-sm text-gray-400">
                                © 2024 AfricaHub. Tous droits réservés.
                            </p>
                            <div className="flex space-x-4 text-sm">
                                <a
                                    href="/mentions-legales"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Mentions légales
                                </a>
                                <a
                                    href="/confidentialite"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Confidentialité
                                </a>
                                <a
                                    href="/cookies"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Cookies
                                </a>
                                <a
                                    href="/cgu"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    CGU
                                </a>
                            </div>
                        </div>

                        {/* Certifications et partenaires */}
                        <div className="flex items-center space-x-4">
                            <span className="text-xs text-gray-400">
                                Certifié par:
                            </span>
                            <div className="flex space-x-2">
                                <div
                                    className="px-2 py-1 rounded text-xs"
                                    style={{ backgroundColor: "#294467" }}
                                >
                                    🛡️ SSL
                                </div>
                                <div
                                    className="px-2 py-1 rounded text-xs"
                                    style={{ backgroundColor: "#294467" }}
                                >
                                    ✅ Vérifié
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
