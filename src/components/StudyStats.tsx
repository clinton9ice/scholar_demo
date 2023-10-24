"use client"
import React, { useState } from 'react';
import {CaretDown} from '@/components/icons'
import { Card } from '@/components';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { LineChart } from '@mui/x-charts/LineChart';

export const StudyStats = () => {
    const [filter, setFilter] = useState('weekly')
    const items: MenuProps['items'] = [
        {
          key: 'weekly',
          label: (
            <span className="text-muted capitalize text-xs">weekly</span>
          ),
          disabled: filter === 'weekly',
        },
        {
          key: 'monthly',
          label: (
            <span className="text-muted capitalize text-xs">monthly</span>
          ),
          disabled: filter === 'monthly',
        },
      ];
      const updateFilter: MenuProps['onClick'] = ({ key }) => setFilter(key)
      
    return (
        <div className='lg:flex-1 w-full'>
            <h3 className="font-semibold text-base mb-5">
                Study Statistics
                </h3>

                <Card>
                    <div className="py-4 border-b border-gray-100 px-5 inline-flex items-center justify-between">
                        <span className='text-gray-700 font-medium'>
                            Course
                        </span>

                        <Dropdown menu={{ items, onClick: updateFilter }} trigger={['click']} >
                            <div className="inline-flex items-center cursor-pointer text-sm gap-1">
                                <span className="text-gray-200">Show:</span>
                                <span className="text-gray-700">{filter}</span>
                                <CaretDown />
                            </div>
                        </Dropdown>
                    </div>
                    <div className=" w-full px-8 md:gap-x-20 gap-8 flex-wrap flex items-center my-auto">
                    <LineChart
                          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                          series={[
                            {
                              data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                          ]}
                          height={300}
                          className='max-w-[500px] w-full'
                      />
                    </div>
                    </Card>
        </div>
    );
}
