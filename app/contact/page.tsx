'use client'

import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })

    const data = await res.json()

    if (data.success) {
      setSubmitted(true)
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-black text-white pt-24 px-6">
        <div className="max-w-2xl mx-auto py-16">
          <h1 className="text-5xl font-bold mb-4">Message Sent!</h1>
          <p className="text-gray-400 mb-8">Thanks for reaching out. I'll get back to you soon.</p>
          <button
            onClick={() => {
              setSubmitted(false)
              setName('')
              setEmail('')
              setMessage('')
            }}
            className="text-[#00BFFF] text-sm hover:underline"
          >
            ← Send another message
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="max-w-2xl mx-auto py-16">
        <h1 className="text-5xl font-bold mb-4">Contact</h1>
        <p className="text-gray-400 mb-12">Get in touch with me.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00BFFF] transition-colors"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00BFFF] transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00BFFF] transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00BFFF] text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  )
}