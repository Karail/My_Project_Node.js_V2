import React from 'react'
import { ProfileSelectList } from './ProfileSelectList';
export const ProfileEdit = (props) => {
    const { name, privateCheck, onInputChangePrivate, removeMy, editMy } = props
    return (
        <div className="profile">
            <form onSubmit={editMy}>
                <div>
                    <input
                        defaultValue={name}
                        type="text"
                        placeholder="Название"
                        name="name"
                        className="inp-def"
                    />
                </div>
                <div>
                    <p className="text-def">Сделать приватным</p>
                    <input
                        checked={privateCheck}
                        type="checkbox"
                        name="privateType"
                        onChange={onInputChangePrivate}
                    />
                </div>
                <ProfileSelectList {...props} />

                <button type="submit" className="btn-def">Изменить</button>
                <button className="btn-def" type="button" onClick={removeMy}>Удалить</button>
            </form>
        </div>
    )

}