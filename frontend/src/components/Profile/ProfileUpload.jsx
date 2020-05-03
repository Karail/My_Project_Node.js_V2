import React from 'react'
import { ProfileSelectList } from './ProfileSelectList';
export const ProfileUpload = (props) => {
    const { uploadVideo, name, privateCheck, onInputChangePrivate } = props
    return (
        <div className="profile">
            <form onSubmit={uploadVideo}>
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
                        value={privateCheck}
                        type="checkbox"
                        name="privateType"
                        onChange={onInputChangePrivate}
                    />
                </div>
                <ProfileSelectList {...props} />

                <button type="submit">Отправить</button>
            </form>
        </div>
    )

}