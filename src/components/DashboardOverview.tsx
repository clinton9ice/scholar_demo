"use client"
import React, { useEffect, useState } from 'react'
import type { OverviewContext } from '@/types'
import {Overview} from '@/components'


export const  DashboardOverview = (props: OverviewContext) =>{
    const [overview, setOverview] = useState({
        'total course': 0,
        'completed course': 0,
        'total assignment': 0
    })

    useEffect(() =>{
        setOverview({
            "completed course": Number(props.overviewInfo?.completedCourse || 0),
            'total assignment': Number(props.overviewInfo?.totalAssignment || 0),
            'total course': Number(props.overviewInfo?.totalCourse || 0)
        })
    }, [props.overviewInfo])

    return (
        <React.Fragment>
            <Overview overviewInfo={overview} header='Overview' />
        </React.Fragment>
    );
}
