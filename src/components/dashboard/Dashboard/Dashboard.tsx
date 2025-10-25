import { Grid } from '@mui/material'
import { useGetAnalyticsQuery } from '../../../redux/features/dashboard/dashboardApi'
import EarningCharts from './EarningCharts'
import Statics from './Statics'
import TotalUserChart from './TotalUserChart'
import BookingChart from './BookingChart'

export const Dashboard = () => {
  const {data: analytics} = useGetAnalyticsQuery(undefined)
  
  console.log("analytics", analytics);
  
  return (
    <div>
      <Statics users={analytics?.users} />
        <TotalUserChart userGrowth={analytics?.userGrowth}/>
      <Grid container spacing={2}>
        <Grid size={8}>
        <EarningCharts />
        </Grid>
        <Grid size={4}>
        <BookingChart />
        </Grid>
      </Grid>
    </div>
  )
}
