import { useSupportedRulebooks } from '../../../contexts/game-adapters-context'

import OptionsStep from './options-step'

export default function GameStep ({ control }) {
  const supportedRulebooks = useSupportedRulebooks()

  return <OptionsStep className='game' title='choose a game' options={supportedRulebooks} Option={RulebookOption} control={control} />
}

const RulebookOption = ({ option }) => <div className={`rulebook card ${option}`}></div>
