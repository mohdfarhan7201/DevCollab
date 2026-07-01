const cloudinary = require("../config/cloudinary");

const uploadImage = async (fileBuffer) => {

    return new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream(
            {
                folder: "devcollab",
            },
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        ).end(fileBuffer);

    });

};

const deleteImage = async (publicId) => {

    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);

};

module.exports = {
    uploadImage,
    deleteImage,
};