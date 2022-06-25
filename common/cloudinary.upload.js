const cloudinary = require('cloudinary').v2 ;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

const fileToBase64 = (mimetype, data) => {
    const base64Buffer = Buffer.from(data).toString('base64');
    return 'data:' + mimetype + ';base64,' + base64Buffer;
}

const cloudinaryImageUpload = async file => {

    const imageBase64 = fileToBase64(file.mimetype, file.data); //use tempdir to avoid using node fs
    const { url } = await cloudinary.uploader.upload( imageBase64, {folder:`Takichai/Images`});
    return { url };

}

const cloudinaryAudioUpload = async file  => {

    const audioBase64 = fileToBase64(file.mimetype, file.data); //use tempdir to avoid using node fs
    const { url, duration } = await cloudinary.uploader.upload( audioBase64, {
        folder: 'Takichai/Songs',
        resource_type: 'video',
        image_metadata: true
    });

    return { url, duration };

}

const cloudinaryDelete = (photoUrl, folder) => {

    const splittedUrl = photoUrl.split('/');
    const [ name ] = splittedUrl[splittedUrl.length-1].split('.');//get public_id and  cut the extension
    cloudinary.uploader.destroy( `Takichai/${folder}/${name}` );

}

module.exports = {
    cloudinaryAudioUpload,
    cloudinaryImageUpload,
    cloudinaryDelete
}