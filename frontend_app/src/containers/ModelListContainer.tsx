import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modelActions from '../redux/list/model/model.action'
import * as filterActions from '../redux/list/filter/filter.action'

import { search } from '../func/filter'
import { SearchList } from '../components/List/SearchList'

import { SearchCard } from '../components/Card/SearchCard'

import { itemsModelType } from '../type/model.type'
import { setModelType } from '../redux/list/model/model.type'
import { setSearchQueryType } from '../redux/list/filter/filter.type'

import { rootReducerType } from '../redux/list'

import { ILstContainer } from '../interfaces/ListContainer'



type PropsType = {
  modifier: string
  tableName: string
  setModel: (data: itemsModelType[]) => setModelType,
  serverURL: string,
  model: itemsModelType[],
  setSearchQuery: (value: string) => setSearchQueryType,
}

class ModelListContainer extends React.Component<PropsType> implements ILstContainer {

  setModel = async () => {
    try {
      const { setModel, serverURL, tableName, setSearchQuery } = this.props

      const $seacrh = document.querySelector('#search') as HTMLInputElement

      $seacrh.value = ''

      setSearchQuery('')

      const response = await fetch(`${serverURL}/${tableName}`);
      if (response.status === 500) throw new Error()
      const data: itemsModelType[] = await response.json()

      setModel(data)

    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    this.setModel()
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.model === this.props.model) {
      this.setModel()
    }
  }

  render() {
    const { model, setSearchQuery, modifier } = this.props
    return (
      <SearchList
        items={model}
        setSearchQuery={setSearchQuery}
        modifier={modifier}
        href={'model'}
        Card={SearchCard}
      />
    )
  }
}

//передача данных из redux в компонент
const mapStateToProps = ({ model, filter }: rootReducerType) => ({
  model: model.items && search(model.items, filter.searchQuery),
  isReady: model.isReady,
});

// передача action в компонент
const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators(modelActions, dispatch),
  ...bindActionCreators(filterActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelListContainer)