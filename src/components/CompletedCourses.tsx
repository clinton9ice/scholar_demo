"use client"
import React from 'react';
import { Card } from '@/components';
import { EllipsisVertical } from './icons';
import { Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';

export function CompletedCourses() {

    const deleteItem = () =>{}

    const items: MenuProps['items'] = [
        {
            key: 'update',
            label: (
              <span className="text-muted capitalize text-xs">Update Course</span>
            ),
        },

        {
          key: 'remove',
          label: (
            <span className="text-muted capitalize text-xs text-red-500 font-medium">Remove course</span>
          ),
        },
      ];

      const watchAction: MenuProps['onClick'] = ({ key }) =>{
       switch (key) {
        case 'update':
            message.open({
                type: 'error',
                content: 'This feature is not ready yet.',
                duration: 10,
              });
            break;
       
        default:
            break;
       }
        
      }

    return (
        <div className='w-full flex-none md:flex-1'>
        <h3 className="font-semibold text-base mb-5">
        Completed Courses
        </h3>

            <Card className='py-5'>
                <div className="space-y-5 my-auto">
                  
                        <div className="pl-3 pr-10 w-full gap-5  justify-between flex items-center my-auto">
                            <div className='flex flex-wrap md:flex-nowrap items-center gap-5'>

                                <div className="md:h-[94px] md:w-[94px] w-[50px] h-[50px] rounded-md bg-gray-100">
                                    
                                </div>

                                <div className='space-y-1'>
                                    <div className="text-gray-950 text-sm sm:text-base font-bold tracking-loose">
                                        Figma : User research to usability Testing
                                    </div>

                                    <div className="text-neutral-400 text-xs sm:text-sm font-medium tracking-tight">
                                        Come up with Hoft New Website WireFrame
                                    </div>
                                </div>
                            </div>

                            <Dropdown menu={{ items, onClick: watchAction }} trigger={['click']} >
                              <button type='button'>
                                <EllipsisVertical />
                              </button>
                            </Dropdown>
                        </div>
                </div>
            </Card>
    </div>
    );
}
