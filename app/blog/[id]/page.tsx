import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

interface Post {
  id: number
  title: string
  body: string
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)
  return res.json()
}


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = await getPost(id)
  return {
    title: `${post.title} | DJ`,
    description: post.body,
  }
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="max-w-4xl mx-auto py-16">
        <Link href="/blog" className="text-[#00BFFF] text-sm hover:underline mb-8 inline-block">← Back to Blog</Link>
        <Image
          src={`https://picsum.photos/seed/${post.id}/800/400`}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-xl mb-8"
        />
        <h1 className="text-4xl font-bold mb-6 capitalize">{post.title}</h1>
        <p className="text-gray-400 leading-relaxed">{post.body}</p>
      </div>
    </main>
  )
}