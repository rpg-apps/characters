import { useState, useEffect } from 'react'

export default function Condition ({ character, context, condition, children }) {
  const [result, setResult] = useState(false)

  useEffect(() => {
    (async () => {
      console.log(condition)
      setResult(await character.get(condition, { context }))
    }) ()
  }, [character, setResult])

  if (result) {
    return children[0]
  } else {
    return children[1]
  }
}

Condition.Empty = () => ''
