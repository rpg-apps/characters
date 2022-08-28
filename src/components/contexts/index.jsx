import { WithAuth } from './auth-context'
import { WithRules } from './rules-context'
import { WithCharacters } from './characters-context'
import { WithAdapters } from './game-adapters-context'

export default function DataProvider ({ appId, children }) {
  return <WithAuth appId={appId}>
    <WithRules>
      <WithAdapters>
        <WithCharacters>
          {children}
        </WithCharacters>
      </WithAdapters>
    </WithRules>
  </WithAuth>
}
