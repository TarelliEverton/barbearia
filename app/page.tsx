import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import { db } from "./_lib/prisma"
import  Image  from "next/image"
import BarbershopItem from "./_components/barber-shop"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"

const Home = async() => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany ({
    orderBy: {
      name: 'desc',
    },
  })
  
  return <div>
    
        <Header />
        
        <div className="p-5">
          <h2 className="text-xl font-bold">Olá, Everton!</h2>
          <p>Segunda-Feira, 5 de Agosto </p>

          <div className="flex itens-center gap-2 mt-6">
            <Input placeholder="Faça sua busca..." />
            <Button>
              <SearchIcon />
            </Button>
          </div>

          <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image src={option.imageUrl} 
              width={16} 
              height={16} 
              alt={option.title}
              />
              {option.title}
            </Button>
            ))}
          </div>

          <div className="relative mt-6 rounded-xl w-full h-[150px]">
              <Image alt="banner de agendamento" src="/banner-01.png" fill className="object-cover" />
          </div>

          <BookingItem />

            <h2 className="uppercase text-xs text-gray-400 mt-6 mb-3">Recomendados</h2>

            <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
              {barbershops.map((barbershop) => ( <BarbershopItem key={barbershop.id} barbershop={barbershop} /> ))}
            
            </div>

            <h2 className="uppercase text-xs text-gray-400 mt-6 mb-3">Populares</h2>

            <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
              {popularBarbershops.map((barbershop) => ( <BarbershopItem key={barbershop.id} barbershop={barbershop} /> ))}

            </div>
        </div>
  </div>
}

export default Home