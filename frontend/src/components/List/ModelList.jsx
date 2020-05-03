import React from 'react'

export const ModelList = (props) => {

  const { items, setSearchQuery, Card } = props

  return (
    <div>
      <div className="main-srearch">
        <input type="text" id="search" className="header-main-search__item" placeholder="Поиск..." onChange={e => { setSearchQuery(e.target.value) }} />
      </div>
      <div className="main-content">
        {
          items.map((elem, i) => (<Card {...elem} key={i} {...props} />))
        }
      </div>
    </div>
  )
}