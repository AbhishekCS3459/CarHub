// pages/api/test.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface TestResponse {
    message: string;
    timestamp: string;
}

// A simple test API route
export default function handler(req: NextApiRequest, res: NextApiResponse<TestResponse>) {
    if (req.method === 'GET') {
        res.status(200).json({
            message: 'Test route is working!',
            timestamp: new Date().toISOString(),
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed`, timestamp: new Date().toISOString() });
    }
}
