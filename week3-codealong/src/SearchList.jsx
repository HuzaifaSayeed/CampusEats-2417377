import { useState } from 'react'

const fruits = [
  'Durian',
  'Rambutan',
  'Mangosteen',
  'Papaya',
  'Pineapple',
  'Jackfruit',
  'Banana',
  'Mango',
]

function SearchList() {
  const [query, setQuery] = useState('')

  // Derived from state on every render, not stored in state
  const visible = fruits.filter((f) =>
    f.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="box" style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
      <h2>Search</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a fruit..."
      />
      <p>{visible.length} match(es)</p>
      <ul>
        {visible.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchList