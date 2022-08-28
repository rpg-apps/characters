import { Uncalculated } from './index'
import Title from '../title'

export function Selection ({ className='', title, options=[], classes = (() => ''), selected = (() => false), disabled = (() => false), select, children }) {
  return <div className={`${className} selection`}>
    <Title title={title} />
    <div className='options'>
      {options.map((option, index) =>
        <div key={index} className={`${classes(option)} ${selected(option) ? 'selected' : ''} ${disabled(option) ? 'disabled' : ''} option`} onClick={() => select(option)}>
          {children(option)}
      </div>)}
    </div>
  </div>
}

Selection.Uncalculated = function UncalculatedSelection ({ className='', title, options=[], classes = (() => ''), selected = (() => false), disabled = (() => false), select }) {
  return <Selection className={className} title={title} options={options} classes={classes} selected={selected} disabled={disabled} select={select}>
    {value => <Uncalculated value={value} />}
  </Selection>
}
