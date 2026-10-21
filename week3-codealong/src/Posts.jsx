import { useEffect, useState } from 'react'

const URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5'

function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setPosts)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    // Cleanup function: cancels fetch if component unmounts
    return () => controller.abort()
  }, []) // Runs once on initial render

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error" style={{ color: 'red' }}>Error: {error}</p>

  return (
    <div className="box" style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Latest posts</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Posts