"use client"
import {Fragment} from 'react'
import {Card} from '@/components'
import { Skeleton } from 'antd'
import type { OverviewContext } from '@/types'

export const  Overview = (props: OverviewContext) =>{
    const overviewClass = [props.overviewClass, 'flex items-center my-auto'].join(' ')
    return (
        <Fragment>
                <h3 className="font-semibold text-base mb-5">
                    {props.header}
                </h3>

                <Card>
                    <div  className={overviewClass}>
                        <div className=" w-full px-8 md:gap-x-20 py-10 md:py-0 gap-8 flex-wrap flex items-center my-auto">

                            {
                                Object.keys(props.overviewInfo).sort((a, b) => (b > a? 1: -1)).map((i) =>{
                                    return (
                                        <div data-testid='overview-list' key={i} className="space-y-2">
                                            <h4 className="text-gray-200 text-sm capitalize">{i}</h4>
                                        
                                                <h2  className={`font-extrabold ${i === 'total course'? 'text-green-700': 'text-gray-950'} md:text-2xl text-lg`}>
                                                  
                                                    {
                                                         props.loading ? 
                                                            <Skeleton.Button size='small' active className='w-5 h-5' /> : 
                                                            (props.overviewInfo as unknown as string[])[i as unknown as number]
                                                    }
                                                </h2>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {props.children}
                    </div>
                </Card>
        </Fragment>
    );
}