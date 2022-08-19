import Favicon from 'react-favicon'

export default function SmartFavicon () {
  const darkmode = Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  return <Favicon url={darkmode ? '/darkfavicon.png' : '/favicon.png'} />
}
