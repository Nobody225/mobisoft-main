import React from "react"
import {
    Home,
    BarChart3,
    Grid3X3,
    PlayCircle,
    Percent,
    MessageSquare,
    Shield,
} from "lucide-react"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { HeroSection } from "@/components/common/HeroSection"
import { StatsSection } from "@/components/common/StatsSection"
import { PopularSectorsSection } from "@/components/common/PopularSectorsSection"
import { HowItWorksSection } from "@/components/common/HowItWorksSection"
import { DealsSection } from "@/components/common/DealsSection"
import { TestimonialsSection } from "@/components/common/TestimonialsSection"
import { TrustSection } from "@/components/common/TrustSection"
import {
    HomePageLayout,
    FloatingNavigation,
    useHomePageOptimization,
} from "@/components/layouts/HomePageLayout"

/**
 * Page d'accueil d'AfricaHub - Optimisée pour la conversion
 *
 * Structure organisée selon le parcours utilisateur :
 * 1. Accroche et proposition de valeur (Hero)
 * 2. Crédibilité et confiance (Stats)
 * 3. Navigation et découverte (Secteurs)
 * 4. Compréhension du processus (Comment ça marche)
 * 5. Urgence et action (Bons plans)
 * 6. Preuve sociale (Témoignages)
 * 7. Rassurance finale (Confiance)
 */
const HomePage: React.FC = () => {
    // Hook pour optimiser l'expérience utilisateur
    useHomePageOptimization()

    // Configuration de la navigation flottante
    const navigationSections = [
        { id: "hero", label: "Accueil", icon: <Home className="w-5 h-5" /> },
        {
            id: "stats",
            label: "Statistiques",
            icon: <BarChart3 className="w-5 h-5" />,
        },
        {
            id: "sectors",
            label: "Secteurs",
            icon: <Grid3X3 className="w-5 h-5" />,
        },
        {
            id: "how-it-works",
            label: "Comment ça marche",
            icon: <PlayCircle className="w-5 h-5" />,
        },
        {
            id: "deals",
            label: "Bons Plans",
            icon: <Percent className="w-5 h-5" />,
        },
        {
            id: "testimonials",
            label: "Témoignages",
            icon: <MessageSquare className="w-5 h-5" />,
        },
        {
            id: "trust",
            label: "Confiance",
            icon: <Shield className="w-5 h-5" />,
        },
    ]

    return (
        <>
            {/* Navigation flottante pour une meilleure UX */}
            {/* <FloatingNavigation sections={navigationSections} /> */}
            {/* <FloatingNavigation sections={navigationSections} /> */}

            {/* Layout optimisé avec transitions fluides */}
            <HomePageLayout>
                {/* 🎯 Header - Navigation principale */}
                <Header />

                {/* 🚀 Section Hero - Première impression et proposition de valeur */}
                <section id="hero">
                    <HeroSection />
                </section>

                {/* 📊 Section Statistiques - Crédibilité immédiate avec chiffres clés */}
                <section id="stats">
                    <StatsSection />
                </section>

                {/* 🎯 Secteurs Populaires - Navigation claire vers les services */}
                <section id="sectors">
                    <PopularSectorsSection />
                </section>

                {/* 📋 Comment ça marche - Processus simple en 3 étapes */}
                <section id="how-it-works">
                    <HowItWorksSection />
                </section>

                {/* 🔥 Bons Plans - Urgence et valeur ajoutée */}
                <section id="deals">
                    <DealsSection />
                </section>

                {/* 💬 Témoignages - Preuve sociale et confiance */}
                <section id="testimonials">
                    <TestimonialsSection />
                </section>

                {/* 🛡️ Section Confiance - Rassurance finale et sécurité */}
                <section id="trust">
                    <TrustSection />
                </section>

                {/* 📞 Footer - Contact et informations légales */}
                <Footer />
            </HomePageLayout>
        </>
    )
}

export default HomePage
