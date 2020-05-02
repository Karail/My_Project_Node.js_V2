import React from 'react'
import Select from 'react-select';

export const ProfileSelectList = ({
  optionsCategory,
  optionsModel,
  optionsStudio,
  valueCategory,
  valueStudio,
  valueModel
}) => {
  console.log(valueCategory);
  return (
    <div>
      <div>
        <Select
          placeholder="Категории"
          options={optionsCategory}
          isMulti
          name="category"
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <div>
        <Select
          placeholder="Модели"
          options={optionsModel}
          isMulti
          name="model"
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <div>
        <Select
          placeholder="Студии"
          options={optionsStudio}
          isMulti
          name="studio"
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  )

}