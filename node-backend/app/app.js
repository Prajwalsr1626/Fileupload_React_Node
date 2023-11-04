import express from 'express';
import { diskStorage } from 'multer';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3001;

app.use(cors());

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Relative path to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const originalFilename = file.originalname;
    const filePath = path.join('./uploads', originalFilename);

    // Check if the file with the same name already exists
    if (fs.existsSync(filePath)) {
      return cb(new Error('File already exists'));
    } else {
      cb(null, originalFilename);
    }
  },
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (req.file) {
      res.send('File uploaded successfully');
    } else {
      res.status(400).send('No file was uploaded.');
    }
  } catch (error) {
    
    if (error.message === 'File already exists') {
      res.status(409).send('File with the same name already exists');
    } else {
      console.error('File upload failed:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
