import React from 'react'
import { ProfileSelectList } from './ProfileSelectList';
export const ProfileEdit = (props) => {
    const { editVideo, name, privateCheck } = props
    return (
        <div className="profile">
            <form onSubmit={editVideo}>
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
                    />
                </div>
                <ProfileSelectList {...props} />

                <button type="submit">Изменить</button>
            </form>
        </div>
    )

}