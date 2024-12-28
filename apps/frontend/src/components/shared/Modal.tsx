import React from 'react'

export interface ModalProps {
    isOpen: boolean
    setModalOpen: (isOpen: any) => void
    children: any
}

//className='fixed top-0 bottom-0 left-0 right-0 bg-black/70'>
//className='fixed top-1/2 left-1/2 transform-translate(-50%,-50%) p-150px bg-zinc-500 rounded'>

export default function Modal(props: ModalProps) {
  
    if (props.isOpen) {
        return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/70'>
            
            <div className='modal-content modal-overlay bg-zinc-500 text-zinc-200 text-sm'>
                
                <div>                    
                    {props.children}                
                </div>

            </div>

        </div>
        )
    }
    return null
}
  