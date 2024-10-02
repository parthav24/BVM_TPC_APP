import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { company_id,company_name,uid } = req.body; // Make sure to pass companyId and userId in request body

        const __filename = fileURLToPath(import.meta.url);
        console.log(company_name,uid);
        
        // Define the directory where resumes will be stored, structured by company and user
        const uploadDir = path.join(path.dirname(__filename), `../uploads/resumes/${company_name}_${company_id}`);

        // Check if directory exists, if not, create it
        fs.mkdirSync(uploadDir, { recursive: true });

        cb(null, uploadDir); // Set the destination to the dynamically created folder
    },
    filename: (req, file, cb) => {
        // Keep the original file name, or you can rename it if necessary
        const {uid} = req.body;
        cb(null, uid+".pdf");
    }

});

// File filter for valid file types (e.g., PDFs)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only PDF files are allowed'), false); // Reject file
    }
};

// Multer upload instance with file size limits
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

export default upload;
