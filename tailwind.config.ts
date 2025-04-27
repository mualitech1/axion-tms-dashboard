
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				tms: {
					'blue': '#0077C8',
					'blue-light': '#E6F3FC',
					'gray-100': '#F7F8FA',
					'gray-200': '#EEF0F3',
					'gray-300': '#DFE3E8',
					'gray-400': '#C4CDD5',
					'gray-500': '#919EAB',
					'gray-600': '#637381',
					'gray-700': '#454F5B',
					'gray-800': '#212B36',
					'green': '#00A76F',
					'green-light': '#E6F8F3',
					'red': '#FF4842',
					'red-light': '#FFECEB',
					'yellow': '#FFC107',
					'yellow-light': '#FFF8E0',
				},
				// Aximo color palette
				aximo: {
					'primary': '#0090FF', // Bright blue from logo and buttons
					'dark': '#0A101F',    // Dark background
					'darker': '#060C17',  // Darker sections
					'light': '#33C3F0',   // Light blue accents
					'highlight': '#1EAEDB', // Highlighted elements
					'card': '#111827',    // Card background
					'text': '#F9FAFB',    // Primary text
					'text-secondary': '#9CA3AF', // Secondary text
					'border': '#1F2937',  // Border color
					'glow': 'rgba(0, 144, 255, 0.5)', // Glow effect color
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				},
				'fade-out': {
					from: {
						opacity: '1'
					},
					to: {
						opacity: '0'
					}
				},
				'slide-in-right': {
					from: {
						transform: 'translateX(100%)'
					},
					to: {
						transform: 'translateX(0)'
					}
				},
				'slide-out-right': {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(100%)'
					}
				},
				'scale-in': {
					from: {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					to: {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: 0.6,
						boxShadow: '0 0 5px rgba(0, 144, 255, 0.5)'
					},
					'50%': {
						opacity: 1,
						boxShadow: '0 0 15px rgba(0, 144, 255, 0.8)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.2s ease-out',
				'fade-out': 'fade-out 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s infinite'
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'card': '0 0 20px rgba(0, 0, 0, 0.05)',
				'elevated': '0 10px 30px rgba(0, 0, 0, 0.08)',
				'aximo': '0 0 15px rgba(0, 144, 255, 0.3)',
				'aximo-strong': '0 0 25px rgba(0, 144, 255, 0.5)'
			},
			backdropBlur: {
				'xs': '2px'
			},
			backgroundImage: {
				'aximo-gradient': 'linear-gradient(to right, rgba(0, 144, 255, 0.8), rgba(51, 195, 240, 0.8))',
				'dark-gradient': 'linear-gradient(to bottom, #0A101F, #060C17)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
