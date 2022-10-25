import Typography from '@mui/material/Typography'

export default function Status ({ character, sx }) {
  return <Typography sx={sx} className={`${character.status} status`}>{character.status}</Typography>
}
