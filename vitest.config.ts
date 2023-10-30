import { configDefaults, defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [react(), tsconfigPaths()],
		test: {
			...configDefaults,
			include: ['./src/__test__/**/*.{test,spec}.?(c|m)[jt]s?(x)'],

			globals: true,
			environment: 'jsdom',
			environmentOptions: {
				jsdom: {
					console: true
				}
			},
			setupFiles: ['./src/__test__/_setup.ts'],
			reporters: ['default', 'html']
		},
		esbuild: {
			treeShaking: true
		},
		define: {
			VITE_SUPABASE_KEY: JSON.stringify(env.VITE_SUPABASE_KEY)
		}
	}
})
