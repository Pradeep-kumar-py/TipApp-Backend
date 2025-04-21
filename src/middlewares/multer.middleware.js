// works on local machine
// but not on azure 


// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
    
//     filename: function (req, file, cb) {
//       const uniqueName = `${Date.now()}-${file.originalname}`;
//       cb(null, uniqueName);
//     }

//   })
  
// export const upload = multer({ 
//     storage, 
// })


import multer from "multer";

// Only allow specific file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const storage = multer.memoryStorage();

export const upload = multer({ 
  storage, 
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit - Azure best practice for web apps
  },
  fileFilter
});