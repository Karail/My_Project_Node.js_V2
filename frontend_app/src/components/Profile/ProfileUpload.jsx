import React from 'react'
import Select from 'react-select';

export const ProfileUpload = ({ uploadVideo, optionsCategory, optionsStudio, optionsModel }) => {

  return (
    <div className="profile">
      <form onSubmit={uploadVideo}>
        <div>
          <input
            type="text"
            placeholder="Название"
            name="name"
            className="inp-def"
          />
        </div>
        <div>
          <label htmlFor="" className="text-def">
            <input
              type="file"
              name="file"
            />
          </label>
        </div>
        <div>
          <p className="text-def">Сделать приватным</p>
          <input
            type="checkbox"
            name="privateType"
          />
        </div>
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
        <button type="submit">Отправить</button>
      </form>
    </div>
  )

}