import { Grid } from '@mui/material'
import BookingChart from './BookingChart'
import EarningCharts from './EarningCharts'
import Statics from './Statics'
import TotalUserChart from './TotalUserChart'

export const Dashboard = () => {

  
  return (
    <div>
      <Statics />
        <TotalUserChart />
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
