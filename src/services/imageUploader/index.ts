"use server"
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const uploadImage = async(image:string)=>{
    try {
        const result = await cloudinary.uploader.upload(image, {
            resource_type: "auto",
        })
        // console.log(result)
        return result.url
        // const autoCropUrl = cloudinary.url(result.public_id, {
        //     crop: 'auto',
        //     gravity: 'face:center',
        //     width: 500,
        //     height: 500,
        // });
        // return autoCropUrl
    } catch (error) {
        console.log(error)
    }

}