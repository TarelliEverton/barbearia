import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload <{
    include: {service: {include: {
      barbershop: true
    }} }
  }>
}

const BookingItem = ({booking}: BookingItemProps) => {
  return (
    <>
         <h2 className="uppercase text-xs text-gray-400 mt-6 mb-3">Agendamentos</h2>
          <Card>
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge className="w-fit">Confirmado</Badge>
                <h3 className="font-semibold">{booking.service.name}</h3>
                <div className="flex itens-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm">{booking.service.barbershop.name}</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">Agosto</p>
                <p className="text-2xl">05</p>
                <p className="text-sm">20:00</p>
              </div>
            </CardContent>
          </Card>
    </>
  )
}

export default BookingItem