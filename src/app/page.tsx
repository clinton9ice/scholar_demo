'use client'
import {supaBase} from "@/db"
import React, { useEffect, useState } from "react";
import type { OverviewContext } from "@/types";

import {DashboardOverview, StudyStats, CompletedCourses} from '@/components'

export default function Home() {
  const [dashboardOverview] = useState<OverviewContext['overviewInfo']>({
    completedCourse: 0,
    totalAssignment: 0,
    totalCourse: 0
  })
  
  return (
    <React.Fragment>
      <DashboardOverview overviewInfo={dashboardOverview} />

      <div className="flex items-start justify-between flex-wrap mt-16 gap-12">
        <StudyStats />
        <CompletedCourses />
      </div>
    </React.Fragment>
  )
}
