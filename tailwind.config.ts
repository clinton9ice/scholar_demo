import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				green: {
					2: '#4FBFA3',
					700: '#3BAA90'
				},
				gray: {
					25: '#FCFCFD',
					50: '#F8F8F8',
					100: '#F2F4F7',
					200: '#797979',
					250: '#848199',
					300: '#D0D5DD',
					400: '#98A2B3',
					500: '#667085',
					600: '#475467',
					700: '#344054',
					800: '#1D2939',
					900: '#101828',
					950: '#094063'
				}
			}
		}
	},
	plugins: []
}
export default config
