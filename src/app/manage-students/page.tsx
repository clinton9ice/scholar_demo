'use client'
import React, { useState, useEffect, useCallback } from 'react'
import {
	Modal,
	DatePicker,
	Form,
	Input,
	Select,
	Button,
	message,
	Table
} from 'antd'
import { supaBase } from '@/db'
import type { ColumnsType } from 'antd/es/table'
import { Overview, Card, SearchIcon } from '@/components'
import { genderTitles, dbField } from '@/db/columnSchema'
import { FieldType, TableParams, OverviewContext } from '@/types'
import { disabledAgeHigherThan21, currentAge21 } from '@/helpers/Date'
import { getALlData } from '@/db/GetData'


export default function ManageStudents() {
	const [isFormModalOpen, openFormModal] = useState(false)
	const [isSubmitting, startSubmitting] = useState(false)
	const titleList = genderTitles.map(item => ({value: item.toLowerCase(), label:item}))
	const isFemale = ['mrs', 'miss']
	const [form] = Form.useForm()
	const tableColumns: ColumnsType<FieldType> = [
		{
			title: 'Student name',
			dataIndex: 'name',
			sorter: true,
			width: '20%'
		},
		{
			title: 'Title',
			dataIndex: 'title',
			filters: titleList.map(i => ({ value: i.value, text: i.label })),
			width: '20%'
		},
		{
			title: 'National I.D',
			dataIndex: 'nin'
		},
		{
			title: 'Date of Birth',
			dataIndex: 'dob'
		},
		{
			title: 'Student no',
			dataIndex: 'student_no'
		}
	]

	const [dashboardOverview, setDashboardOverview] = useState<
		OverviewContext['overviewInfo']
	>({
		'total No of Students': 0,
		'No of Male Students': 0,
		'No of Female Students': 0
	})

	const [tableData, setTableData] = useState<FieldType[]>([])
	const [loadingTable, setTableLoader] = useState(false)
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 100
		}
	})

	const getData = useCallback(() => {
		setTableLoader(true)
		getALlData({
			runCheck: 'is_student',
			checkValue: true
		}).then(item =>{
			if (Array.isArray(item)) {
				setTableData(item)
				setDashboardOverview({
					'total No of Students': item?.length,
					'No of Male Students': item.filter(
						m => !isFemale.includes(m.title)
					).length,
					'No of Female Students': item.filter(f =>
						isFemale.includes(f.title)
					).length
				})
			}
		}).catch((error) =>{
			message.error(error.message)
			console.error(error);
			
		}).finally(() => setTableLoader(false))
	}, [])

	const submitForm = async (values: FieldType) => {
		const isRequiredFieldsEmpty = Object.values(values).some(item => {
			return (typeof item === 'string' && item.trim() === '') || !item
	   })
	   
		if (isRequiredFieldsEmpty) {
			return message.error({
				content:  'Please ensure to fill the required fields'
			})
		}
		startSubmitting(true)
		const { error } = await supaBase.from(dbField).insert([
			{
				dob: new Date(values.dob),
				first_name: values.first_name,
				last_name: values.last_name,
				nin: values.nin,
				student_no: values.tel,
				title: values.title,
				is_student: true
			}
		])
		if (error) {
			message.error({
				content: error.message
			})
			return null
		}
		getData()
		startSubmitting(false)
		openFormModal(false)
		message.success({
			content: 'Student added successfully'
		})
	}

	useEffect(() => {
		form.resetFields()
	}, [form, isFormModalOpen])

	useEffect(() => {
		getData()
	}, [getData])

	return (
		<React.Fragment>
			<Overview
				header='Students'
				loading={loadingTable}
				overviewInfo={dashboardOverview}
				overviewClass='flex-wrap md:flex-nowrap'
			>
				<div className='p-5 w-full md:w-auto flex-none'>
					<button
						onClick={() => openFormModal(true)}
						type='button'
						className='h-12 p-5 hover:bg-red-600 transition rounded-lg active:scale-95 bg-red-700 text-white text-sm w-full max-w-[157px] items-center justify-center text-center inline-flex font-semibold'
					>
						Add new Student
					</button>
				</div>
			</Overview>

			<div className=''>
				<Modal
					title='Add New Student'
					open={isFormModalOpen}
					footer=' '
					wrapClassName='title-danger'
					onCancel={() => openFormModal(false)}
				>
					<Form
						autoComplete='off'
						initialValues={{ dob: currentAge21 }}
						form={form}
						onFinish={submitForm}
					>
						<div className='grid md:grid-cols-2 py-10 gap-x-10 gap-y-2'>
							<Form.Item<FieldType>
								label='Student First name'
								name='first_name'
								rules={[
									{
										required: true,
										message:
											'Please input Student first name!'
									}
								]}
							>
								<Input className='custom-input' />
							</Form.Item>

							<Form.Item<FieldType>
								label='Student Last name'
								name='last_name'
								rules={[
									{
										required: true,
										message:
											'Please input Student last name!'
									}
								]}
							>
								<Input className='custom-input' />
							</Form.Item>

							<Form.Item<FieldType>
								label='Title'
								name='title'
								rules={[
									{
										required: true,
										message: 'Please provide this field'
									}
								]}
							>
								<Select options={titleList} />
							</Form.Item>

							<Form.Item<FieldType>
								label='National I.D'
								name='nin'
								rules={[
									{
										required: true,
										min: 10,
										message:
											'Please input National identity number(NIN) with a minimum of 10 characters!'
									}
								]}
							>
								<Input
								min={10}
									type='number'
									className='custom-input'
								/>
							</Form.Item>

							<Form.Item<FieldType>
								label='Date of Birth'
								name='dob'
								rules={[
									{
										required: true,
										message: 'Please Student date of birth'
									}
								]}
							>
								<DatePicker
									showToday={false}
									disabledDate={disabledAgeHigherThan21}
									className='custom-input w-full'
								/>
							</Form.Item>

							<Form.Item<FieldType>
								label='Student Number'
								name='tel'
								rules={[
									{
										required: true,
										message: 'Please input Student Number'
									}
								]}
							>
								<Input type='tel' className='custom-input' />
							</Form.Item>
						</div>

						<div className='flex items-center justify-end gap-5'>
							<button
								type='button'
								className='w-full bg-gray-50 text-gray-950 rounded-md max-w-[147px] h-[54px]'
								onClick={() => openFormModal(false)}
							>
								Cancel
							</button>

							<Button
								htmlType='submit'
								loading={isSubmitting}
								className='w-full bg-red-500 !text-white !border-red-400 rounded-md hover:bg-red-600 transition max-w-[147px] h-[54px]'
							>
								Add
							</Button>
						</div>
					</Form>
				</Modal>

				<Card className='mt-20'>
					<div className='p-5 overflow-hidden'>
						<div className='flex flex-col'>
							<div className='flex  justify-end items-center'>
								<div className='relative'>
									<div className='absolute translate-x-3 top-2.5'>
										<SearchIcon />
									</div>
									<input
										className='custom-input pl-10 pr-3'
										type='search'
										placeholder='search'
									/>
								</div>
							</div>

							<div className='mt-5 space-y-5 flex-none overflow-x-auto'>
								<div>
									<div className=' text-neutral-900 text-lg font-medium leading-7'>
										All Students
									</div>
									<div className=' text-gray-500 text-sm font-normal leading-normal'>
										{tableData.length}
									</div>
								</div>

								<div className='overflow-auto px-5 max-w-sm  sm:max-w-full'>
									<Table
										columns={tableColumns}
										rowKey={record => record.title}
										dataSource={tableData}
										pagination={tableParams.pagination}
										loading={loadingTable}
										className='whitespace-nowrap flex-1'
									/>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</React.Fragment>
	)
}
