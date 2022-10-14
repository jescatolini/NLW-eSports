import * as Select from '@radix-ui/react-select';
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from '@radix-ui/react-toggle-group';


import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface Game{
  id: string,
  tittle: string,
  bannerUrl: string,
  _count:{
    ads: number;
  }
}

export function CreateAdModal(){
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  
  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name && !weekDays.map(Number)){
      return
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel: useVoiceChannel
    })

    alert('Anúncio criado com sucesso"')

    } catch (error) {
      alert('Erro ao criar o anúncio')
    }

  }

  return (
    <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
        <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/30'>
          <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
            <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4' action="">
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual é o game?</label>
                  <Select.Root name='game'>
                    <Select.Trigger id="game" className='text-zinc-500 bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between w-[100%] items-center'>
                      <Select.Value placeholder='Selecione o game que deseja jogar'/>
                      <Select.Icon><CaretDown/></Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content>
                      <Select.Viewport className='bg-zinc-700 rounded-lg py-2 mt-8'>
                        <Select.Group>
                        <Select.Label className='pl-4 text-zinc-500'>-- Selecione o game que deseja jogar --</Select.Label>
                          {games.map(game =>{
                            return(
                              <Select.Item 
                              key={game.id}
                              value={game.id}
                              className='pl-4 text-white hover:bg-violet-500'>
                                <Select.ItemText className='text-white' >{game.tittle}</Select.ItemText>                              
                              </Select.Item>
                          )
                          })}
                       </Select.Group>
                      </Select.Viewport>
                    </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input name='name' id='name' placeholder='Como te chamam dentro do game?' />
              </div>
            
              <div className=' grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input name='yearsPlaying' type="number" id="yearsPlaying" placeholder='Tudo bem ser ZERO' />
                </div>
                <div className='flex flex-col gap-2'>
                   <label htmlFor="discord">Qual seu Discord?</label>
                    <Input name='discord' id='discord' placeholder='Usuário#0000'/>
                </div>
              </div>
            
              <div className='grid grid-cols-2 gap-6 '>
                <div className=' flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                
                    <ToggleGroup.Root type='multiple' className='grid grid-cols-4 gap-2' onValueChange={setWeekDays}>
                      <ToggleGroup.Item
                      value="0"
                      title='Domingo'
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-600' :''} `}
                      >
                        D
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                      value="1"
                      title='Segunda'
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-600' : ''} `}
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                      value="2"
                      title='Terça'
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-600' : ''} `}
                      >
                        T
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                      value="3"
                      title='Quarta'
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-600' : ''} `}
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                      value="4"
                      title='Quinta'
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-600' : ''} `}
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                      value="5"
                      title='Sexta'
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-600' : ''} `}
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                      value="6"
                      title='Sábado'
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-600' : ''} `}
                      >
                        S
                      </ToggleGroup.Item>

                    </ToggleGroup.Root>
                  </div>  
                
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className=' grid grid-cols-2 gap-2'>
                    <Input name='hourStart' id='hourStart' type="time" placeholder='De' />
                    <Input name='hourEnd' id='hourEnd' type="time" placeholder='Até' />
                  </div>
                </div>
                </div>
              
              <label className='mt-2 flex gap-2 text-sm items-center'>
                <Checkbox.Root
                checked = {useVoiceChannel}
                onCheckedChange={(checked) =>{
                  if (checked ===true){
                    setUseVoiceChannel(true)
                  } else {
                    setUseVoiceChannel(false)
                  }
                }}
                className="w-6 h-6 rounded p-1 bg-zinc-900">
                  <Checkbox.Indicator>
                    <Check className=" w-4 h-4 text-emerald-400 flex"/>
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-700'>Cancelar</Dialog.Close>
                <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex gap-3 items-center hover:bg-violet-700' type="submit">
                  <GameController size={24} />
                  Encontrar duo
                  </button>
              </footer>
            </form>
        </Dialog.Content>
      </Dialog.Portal>
  );
}