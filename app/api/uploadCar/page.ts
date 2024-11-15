// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { createRouter } from 'next-connect';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { bucketName, s3 } from '@/lib/aws';

interface ExtendedNextApiRequest extends NextApiRequest {
    file: Express.MulterS3.File;
    body: {
        name: string;
        type: string;
        price: number;
        location: string;
        features: string[];
        status: string;
    };
}

// Function to set up the MongoDB collection
async function setupCarsCollection() {
    const client = await clientPromise;
    const db = client.db('carDB');
    const carsCollection = db.collection('cars');

    // Create necessary indexes if they don't exist
    await carsCollection.createIndex({ name: 1, location: 1 });
    console.log('Cars collection set up with indexes.');
}

// Call setup function once at route initialization
setupCarsCollection().catch(console.error);

// Configure multer to use S3 storage
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
        key: (req, file, cb) => cb(null, `cars/${Date.now()}_${file.originalname}`),
    }),
});

// Create a Next Connect router
const router = createRouter<ExtendedNextApiRequest, NextApiResponse>();

// Use multer for handling single file uploads
router.use(upload.single('carImage'));

// Define the POST request handler
router.post(async (req, res) => {
    try {
        const { name, type, price, location, features, status } = req.body;
        const imageUrl = req.file.location; // S3 URL for the uploaded image

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('carDB');
        const carsCollection = db.collection('cars');

        // Define car data according to the schema
        const carData = {
            name,
            type,
            image: imageUrl,
            price: Number(price), // Ensure price is stored as a number
            location,
            features,
            status,
        };

        // Insert car data into MongoDB
        const result = await carsCollection.insertOne(carData);

        res.status(200).json({ message: 'Car uploaded successfully', data: result });
    } catch (error) {
        console.error('Error uploading car:', error);
        res.status(500).json({ error: 'Failed to upload car' });
    }
});

// Disable body parsing for multer
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// Export the handler with error handling
export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(500).end(err.message);
    },
});
