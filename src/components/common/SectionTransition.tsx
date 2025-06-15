import React from "react"

interface SectionTransitionProps {
    variant?: "wave" | "diagonal" | "curve" | "minimal"
    fromColor?: string
    toColor?: string
    height?: string
    className?: string
}

/**
 * Composant de transition entre sections pour améliorer la fluidité visuelle
 * Utilisé pour créer des transitions élégantes entre les différentes sections de la page
 */
export const SectionTransition: React.FC<SectionTransitionProps> = ({
    variant = "wave",
    fromColor = "from-marineBlue-600",
    toColor = "to-white",
    height = "h-16",
    className = "",
}) => {
    const getTransitionPath = () => {
        switch (variant) {
            case "wave":
                return "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            
            case "diagonal":
                return "M0,0L1440,32L1440,0Z"
            
            case "curve":
                return "M0,0Q720,64,1440,0L1440,0Z"
            
            case "minimal":
            default:
                return "M0,0L1440,0L1440,64L0,64Z"
        }
    }

    return (
        <div className={`relative ${height} ${className}`}>
            <svg
                className="absolute bottom-0 w-full h-full"
                viewBox="0 0 1440 64"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="transition-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className={`${fromColor.replace('from-', 'text-')} opacity-100`} />
                        <stop offset="100%" className={`${toColor.replace('to-', 'text-')} opacity-100`} />
                    </linearGradient>
                </defs>
                <path
                    d={getTransitionPath()}
                    fill="url(#transition-gradient)"
                    className="transition-all duration-300"
                />
            </svg>
        </div>
    )
}

/**
 * Composant de séparateur de section avec icône centrale
 */
interface SectionSeparatorProps {
    icon?: React.ReactNode
    title?: string
    subtitle?: string
    className?: string
}

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({
    icon,
    title,
    subtitle,
    className = "",
}) => {
    return (
        <div className={`relative py-12 ${className}`}>
            {/* Ligne de séparation */}
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            
            {/* Contenu central */}
            <div className="relative flex justify-center">
                <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-3">
                        {icon && (
                            <div className="w-8 h-8 bg-marineBlue-600 rounded-full flex items-center justify-center text-white">
                                {icon}
                            </div>
                        )}
                        {title && (
                            <div className="text-center">
                                <div className="text-sm font-semibold text-marineBlue-600">
                                    {title}
                                </div>
                                {subtitle && (
                                    <div className="text-xs text-gray-500">
                                        {subtitle}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Composant de conteneur de section avec espacement cohérent
 */
interface SectionContainerProps {
    children: React.ReactNode
    background?: "white" | "gray" | "gradient" | "marine"
    padding?: "sm" | "md" | "lg" | "xl"
    className?: string
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
    children,
    background = "white",
    padding = "lg",
    className = "",
}) => {
    const getBackgroundClass = () => {
        switch (background) {
            case "gray":
                return "bg-gray-50"
            case "gradient":
                return "bg-gradient-to-br from-marineBlue-50 via-white to-brandSky/5"
            case "marine":
                return "bg-marineBlue-600"
            case "white":
            default:
                return "bg-white"
        }
    }

    const getPaddingClass = () => {
        switch (padding) {
            case "sm":
                return "py-8"
            case "md":
                return "py-12"
            case "lg":
                return "py-16"
            case "xl":
                return "py-20"
            default:
                return "py-16"
        }
    }

    return (
        <section className={`${getBackgroundClass()} ${getPaddingClass()} ${className}`}>
            <div className="container mx-auto px-4">
                {children}
            </div>
        </section>
    )
}

export default SectionTransition
