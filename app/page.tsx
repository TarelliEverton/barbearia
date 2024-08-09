import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react"
import { db } from "./_lib/prisma"
import  Image  from "next/image"
import { CardContent } from "./_components/ui/card"
import { Card } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar } from "./_components/ui/avatar"
import { AvatarImage } from "./_components/ui/avatar"
import BarbershopItem from "./_components/barber-shop"

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
            <Button className="gap-2" variant="secondary">
              <Image src="/public/cabelo.svg" width={16} height={16} alt="Cabelo"/>
              Cabelo
            </Button>
            <Button className="gap-2" variant="secondary">
              <Image src="/public/barba.svg" width={16} height={16} alt="Barba"/>
              Barba
            </Button>
            <Button className="gap-2" variant="secondary">
              <Image src="/public/acabamento.svg" width={16} height={16} alt="Acabamento"/>
              Acabamento
            </Button>
            <Button className="gap-2" variant="secondary">
              <FootprintsIcon size={16}/>
              Pézinho
            </Button>
            <Button className="gap-2" variant="secondary">
              <EyeIcon size={16}/>
              Sobrancelha
            </Button>
        
          </div>

          <div className="relative mt-6 rounded-xl w-full h-[150px]">
              <Image alt="banner de agendamento" src="/public/banner-01.png" fill className="object-cover" />
          </div>

            <h2 className="uppercase text-xs text-gray-400 mt-6 mb-3">Agendamentos</h2>
            <Card>
              <CardContent className="flex justify-between p-0">
                <div className="flex flex-col gap-2 py-5 pl-5">
                  <Badge className="w-fit">Confirmado</Badge>
                  <h3 className="font-semibold">Corte de Cabelo</h3>
                  <div className="flex itens-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                    </Avatar>
                    <p className="text-sm">Barbearia Shop</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                  <p className="text-sm">Agosto</p>
                  <p className="text-2xl">05</p>
                  <p className="text-sm">20:00</p>
                </div>
              </CardContent>
            </Card>

            <h2 className="uppercase text-xs text-gray-400 mt-6 mb-3">Recomendados</h2>

            <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
              {barbershops.map((barbershop) => ( <BarbershopItem key={barbershop.id} barbershop={barbershop} /> ))}
            
            </div>

            <h2 className="uppercase text-xs text-gray-400 mt-6 mb-3">Populares</h2>

            <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
              {popularBarbershops.map((barbershop) => ( <BarbershopItem key={barbershop.id} barbershop={barbershop} /> ))}

            </div>
        </div>

        <footer>
          <Card>
            <CardContent className="px-5 py-6">
              <p className="text-sm text-gray-400">
                © 2024 Copyright <span className="font-bold">Everton Tarelli Dev</span>
              </p>
            </CardContent>
          </Card>
        </footer>  
  </div>
}

export default Home