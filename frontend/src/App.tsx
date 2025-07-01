import { useState } from 'react'
import './App.css'

const COMEDIANS = [
  'Dave Chappelle',
  'Russell Peters',
  'Sacha Baron Cohen',
  'Ali Wong',
  'Hannah Gadsby',
  'Aziz Ansari'
] as const;

type Comedian = typeof COMEDIANS[number];

type PersonalityToggle = {
  name: 'EI' | 'NS' | 'TF' | 'JP';
  left: string;
  right: string;
  leftDesc: string;
  rightDesc: string;
};

const PERSONALITY_TOGGLES: PersonalityToggle[] = [
  {
    name: 'EI',
    left: 'E',
    right: 'I',
    leftDesc: 'Energized by social interaction',
    rightDesc: 'Energized by alone time'
  },
  {
    name: 'NS',
    left: 'N',
    right: 'S',
    leftDesc: 'Focus on possibilities and patterns',
    rightDesc: 'Focus on concrete facts and details'
  },
  {
    name: 'TF',
    left: 'T',
    right: 'F',
    leftDesc: 'Decisions based on logic',
    rightDesc: 'Decisions based on feelings'
  },
  {
    name: 'JP',
    left: 'J',
    right: 'P',
    leftDesc: 'Prefer structure and planning',
    rightDesc: 'Prefer flexibility and spontaneity'
  }
];

function App() {
  const [intensity, setIntensity] = useState(50)
  const [comedian, setComedian] = useState<Comedian>('Dave Chappelle')
  const [personalityToggles, setPersonalityToggles] = useState({
    EI: 'E',
    NS: 'N',
    TF: 'T',
    JP: 'J'
  })
  const [randomFact, setRandomFact] = useState('')
  const [roast, setRoast] = useState('')
  const [loading, setLoading] = useState(false)

  const handleToggle = (name: PersonalityToggle['name'], value: string) => {
    setPersonalityToggles(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getPersonalityType = () => {
    return `${personalityToggles.EI}${personalityToggles.NS}${personalityToggles.TF}${personalityToggles.JP}`
  }

  const handleRoast = async () => {
    if (!randomFact.trim()) {
      alert('Please enter a random fact about yourself!')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intensity,
          comedian,
          personalityType: getPersonalityType(),
          randomFact
        }),
      })

      const data = await response.json()
      setRoast(data.roast)
    } catch (error) {
      console.error('Error:', error)
      setRoast('Failed to generate roast. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>🔥 Roast Bot</h1>
      
      <div className="input-section">
        <div className="slider-container">
          <label htmlFor="intensity">Roast Intensity: {intensity}%</label>
          <input
            type="range"
            id="intensity"
            min="1"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="comedian-select">
          <label htmlFor="comedian">Choose Comedian Style:</label>
          <select
            id="comedian"
            value={comedian}
            onChange={(e) => setComedian(e.target.value as Comedian)}
            className="select-input"
          >
            {COMEDIANS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="personality-section">
          <h3>Your Personality Type</h3>
          <div className="toggles-container">
            {PERSONALITY_TOGGLES.map(toggle => (
              <div key={toggle.name} className="toggle-group">
                <div className="toggle-buttons">
                  <button
                    className={personalityToggles[toggle.name] === toggle.left ? 'active' : ''}
                    onClick={() => handleToggle(toggle.name, toggle.left)}
                  >
                    {toggle.left}
                  </button>
                  <button
                    className={personalityToggles[toggle.name] === toggle.right ? 'active' : ''}
                    onClick={() => handleToggle(toggle.name, toggle.right)}
                  >
                    {toggle.right}
                  </button>
                </div>
                <p className="toggle-desc">
                  {personalityToggles[toggle.name] === toggle.left ? toggle.leftDesc : toggle.rightDesc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="fact-input">
          <label htmlFor="fact">Share a Random Fact About Yourself:</label>
          <input
            type="text"
            id="fact"
            value={randomFact}
            onChange={(e) => setRandomFact(e.target.value)}
            placeholder="e.g., I collect vintage typewriters"
            className="text-input"
          />
        </div>
      </div>

      <button onClick={handleRoast} disabled={loading} className="roast-button">
        {loading ? 'Roasting...' : 'Roast Me!'}
      </button>

      {roast && (
        <div className="roast-container">
          <p>{roast}</p>
        </div>
      )}
    </div>
  )
}

export default App
