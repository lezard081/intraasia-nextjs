import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
}

module.exports = {
    theme: {
        extend: {
            keyframes: {
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'fade-in-left': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(-40px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)'
                    }
                },
                'fade-in-right': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(40px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)'
                    }
                },
                'progress': {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' }
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
                'fade-in-left': 'fade-in-left 0.7s cubic-bezier(0.4,0,0.2,1) forwards',
                'fade-in-right': 'fade-in-right 0.7s cubic-bezier(0.4,0,0.2,1) forwards',
            }
        }
    },
};

export default config;
