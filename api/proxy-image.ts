import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const imageUrl = req.query.url as string;
    
    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    // Fetch image with authentication if needed
    const fetchOptions: RequestInit = {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    };

    // Add basic auth if LocalWP credentials are available
    if (process.env.LOCALWP_USERNAME && process.env.LOCALWP_PASSWORD) {
      const credentials = Buffer.from(
        `${process.env.LOCALWP_USERNAME}:${process.env.LOCALWP_PASSWORD}`
      ).toString('base64');
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Authorization': `Basic ${credentials}`,
      };
    }

    const response = await fetch(imageUrl, fetchOptions);
    
    if (!response.ok) {
      console.error(`[API] Failed to fetch image: ${imageUrl} - ${response.status}`);
      return res.status(response.status).json({ message: "Failed to fetch image" });
    }

    // Get content type from response
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    // Cache for 1 hour on Vercel edge
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    // Stream the image to the client
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('[API] Error proxying image:', error);
    res.status(500).json({ 
      message: 'Error proxying image',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
