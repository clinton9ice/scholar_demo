import { genderTitles } from '@/db/columnSchema'
import type { TablePaginationConfig } from 'antd/es/table'
import type { FilterValue } from 'antd/es/table/interface'

export type FieldType = {
	first_name: string
	last_name: string
	title: (typeof genderTitles)[number]
	nin: string
	dob: string
	tel: number
	salary?: string
}

export type TableParams = {
	pagination?: TablePaginationConfig
	sortField?: string
	sortOrder?: string
	filters?: Record<string, FilterValue>
}

export type OverviewContext = {
	children?: React.ReactNode
	className?: string
	header?: string
	overviewInfo: {
		[id: string]: unknown
	}
	overviewClass?: string
	loading?: boolean
}
