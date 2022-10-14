import * as Dialog  from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner(){
  return(
    <div className='mt-8 pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mb-32'>
    <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
      <div>
        <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
        <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
      </div>
      <Dialog.Trigger className='bg-violet-500 text-white py-3 px-4 rounded flex gap-3 items-center hover:scale-105'>
      
      <MagnifyingGlassPlus size={24}/>

       Publicar anúncio
      </Dialog.Trigger>
    </div>
    </div>
  )
}