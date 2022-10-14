import * as Dialog from '@radix-ui/react-dialog'
import './styles/main.css';
import logoImg from './assets/logo.svg'
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import { CreateAdModal } from './components/CreateAdModal';

interface Game{
  id: string,
  tittle: string,
  bannerUrl: string,
  _count:{
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center overflow-hidden  ">
      <img className='my-20' src={logoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black">Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>
    <div className='max-w-6xl'>
    <div className='flex gap-6 mt-16'>
      {games.map(game => {
        return(
          <GameBanner key={game.id} title={game.tittle}  bannerUrl={game.bannerUrl} adsCount={game._count.ads} />
        )
      })}
    </div>
    
    <Dialog.Root>
      <CreateAdBanner/>
      <CreateAdModal/>
    </Dialog.Root>
    </div>
    </div>

  )

}

export default App
