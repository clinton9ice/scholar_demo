/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		VITE_SUPABASE_KEY: process.env.VITE_SUPABASE_KEY
	},
	images: {
		domains: ['placehold.co']
	}
}

module.exports = nextConfig
