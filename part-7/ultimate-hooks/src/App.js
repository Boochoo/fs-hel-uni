import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => setValue('')

  return {
    type,
    value,
    onChange,
    clear,
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(baseUrl)

        setResources(data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [baseUrl])

  const create = async (resource) => {
    try {
      const { data } = await axios.post(baseUrl, resource)

      setResources([...resources, data])
    } catch (error) {
      console.log(error)
    }
  }

  const service = {
    create,
  }

  return [resources, service]
}
const notesApi = 'http://localhost:3005/notes'
const personApi = 'http://localhost:3005/persons'
const App = () => {
  const { clear: clearContent, ...content } = useField('text')
  const { clear: clearName, ...name } = useField('text')
  const { clear: clearNumber, ...number } = useField('text')

  const [notes, noteService] = useResource(notesApi)
  const [persons, personService] = useResource(personApi)

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })

    clearContent()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })

    clearName()
    clearNumber()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
