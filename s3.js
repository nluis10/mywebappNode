require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')


const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

//Subir archivo a S3
function uploadFile(file){

    const fileStream = fs.createReadStream(file.path)
    
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename
    }
    
    return s3.upload(uploadParams).promise()

}
exports.uploadFile = uploadFile

//Download files from S3
function getFileStream(fileKey){
    const downloadParams = {
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET_NAME
    }

    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream
