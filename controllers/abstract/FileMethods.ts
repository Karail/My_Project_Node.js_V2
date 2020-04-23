

import fs from 'fs';

export default abstract class FileMethods {

    static async readFile(path: string): Promise<Buffer> {

        return new Promise((resolve, reject) => {
            fs.readFile(path, async (err, data) => {
                if (err)
                    return reject(err)
                resolve(data)
            })
        })

    }

    static deleteFile(filePath: string): Promise<boolean> {

        return new Promise((reslove, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) return reject(err)
                reslove(true)
            });
        })

    }

} 