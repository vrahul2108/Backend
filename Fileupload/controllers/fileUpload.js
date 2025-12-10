const File = require('../models/File');
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res)=>{
    try{
        const file = req.files.file;

        console.log(file);
        
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log(path);

        file.mv(path, (e)=>{
            console.log(e);
            
        })

        res.json({
            success: true,
            message : "Local File Uploaded"
        })
        
    }catch(e){
        console.log(e);
        
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

 async function uploadFileCloudinary(file, folder,quality){
    const options = { 
        folder,
        resource_type : 'auto',
        transformation:[
            {
            width: 600,
            height: 600,
            crop: "limit",
            quality: quality}
        ]
     };
    
    if(quality){
        options.transformation.push({
            width: 600,
            height: 600,
            crop: "limit",  // prevents stretching
            quality: quality
        });
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
 }

exports.imageUpload = async(req, res)=>{
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        
        const file = req.files.imageFile;
        console.log(file);
        
        //validation
        const supportedTypes = [ "png", "jpeg","jpg"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        
        if(!isFileTypeSupported(fileType, supportedTypes)){
            
            return res.status(400).json({
                success: false,
                message:"File Not Supported"
            })
        }

        
       
        console.log("hvcjhvsd");
        //if file format supported
        const response = await uploadFileCloudinary(file, "StudyNotion");
        
        
        console.log(response);
        
        //db me entry save krte h
        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl: response.secure_url
        })

         res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image uploaded'
         })
         
    }catch(e){
        res.status(400).json({
            success: false,
            message: "Not uploaded"
        })
    }
}

exports.videoUpload = async(req, res)=>{
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = [ "mp4", "mvop"];

        const fileType = file.name.split('.')[1].toLowerCase();
        // console.log(fileType);
        
        const maxSize = 10 * 1024 * 1024;
        if(!isFileTypeSupported(fileType, supportedTypes) || file.size > maxSize ){
            
            return res.status(400).json({
                success: false,
                message:"File Not Supported"
            })
        }

        //if file format supported
        const response = await uploadFileCloudinary(file, "StudyNotion");
        
        
        // console.log(response);
        
        //db me entry save krte h
        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl: response.secure_url
        })

         res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image uploaded'
         })
    }catch(e){
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.imageResizer = async(req, res)=>{
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = [ "png", "jpg", "jpeg"];

        const fileType = file.name.split('.')[1].toLowerCase();
        // console.log(fileType);
        
        if(!isFileTypeSupported(fileType, supportedTypes)){
            
            return res.status(400).json({
                success: false,
                message:"File Not Supported"
            })
        }

        //if file format supported
        const response = await uploadFileCloudinary(file, "StudyNotion",20);
        
        
        // console.log(response);
        
        //db me entry save krte h
        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl: response.secure_url
        })

         res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Resized Image uploaded'
         })
    }catch(e){
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}