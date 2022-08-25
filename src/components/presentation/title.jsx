export default function Title ({ title }) {
  if (!title) return ''

  return <div className='title'>{title}</div>
}
