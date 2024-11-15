export async function GET() {
    const res = await fetch('https://api.vercel.app/blog');
    const data = await res.json();
    return Response.json(data);
  }