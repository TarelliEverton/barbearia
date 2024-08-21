import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { db } from "./_lib/prisma"
import  Image  from "next/image"
import BarbershopItem from "./_components/barber-shop"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/ui/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"

const Home = async() => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany ({
    orderBy: {
      name: 'desc',
    },
  })

  const bookings = session?.user ? await db.booking.findMany({
      where: {
        userId: (session.user as any).id,
      },
      include: {
        service: {
          include: {
            barbershop: true
          }
        }
      }
  }) : []
  
  return <div>
    
        <Header />
        
        <div className="p-5">
          <h2 className="text-xl font-bold">Olá, Everton!</h2>
          <p>Segunda-Feira, 5 de Agosto </p>

          <div className=" mt-6">
            <Search />
          </div>

          <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title} asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image src={option.imageUrl} 
                width={16} 
                height={16} 
                alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
            ))}
          </div>

          <div className="relative mt-6 rounded-xl w-full h-[150px]">
              <Image alt="banner de agendamento" src="/banner-01.png" fill className="object-cover" />
          </div>

          <div className="flex overflow-x-auto">
            {bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div> 

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