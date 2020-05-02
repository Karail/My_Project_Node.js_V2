import React from 'react'
import Select from 'react-select';

export const ProfileSelectList = ({
  optionsCategory,
  optionsModel,
  optionsStudio,

  valueCategory,
  valueModel,
  valueStudio,

  onInputChangeCategory,
  onInputChangeModel,
  onInputChangeStudio
}) => {
  return (
    <div>
      <div>
        <Select
          value={valueCategory}
          placeholder="Категории"
          options={optionsCategory}
          isMulti
          name="category"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={onInputChangeCategory}
        />
      </div>
      <div>
        <Select
          value={valueModel}
          placeholder="Модели"
          options={optionsModel}
          isMulti
          name="model"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={onInputChangeModel}
        />
      </div>
      <div>
        <Select
          value={valueStudio}
          placeholder="Студии"
          options={optionsStudio}
          isMulti
          name="studio"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={onInputChangeStudio}
        />
      </div>
    </div>
  )

}