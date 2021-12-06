import React, { useEffect, useState } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

export default function With ({ className, load, children, loaderOptions={} }) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    (async () => { setValue(await load()) })()
  }, [load])

  if (!value) {
    return <div className={`loading ${className}`}>
      <MoonLoader {...loaderOptions} speedMultiplier={0.3} color='#FFF' loading={true} size={150} />
    </div>
  }

  return <div className={className}>{children(value)}</div>
}
