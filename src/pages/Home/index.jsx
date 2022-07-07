import React, { useState, useEffect } from 'react'
import './style.css'
import { Card } from '../../components/Card'

export function Home() {
  const [count, setCount] = useState(0)

  const [studentName, setStudentName] = useState()
  const [student, setStudent] = useState([])
  const [user, setUser] = useState({name: '', userAvatar: ''})

  function handleAddStudent(){
    const newStudent={
      name: studentName,
      time: new Date().toLocaleDateString('pt-br',{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudent(prevState => [...prevState, newStudent])

  }

  useEffect(()=>{
      fetch('https://api.github.com/users/zeklicby')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          userAvatar: data.avatar_url
        })
      })
      .catch(error => console.error(error))
  },[])

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.userAvatar} alt="" />
        </div>
      </header>
      <input type="text" placeholder="Digite seu nome" onChange={e => setStudentName(e.target.value)}/>
      <button onClick={handleAddStudent}>Adicionar</button>

      {
        student.map(student => (
          <Card 
            key={student.time}
            name={student.name}
            time={student.time}
           />
        ))
      }
    </div>
  )
}