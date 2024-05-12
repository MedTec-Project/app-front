import React from 'react'
import './Tittle.scss'

export default function Tittle(props) {
  return (
    <div className='tittle-container'>
      <h1 className={`tittle ${props.tamanho || 'gg'} ${props.cor || 'dark'}`}>{props.texto}</h1>
    </div>
  )
}