import React from "react"
import { SectionContainer, SectionTransition } from "@/components/common/SectionTransition"
import { ArrowDown, Sparkles, Target, Users, Award, Shield } from "lucide-react"

interface HomePageLayoutProps {
    children: React.ReactNode
}

/**
 * Layout optimisé pour la page d'accueil avec transitions fluides
 * et organisation logique des sections
 */
export const HomePageLayout: React.FC<HomePageLayoutProps> = ({ children }) => {
    // Convertir les enfants en tableau pour pouvoir les manipuler
    const childrenArray = React.Children.toArray(children)
    
    // Définir les configurations pour chaque section
    const sectionConfigs = [
        {
            name: "hero",
            background: "marine" as const,
            padding: "xl" as const,
            transition: { variant: "wave" as const, fromColor: "from-marineBlue-600", toColor: "to-white" },
            separator: { icon: <Sparkles className="w-4 h-4" />, title: "Découvrez AfricaHub" }
        },
        {
            name: "stats",
            background: "gradient" as const,
            padding: "lg" as const,
            transition: { variant: "curve" as const, fromColor: "from-white", toColor: "to-gray-50" },
            separator: { icon: <Target className="w-4 h-4" />, title: "Nos Services" }
        },
        {
            name: "sectors",
            background: "white" as const,
            padding: "lg" as const,
            transition: { variant: "diagonal" as const, fromColor: "from-white", toColor: "to-marineBlue-50" },
            separator: { icon: <ArrowDown className="w-4 h-4" />, title: "Comment ça marche" }
        },
        {
            name: "howItWorks",
            background: "gray" as const,
            padding: "lg" as const,
            transition: { variant: "wave" as const, fromColor: "from-gray-50", toColor: "to-white" },
            separator: { icon: <Award className="w-4 h-4" />, title: "Offres Spéciales" }
        },
        {
            name: "deals",
            background: "white" as const,
            padding: "md" as const,
            transition: { variant: "curve" as const, fromColor: "from-white", toColor: "to-gradient" },
            separator: { icon: <Users className="w-4 h-4" />, title: "Témoignages" }
        },
        {
            name: "testimonials",
            background: "gradient" as const,
            padding: "lg" as const,
            transition: { variant: "minimal" as const, fromColor: "from-gradient", toColor: "to-white" },
            separator: { icon: <Shield className="w-4 h-4" />, title: "Sécurité & Confiance" }
        },
        {
            name: "trust",
            background: "white" as const,
            padding: "lg" as const,
            transition: null,
            separator: null
        }
    ]

    return (
        <div className="min-h-screen">
            {/* Header - toujours en premier */}
            {childrenArray[0]}

            {/* Sections principales avec transitions */}
            {childrenArray.slice(1, -1).map((child, index) => {
                const config = sectionConfigs[index]
                if (!config) return child

                return (
                    <React.Fragment key={index}>
                        {/* Section avec configuration */}
                        <SectionContainer
                            background={config.background}
                            padding={config.padding}
                        >
                            {child}
                        </SectionContainer>

                        {/* Transition vers la section suivante */}
                        {config.transition && index < childrenArray.length - 3 && (
                            <SectionTransition
                                variant={config.transition.variant}
                                fromColor={config.transition.fromColor}
                                toColor={config.transition.toColor}
                                height="h-12"
                            />
                        )}
                    </React.Fragment>
                )
            })}

            {/* Footer - toujours en dernier */}
            {childrenArray[childrenArray.length - 1]}
        </div>
    )
}

/**
 * Hook pour optimiser le scroll et l'expérience utilisateur
 */
export const useHomePageOptimization = () => {
    React.useEffect(() => {
        // Smooth scroll pour toute la page
        document.documentElement.style.scrollBehavior = 'smooth'

        // Intersection Observer pour les animations au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up')
                }
            })
        }, observerOptions)

        // Observer toutes les sections
        const sections = document.querySelectorAll('section')
        sections.forEach((section) => {
            observer.observe(section)
        })

        return () => {
            observer.disconnect()
            document.documentElement.style.scrollBehavior = 'auto'
        }
    }, [])

    // Fonction pour naviguer vers une section
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    return { scrollToSection }
}

/**
 * Composant de navigation flottante pour la page d'accueil
 */
interface FloatingNavigationProps {
    sections: Array<{
        id: string
        label: string
        icon: React.ReactNode
    }>
}

export const FloatingNavigation: React.FC<FloatingNavigationProps> = ({ sections }) => {
    const [activeSection, setActiveSection] = React.useState(sections[0]?.id || '')
    const { scrollToSection } = useHomePageOptimization()

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section.id)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [sections])

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
            <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 p-2">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`block w-12 h-12 rounded-full mb-2 last:mb-0 transition-all duration-200 ${
                            activeSection === section.id
                                ? 'bg-marineBlue-600 text-white shadow-md'
                                : 'text-gray-400 hover:text-marineBlue-600 hover:bg-marineBlue-50'
                        }`}
                        title={section.label}
                    >
                        {section.icon}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default HomePageLayout
