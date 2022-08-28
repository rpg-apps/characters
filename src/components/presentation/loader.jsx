import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

import Logo from './logo'

export default function Loader ({ className = '', loaderOptions = { } }) {
  return <div className={`loading ${className}`}>
    <Logo />
    <Box sx={{ width: '80%' }}>
      <LinearProgress />
    </Box>
  </div>
}
