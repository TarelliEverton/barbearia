import SidebarSheet from "@/app/_components/sidebar-sheet";
import { Button } from "@/app/_components/ui/button";
import PhoneItem from "@/app/_components/ui/phone-item";
import ServiceItem from "@/app/_components/ui/service-item";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopPageProps {
  params: {
    id: string  
  }
}

const BarbershopPage =  async ({params}: BarbershopPageProps ) => {
  
  const barbershop = await db.barbershop.findUnique ({
    where: {
      id: params.id
    },
    include: {
      services: true
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
      <div>
        <div className="relative w-full h-[250px]">
        <Image alt={barbershop.name}
          src={barbershop?.imageUrl}
          fill
          className='object-cover' />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild>

          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="absolute top-4 right-4">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>

        </div>

        <div className="p-5 border-b border-solid"> 
            <h1  className="font-bold text-xl mb-3">{barbershop.name}</h1>
            <div className="flex items-center gap-1 mb-2">
              <MapPinIcon className="text-primary" size={18}/>
              <p className="text-sm">{barbershop?.address}</p>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <StarIcon className="text-primary fill-primary" size={18}/>
              <p className="text-sm">5,0 (499 avaliações)</p>
            </div> 
        </div>

        <div className="p-5 border-b border-solid space-y-2">
          <h2 className="text-xs font-bold uppercase text-gray-400">Sobre Nós</h2>
          <p className="text-sm text-justify">{barbershop?.description}</p>
        </div>

        <div className="p-5 space-y-3 border-b border-solid">
          <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
          <div className="space-y-3">
            {barbershop.services.map((service) => (<ServiceItem key={service.id} barbershop={barbershop} service={service} />))}
          </div>
        </div>

        <div className="p-5 space-y-3">
          {barbershop.phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
      </div>
  )   
}
 
export default BarbershopPage;