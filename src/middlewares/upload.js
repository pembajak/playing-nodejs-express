import multer, { MulterError } from "multer";
import path from "path";
import sharp from "sharp";
import { BadRequestError} from '../utils/api-errors.js'


const multerConfig =  {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new MulterError("LIMIT_INVALID_TYPE"));
    }

    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  storage: multer.memoryStorage(),
}


const upload =  async (req, res, next) => {

  const upload = multer(multerConfig).single("files");

  await upload(req, res,(err) => {
    if (err) {
      try {
        switch (err.code) {
          case "LIMIT_INVALID_TYPE":
            throw new BadRequestError("Format Image tidak sesuai");

          default:
            throw new BadRequestError("Something went wrong!");
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
        return;
      }
    }
    
    try {
      const filename = `${Date.now()}${path.extname(req.file.originalname)}`;
      const saveTo = path.resolve( "public", "images");
      const filePath = path.join(saveTo, filename);

       sharp(req.file.buffer)
        .jpeg({ quality: 30 })
        .toFile(filePath);

      req.headers.file = filename;

      next();
    } catch (err) {
      res.status(400).json({ message: err.message });
      return;
    }
  });
};

export default upload
