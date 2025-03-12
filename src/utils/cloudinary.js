import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

// Initialize Cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



//ye cloudinary ka sample code h upload krne k liye bt hm isko upload krenge phle apne server p laake and usko sever p s delete krke cloudinary p upload kr denge
// const uploadResult = await cloudinary.uploader
// .upload(
//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
// )
// .catch((error) => {
//     console.log(error);
// });

// console.log(uploadResult); 

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("File uploaded successfully:", uploadResult.secure_url);

        // ✅ Check if file exists before deleting it
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return uploadResult.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        // ✅ Only delete if file exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export { uploadOnCloudinary };