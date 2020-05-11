import React, { useState, useEffect } from 'react'

import personsService from './services/persons'

import Form from './components/Form'
import FilterInput from './components/FilterInput'
import Notification from './components/Notification'
import Persons from './components/Persons'

import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorType, setNotificationType] = useState('success')

  useEffect(() => {
    personsService
      .getAll()
      .then(({ data }) => setPersons(data))
      .catch(({ response }) => {
        const { data } = response
        console.log(data.error)

        updateErrorMessage(data.error)
      })
  }, [])

  const updateSuccessState = (message, newValues) => {
    setNotificationType('success')
    setNotificationMessage(`${message} ${newName}`)
    setTimeout(() => setNotificationMessage(null), 3000)

    setPersons(newValues)
    setNewName('')
    setNewNumber('')
  }

  const updateErrorMessage = (message) => {
    setNotificationType('error')
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage(null), 3000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const hasIndex = persons.findIndex((p) => p.name === newName) > -1
    const newData = {
      name: newName,
      number: newNumber,
    }

    personsService
      .create(newData)
      .then((response) => {
        updateSuccessState('Added', [...persons, newData])
      })
      .catch(({ response }) => {
        const { data } = response
        console.log(data.error)
        updateErrorMessage(data.error)
      })

    if (!hasIndex) return null

    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      )
    ) {
      const { id } = persons.filter((v) => v.name === newName)[0]
      const currentPerson = persons.find((p) => p.id === id)
      const updatedPerson = { ...currentPerson, ...newData }

      personsService
        .update(id, updatedPerson)
        .then((response) => {
          const filterPerson = persons.map((person) =>
            person.id !== id ? person : response
          )

          updateSuccessState('Updated', filterPerson)
        })
        .catch(({ response }) => {
          const { data } = response
          console.log(data.error)
          updateErrorMessage(data.error)
        })
    }
  }

  const handleNameChange = ({ target }) => setNewName(target.value)
  const handleNumberChange = ({ target }) => setNewNumber(target.value)
  const handleSearch = ({ target }) => setSearchTerm(target.value)

  const filterList = (list) =>
    list.filter(({ name }) => {
      return name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    })

  const deleteHandler = (id) => {
    const { name } = persons.filter((person) => person.id === id)[0]

    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .deleteItem(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id))
          updateErrorMessage(`Deleted ${name}`)
        })
        .catch(({ response }) => {
          const { data } = response
          console.log(data.error)
          updateErrorMessage(data.error)
        })
    }
  }

  const personsList = !searchTerm ? persons : filterList(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={errorType} />
      <FilterInput name={searchTerm} handler={handleSearch} />

      <h2>Add a new</h2>
      <Form
        submitHandler={handleSubmit}
        nameValue={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsList={personsList} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App
