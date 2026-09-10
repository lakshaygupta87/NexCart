import ImageKit from "@imagekit/nodejs"
import { config } from "../config/config.js"

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT
})

export const upload = async({buffer,fileName ,folder="Nexcart"})=>{
    const result = await client.files.upload({
        file:await ImageKit.toFile(buffer),
        fileName,
        folder
    })

    return result 
}