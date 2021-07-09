import { useState, useEffect } from 'react'
const App = () => {

  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userScore, setUserScore] = useState(0)
  const [cpuScore, setCpuScore] = useState(0)

  useEffect(() => {
    if (userChoice) {
      switch(userChoice.label + computerChoice.label) {
        case 'tesourapapel':
        case 'pedratesoura':
        case 'papelpedra':
          setResult({label: 'You win', bgResult: 'bg-green-500'})
          setTimeout(() => {
            setUserScore(s => s+1)
          }, 750);
          break
        case 'papeltesoura':
        case 'tesourapedra':
        case 'pedrapapel':
          setResult({label: 'You lose', bgResult: 'bg-red-500'})
          setTimeout(() => {
            setCpuScore(s => s+1)
          }, 750);
          break
        case 'papelpapel':
        case 'pedrapedra':
        case 'tesouratesoura':
          setResult({label: 'Its a draw', bgResult: 'bg-yellow-500'})
          break
        default:
          break
      }
    }
  }, [userChoice, computerChoice])
  
  const choicesArr = [
    {
      label: 'pedra',
      emoji: '✊'
    },
    {
      label: 'papel',
      emoji: '✋'
    },
    {
      label: 'tesoura',
      emoji: '✌'
    },
  ]


  const handleClick = (value) => {
    setUserChoice(value)
    generateComputerChoice()
    setIsLoading(true)
    
    setTimeout(() =>{
      setIsLoading(false)
    }, 750)
  }

  const generateComputerChoice = () => {
    setComputerChoice(choicesArr[Math.floor(Math.random() * choicesArr.length)])
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {!isLoading && (
        <div className={`absolute top-0 inset-x-0 py-3 md:py-5 text-center text-4xl md:text-5xl text-white font-semibold ${result.bgResult}`}>
          {result.label}
        </div>
      )}
      <div className="flex-1 flex items-center text-6xl md:text-7xl">
        {userChoice && (
          <div className="grid grid-cols-2 text-center gap-5">
            {isLoading ? (
              <>
                <span className="wiggle">✊</span>
                <span className="wiggle wiggle-reverse">✊</span>
              </>
            ) : (
              <>
                <span>{userChoice.emoji}</span>
                <span>{computerChoice.emoji}</span>
              </>
            )}

            {computerChoice && (
              <>
                <div className="bg-green-500 text-3xl text-white rounded">YOU</div>
                <div className="bg-red-500 text-3xl text-white rounded">CPU</div>
                <div className="col-span-2 grid grid-cols-5">
                  <div className="col-span-2 bg-green-500 text-3xl text-white rounded-l">{userScore}</div>
                  <div className="col-span-1 bg-gray-800 text-3xl text-white">X</div>
                  <div className="col-span-2 bg-red-500 text-3xl text-white rounded-r">{cpuScore}</div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 pb-10 text-7xl md:text-9xl">
        {choicesArr.map(choice => (
          <button key={choice} onClick={() => handleClick(choice)} disabled={isLoading}>
            {choice.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
