

interface IInputFieldProps {
  name: string
  placeholderText: string
  inputType: 'string' | 'number'
  icon: React.ReactNode
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isValidated: boolean
}

const InputField = ({
  name,
  placeholderText,
  inputType,
  icon,
  onChange,
  isValidated,
}: IInputFieldProps) => {

  return(
    <div className='flex flex-col'>
      <div className='flex flex-row bg-gray-600 rounded-lg align-items-center'>
        <label className='p-3 text-white'>{icon}</label>
        <input className='pl-2 text-xl outline-none rounded-r-lg text-black'
          aria-label={name}
          type={inputType}
          placeholder={placeholderText}
          onChange={onChange}
        />
      </div>
      {isValidated && <p className='text-red-600 text-right'>Required</p>}
    </div>
  )
}

export default InputField