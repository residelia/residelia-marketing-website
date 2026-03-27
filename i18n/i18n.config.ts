import { on } from "events";

export default defineI18nConfig(() => ({
    legacy: true,
    // locale: mainStore.defaultLocale?.localeCode,
    locales: [
      { code: 'es', iso: 'es-ES', name: 'Español' },
      { code: 'en', iso: 'en-US', name: 'English' }
    ],// when adding new languages, add locale here and create the new language in the Sanity Studio    defaultLocale: mainStore.defaultLocale?.localeCode,
    defaultLocale: "es",
    fallbackLocale: "en",
    messages: {
        es: {
            updated: 'Actualizado',
            tableOfContents: 'En este artículo',
            otherReadings: 'Lecturas destacadas',
            courseOutline: 'Índice del curso',
            learn: 'Aprende',
            discover: 'Descubre',
            lessons: 'lecciones',
            viewContent: 'Ir al contenido',
            soon: '¡Muy Pronto!',
            next: 'Proximamente',
            solutions: 'soluciones',
            resources: 'recursos',
            team: 'equipo',
            copyright: 'Todos los derechos reservados',
            jobApplicationButton: '¡Regístrate ya para esta posición!',
            latestNews: 'Lo último publicado',
            allPosts: 'Todos los posts',
            backToBlog: 'Regresar al blog',
            backToUniversity: 'Regresar a university',
            waitlist: '¡Únete a la lista de espera!',
            youremail: 'Introduce tu email',
            pageNotFound: 'No hemos encontrado lo que buscas',
            notFoundMessage: 'Oops! La página que buscas podría haberse movido, renombrado o incluso nunca haber existido...',
            backHome: 'Regresar al inicio',
            growWithUs: '¡Crece con nosotros!',
            monthlyPeriod: 'mes',
            yearlyPeriod: 'año',
            save: 'Ahorra',
            contactus: 'Solicita una demo personalizada y comprueba cómo RESIDELIA alinea tus objetivos',
            pricePeriodDescription: 'Facturado Anualmente | Facturado Mensualmente',
            comparePlans: 'Compara nuestros planes',
            legalTerms: 'nuestros términos de uso',
            onePayment: 'Pago único anual',
            comingSoon: '¡Muy pronto!',
            comingSoonDescription: 'Estamos trabajando para traerte esta sección lo antes posible.',
            onboardingWizard: {
                buttons: {
                    next: "Siguiente",
                    end: "Finalizar",
                    back: "Atrás"
                },
                stepper: {
                    step1: "Empresa",
                    step2: "Caso de uso",
                    step3: "Referido",
                    step4: "Finalizar"
                },
                title: 'Bienvenido a RESIDELIA - Proceso de registro',
                heading: 'Ayúdanos a entender tu necesidad',
                subheading: '',
                step1: {
                    title: 'Datos de tu empresa',
                    company: {
                        label: "Nombre de la empresa",
                        required: "Debes introducir un nombre de empresa válido",
                        placeholder: "Nombre de tu empresa",
                        length: "El nombre de tu empresa debe tener al menos tres letras"
                    },
                    companyDomain: {
                        label: "Sitio web de tu empresa",
                        placeholder: "https://www.midominio.com",
                        error: "Debes introducir una dirección web de empresa válida",
                        required: "Debes introducir la dirección web de tu empresa"
                    },
                    assetsAnalyzed: {
                        label:"Activos analizados anualmente",
                        placeholder: "50",
                        error: "Debes introducir un número de activos válido",
                        required: "Debes introducir un número de activos válido",
                        value:"El número de activos debe ser mayor que cero"
                    },
                    assetsManaged:{
                        label: "Activos gestionados anualmente",
                        placeholder: "5",
                        error: "Debes introducir un número de activos válido",
                        required: "Debes introducir un número de activos válido",
                        value:"El número de activos debe ser mayor que cero"
                    }
                },
                step2: {
                    title: '¿Cómo vas a usar RESIDELIA?',
                    usageOptions: {
                        opportunitiesSearch: "Buscar oportunidades",
                        opportunitiesAnalysis: "Analizar oportunidades",
                        marketAnalysis: "Analizar el mercado",
                        propertyManagement: "Gestionar propiedades",
                        rentalManagement: "Gestionar alquileres",
                        facilityManagement: "Gestionar incidencias",
                        repossessionManagement: "Gestionar recuperaciones",
                        otherUsage: {
                            label: "Otros",
                            placeholder: "Uso que realizarás de RESIDELIA"
                        }
                    },
                    platformUsage: {
                        required: "Indícanos qué uso vas a hacer de RESIDELIA",
                        length: "Tienes que seleccionar al menos una opción"
                    },
                    otherUsage: {
                        length: "Introduce una opción correcta  (más de 5 caracteres)"
                    }
                },
                step3: {
                    title: 'Finalmente, ¿cómo has conocido RESIDELIA?',
                    referralOptions: {
                        googleSearch: "Buscando en Google",
                        wordOfMouth: "Alguien me habló de RESIDELIA",
                        alreadyKnown: "Ya conocía RESIDELIA",
                        linkedin: "En Linkedin",
                        otherSocial: "En otras redes sociales",
                        otherReferral: {
                            label: "Otros",
                            placeholder: "¿Cómo nos has conocido?"
                        }
                    },
                    referrals: {
                        required: "Indícanos cómo has conocido RESIDELIA",
                        length: "Tienes que seleccionar al menos una opción"
                    },
                    otherReferral: {
                        label: "Otros",
                        length: "Introduce una opción correcta (más de 5 caracteres)"
                    }
                },
                completed: {
                    heading: 'Invest with confidence, manage easily',
                    error: {
                        title: '¡Vaya! Ocurrió un error procesando tu solicitud',
                        description: 'Por favor, inténtalo de nuevo más tarde'
                    },
                    success: {
                        title: '¡Estamos procesando tu solicitud!',
                        description: 'Permanece atento a tu buzón de correo para continuar con el proceso de registro. Esto puede tomar unas horas hasta que analicemos tu solicitud.'
                    }
                }
            }
        },
        en: {
            updated: 'Updated',
            tableOfContents: 'In this article',
            otherReadings: 'Highlighted readings',
            courseOutline: 'Course outline',
            learn: 'Learn',
            discover: 'Discover',
            lessons: 'lessons',
            viewContent: 'View content',
            soon: 'Coming Soon!',
            next: 'Coming Next',
            solutions: 'solutions',
            resources: 'resources',
            team: 'team',
            copyright: 'All rights reserved',
            jobApplicationButton: 'Apply to this job!',
            latestNews: 'Latest News',
            allPosts: 'All our posts',
            backToBlog: 'Back to blog',
            backToUniversity: 'Back to university',
            waitlist: 'Join the waitlist!',
            youremail: 'Your email address',
            pageNotFound: 'Page Not Found',
            notFoundMessage: 'Oops! The page you are looking for might have been moved, renamed or might have never existed...',
            backHome: 'Back Home',
            growWithUs: 'Grow with us!',
            monthlyPeriod: 'mo',
            yearlyPeriod: 'yr',
            save: 'Save',
            contactus: 'Get a custom demo and see how RESIDELIA aligns with your goals.',
            pricePeriodDescription: 'Billed yearly | Billed monthly',
            comparePlans: 'Compare plans',
            legalTerms: 'our use terms',
            onePayment: 'One annual payment',
            comingSoon: 'Coming soon!',
            comingSoonDescription: 'We are working to bring you this section as soon as possible.',
            onboardingWizard: {
                buttons: {
                    next: "Next",
                    end: "Finish",
                    back: "Back"
                },
                stepper: {
                    step1: "Company",
                    step2: "Use case",
                    step3: "Referral",
                    step4: "Finish",
                },
                title: 'Welcome to RESIDELIA - Sign up process',
                heading: 'Help us understand your needs',
                subheading: '',
                step1: {
                    title: 'Company details',
                    company: {
                        label: "Company name",
                        required: "You must introduce a valid name",
                        placeholder: "Your company name",
                        length: "Your company name must have 3 characters or above"
                    },
                    companyDomain: {
                        label: "Your company website",
                        placeholder: "https://www.mydomain.com",
                        error: "You must introduce a valid website",
                        required: "You must introduce your company domain"
                    },
                    assetsAnalyzed: {
                        label:"Yearly analyzed assets",
                        placeholder: "50",
                        error: "You must introduce a valid asset number",
                        required: "You must introduce a number of assets",
                        value:"Your assets number must be greater than zero"
                    },
                    assetsManaged:{
                        label: "Yearly managed assets",
                        placeholder: "5",
                        error: "You must introduce a valid asset number",
                        required: "You must introduce a number of assets",
                        value:"Your assets number must be greater than zero"
                    }
                },
                step2: {
                    title: 'How are you using RESIDELIA?',
                    usageOptions: {
                        opportunitiesSearch: "Search for opportunities",
                        opportunitiesAnalysis: "Opportunities analysis",
                        marketAnalysis: "Market analysis",
                        propertyManagement: "Property management",
                        rentalManagement: "Rental management",
                        facilityManagement: "Incidents management",
                        repossessionManagement: "Repossession management",
                        otherUsage: {
                            label: "Other",
                            placeholder: "Your RESIDELIA use case"
                        }
                    },
                    platformUsage: {
                        required: "Tell us your RESIDELIA use case",
                        length: "Please, choose an option"
                    },
                    otherUsage: {
                        length: "Please, introduce a valid option (>5 characters)"
                    }
                },
                step3: {
                    title: 'Finally, how did you know about RESIDELIA?',
                    referralOptions: {
                        googleSearch: "Searching in Google",
                        wordOfMouth: "Someone told me about RESIDELIA",
                        alreadyKnown: "I already know RESIDELIA",
                        linkedin: "On Linkedin",
                        otherSocial: "On other social networks",
                        otherReferral: {
                            label: "Other",
                            placeholder: "Where did you hear about us?"
                        }
                    },
                    referrals: {
                        required: "Tell us where you heard about us",
                        length: "Please, choose an option"
                    },
                    otherReferral: {
                        label: "Otros",
                        length: "Introduce una opción correcta (más de 5 caracteres)"
                    }
                },
                completed: {
                    heading: 'Invest with confidence, manage easily',
                    error: {
                        title: 'An error occurred when processing your request!',
                        description: 'Please, try again later or contact us'
                    },
                    success: {
                        title: 'We are processing your trial request!',
                        description: 'Stay tuned to your inbox to continue with the sign up process. It may take a while since we are analyzing your needs.'
                    }
                }
            }
        },
    },
}));
