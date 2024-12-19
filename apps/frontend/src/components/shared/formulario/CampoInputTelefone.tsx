export interface CampoInputTelefoneProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChangeText?: (s: string) => void
}

export default function CampoInputTelefone(props: CampoInputTelefoneProps) {    

    return (        
        <input 
            type={'tel'}
            value={props.value}
            onChange={(e) => {
                props.onChange?.(e)
                props.onChangeText?.(e.target.value)
            }}
            placeholder={props.placeholder} 
            className="input"
        />
    )
}