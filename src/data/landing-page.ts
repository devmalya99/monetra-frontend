import {
    BarChart3,
    BrainCircuit,
    PieChart,
    ShieldCheck,
    Zap,
} from 'lucide-react';

export const landingPageContent = {
    hero: {
        badge: 'Monetra v1.0 is now live',
        title: {
            line1: 'Your Entire Financial Life',
            line2: 'Clarified.',
            highlight: 'Clarified.',
        },
        description:
            'Track expenses, visualize wealth growth, and get personalized financial advice. The intelligent companion for your money.',
        primaryCta: 'Start Tracking Free',
        secondaryCta: 'View Live Demo',
        trustedBy: 'Trusted by 10,000+ early adopters',
    },
    features: {
        heading: 'Features designed for growth',
        subheading:
            'Everything you need to understand your spending and grow your net worth.',
        items: [
            {
                icon: PieChart,
                title: 'Smart Analytics',
                description:
                    'Visualize your spending habits with beautiful, interactive charts. See exactly where every dollar goes.',
            },
            {
                icon: BrainCircuit,
                title: 'AI Recommendations',
                description:
                    'Get personalized advice based on your spending patterns. Monetra identifies savings opportunities automatically.',
            },
            {
                icon: BarChart3,
                title: 'Wealth Tracking',
                description:
                    'Monitor your net worth over time. Connect accounts to see your assets and liabilities in one single view.',
            },
        ],
    },
    proof: {
        heading: 'Bank-grade security, by default',
        description:
            'Your financial data is sensitive. We treat it with the highest level of encryption and privacy standards.',
        cta: 'Read our Security Whitepaper',
        checklist: [
            'End-to-End Encryption',
            'Read-Only Access',
            'No Data Selling',
            'SOC2 Compliant Utils',
            'Biometric Support',
            '24/7 Anomaly Detection',
        ],
    },
    cta: {
        heading: 'Master your money today',
        description:
            'Join thousands of users who have taken control of their financial future with Monetra.',
        primaryButton: 'Get Started for Free',
        secondaryButton: 'Contact Sales',
    },
    footer: {
        copyright: `© ${new Date().getFullYear()} Monetra Inc. All rights reserved.`,
        tagline: 'Your wealth, clarified.',
        links: {
            product: [
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Integrations', href: '#' },
            ],
            company: [
                { label: 'About', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Blog', href: '#' },
            ],
            legal: [
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
            ],
        },
    },
};
