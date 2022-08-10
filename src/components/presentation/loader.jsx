import MoonLoader from 'react-spinners/MoonLoader'

export default function Loader ({ className = '', loaderOptions = { } }) {
  return <div className={`loading ${className}`}>
    <MoonLoader {...loaderOptions} speedMultiplier={0.3} loading={true} size={150} />
  </div>
}
