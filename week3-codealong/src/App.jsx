import { useState } from 'react'
import SearchList from './SearchList.jsx'
import Posts from './Posts.jsx'

function App() {
  const [showPosts, setShowPosts] = useState(true)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Week 3 code-along</h1>
      <SearchList />
      <button 
        type="button" 
        onClick={() => setShowPosts(!showPosts)}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
      >
        {showPosts ? 'Hide' : 'Show'} posts
      </button>
      {showPosts && <Posts />}
    </div>
  )
}

export default App