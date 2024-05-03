// import path from "path";

// import multer from "multer";

// import HttpError from "../helpers/HttpError.js";

// const destination = path.resolve("tmp");

// const storage = multer.diskStorage({
//   destination,
//   filename: (req, file, callback) => {
//     const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const filename = `${uniquePrefix}_${file.originalname}`;
//     callback(null, filename);
//   },
// });

// const limits = {
//   fileSize: 1024 * 1024 * 5,
// };

// const fileFilter = (req, file, callback) => {
//   const extension = file.originalname.split(".").pop();
//   if (extension === "exe") {
//     return callback(HttpError(400, ".exe not valid extension format"));
//   }
//   callback(null, true);
// };

// const upload = multer({
//   storage,
//   limits,
//   fileFilter,
// });

// export default upload;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../helpers/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine the folder based on file properties or request data
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    } else if (file.fieldname === "background") {
      folder = "background";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"], // Adjust the allowed formats as needed
      public_id: file.originalname, // Use original filename as the public ID
      // transformation: [
      //   { width: 350, height: 350 },
      //   { width: 700, height: 700 },
      // ],
    };
  },
});

const upload = multer({ storage });

export default upload;
