export default function OptionsStep ({ className, title, options, Option, select, selected }) {
  return <div className={`options step ${className}`}>
    <div className='title'>{title}</div>
    <div className='options'>
      {options.map((option, index) => <div key={index} className={`${selected(option) ? 'selected' : ''} option`} onClick={() => select(option)}>
        <Option option={option}/>
      </div>)}
    </div>
  </div>
}
