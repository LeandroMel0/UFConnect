import multer from "multer";
import path from "path";


const storage =  multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + path.extname(file.originalname));
  }
});

//console.log("Multer storage configured to save files in 'src/uploads' directory with unique filenames.");
const upload = multer({storage});

export default upload;

