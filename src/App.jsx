import { useState, useEffect } from 'react'
const App = () => {

  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    switch(userChoice + computerChoice) {
      case 'tesourapapel':
      case 'pedratesoura':
      case 'papelpedra':
        setResult({label: 'You win', bgResult: 'bg-green-500'})
        break
      case 'papeltesoura':
      case 'tesourapedra':
      case 'pedrapapel':
        setResult({label: 'You lose', bgResult: 'bg-red-500'})
        break
      case 'papelpapel':
      case 'pedrapedra':
      case 'tesouratesoura':
        setResult({label: 'Its a draw', bgResult: 'bg-yellow-500'})
        break
      default:
        break
    }
  }, [userChoice, computerChoice])

  const choices = ['pedra', 'papel', 'tesoura']

  const choicesEmoji = {
    pedra: '✊',
    papel: '✋',
    tesoura: '✌',
  }


  const handleClick = (value) => {
    setUserChoice(value)
    generateComputerChoice()
    setIsLoading(true)
    
    setTimeout(() =>{
      setIsLoading(false)
    }, 750)
  }

  const generateComputerChoice = () => {
    setComputerChoice(choices[Math.floor(Math.random() * choices.length)])
  }


  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {!isLoading && (
        <div className={`absolute top-0 inset-x-0 py-3 md:py-5 text-center text-4xl md:text-5xl text-white font-semibold ${result.bgResult}`}>
          {result.label}
        </div>
      )}
      <div class="flex-1 flex items-center text-6xl md:text-7xl">
        <div className="grid grid-cols-2 text-center gap-5">
          {isLoading ? (
            <>
              <span className="wiggle">✊</span>
              <span className="wiggle wiggle-reverse">✊</span>
            </>
          ) : (
            <>
              <span>{choicesEmoji[userChoice]}</span>
              <span>{choicesEmoji[computerChoice]}</span>
            </>
          )}

          {computerChoice && (
            <>
              <div class="bg-green-500 text-3xl text-white rounded">YOU</div>
              <div class="bg-red-500 text-3xl text-white rounded">CPU</div>
            </>
          )}
        </div>

      </div>
      <div className="mt-10 pb-10 text-7xl md:text-9xl">
        {choices.map(choice => (
          <button onClick={() => handleClick(choice)}>{choicesEmoji[choice]}</button>)
        )}
      </div>
    </div>
  );
}

export default App;