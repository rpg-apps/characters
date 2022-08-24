import { Uncalculated } from '../../../presentation/character'

export default function FieldChoice ({ choice, builder, control }) {
  return <Options options={builder.playbook.fields[choice.field]} control={control} />
}

function Options ({ options, control }) {
  const [value, setValue] = control
  if (Array.isArray(options[0])) {
    const update = option => {
      const group = options.find(g => g.includes(option))
      setValue((Array.isArray(value) ? value : []).filter(item => !group.includes(item)).concat([option]))
    }

    const selected = option => (value || []).includes(option)

    return <div className='options'>
      {options.map((optionsCollection, index) =>
        <div key={index} className='options-collection'>
          {optionsCollection.map((option, index) => <div key={index} className={`${selected(option) ? 'selected' : ''} option`} onClick={() => update(option)}>
            <Uncalculated value={option} />
          </div>)}
        </div>
      )}
    </div>
  }

  const selected = option => (value === option)

  return <div className='options'>
    {options.map((option, index) => <div key={index} className={`${selected(option) ? 'selected' : ''} option`} onClick={() => setValue(option)}>
      <Uncalculated value={option} />
    </div>)}
  </div>
}

FieldChoice.initialValue = []
