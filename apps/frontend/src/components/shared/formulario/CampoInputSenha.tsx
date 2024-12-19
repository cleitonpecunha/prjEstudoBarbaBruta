import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { useState } from "react"

export interface CampoInputSenhaProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChangeText?: (s: string) => void
}

export default function CampoInputSenha(props: CampoInputSenhaProps) {

    const [mostrarSenha, setMostrarSenha] = useState(false)
    
    function alternarMostrarSenha() {
        setMostrarSenha(!mostrarSenha)
    } 

    return (
        <div className="flex input">
            <input 
                type={mostrarSenha ? 'text' : 'password'}
                value={props.value}
                onChange={(e) => {
                    props.onChange?.(e)
                    props.onChangeText?.(e.target.value)
                }}
                placeholder={props.placeholder} 
                //className="input"
                className="flex-1 bg-transparent outline-none"
            />
            {mostrarSenha ? (
                <IconEyeOff onClick={alternarMostrarSenha} className="text-zinc-400" />
            ) : (
                <IconEye onClick={alternarMostrarSenha} className="text-zinc-400" />
            )}                        
        </div>
    )

}