import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../helpers/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    } else if (file.fieldname === "background") {
      folder = "background";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: file.originalname,
      // transformation: [
      //   { width: 350, height: 350 },
      //   { width: 700, height: 700 },
      // ],
    };
  },
});

const upload = multer({ storage });

export default upload;
