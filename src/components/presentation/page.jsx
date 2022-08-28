import Loader from './loader'

export default function Page ({ name, loading, children }) {
  const className = `${name} page`

  if (loading) {
    return <Loader className={className} />
  }
  return <div className={className}>{children}</div>
}
