import React from 'react'

const Button = ({ setPage, name }) => (
  <button onClick={() => setPage(name)}>
    {name === 'add' ? 'add book' : name}
  </button>
)

const Menu = ({ onMenuClick, token, logOutHandler }) => {
  return (
    <div>
      <Button name='authors' setPage={onMenuClick} />
      <Button name='books' setPage={onMenuClick} />
      {token ? (
        <>
          <Button name='add' setPage={onMenuClick} />
          <Button name='recommended' setPage={onMenuClick} />
          <Button
            name='logout'
            setPage={() => {
              onMenuClick('logout')
              logOutHandler()
            }}
          />
        </>
      ) : (
        <Button name='login' setPage={onMenuClick} />
      )}
    </div>
  )
}

export default Menu
