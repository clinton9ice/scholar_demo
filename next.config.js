/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SUPABASE_KEY: process.env.SUPABASE_KEY
	},
	images: {
		domains: ['placehold.co']
	}
}

module.exports = nextConfig
