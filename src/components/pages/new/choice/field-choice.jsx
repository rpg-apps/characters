import { Selection } from '../../../presentation/character/selection'

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
          <Selection.Uncalculated options={optionsCollection} selected={selected} select={update} />
        </div>
      )}
    </div>
  }

  const selected = option => (value === option)

  return <Selection.Uncalculated options={options} selected={selected} select={setValue} />
}
