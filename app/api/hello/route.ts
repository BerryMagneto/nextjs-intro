export async function GET() {
  const data = {
    name: 'Darnell',
    role: 'Front End Developer',
    stack: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
    available: true,
  }

  return Response.json(data)
}