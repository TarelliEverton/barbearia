"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle, } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { signIn, signOut, useSession } from "next-auth/react"


const SidebarSheet = () => {
  const {data} = useSession()
  const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut()

  console.log(data?.user)

  

  return ( 
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="py-5 gap-3 justify-between flex items-center border-b border-solid">
              

              {data?.user ? (
                <div className="flex items-center gap-2">
                <Avatar>
                <AvatarImage src={data?.user?.image ?? ''} />
              </Avatar>

              <div>
                <p className="font-bold">{data.user.name}</p>
                <p className="text-xs">{data.user.email}</p>
              </div>
              </div>
              ) : (
                <>
                <h2 className="font-bold">Olá, faça o seu login!</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button    size="icon">
                      <LogInIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>Faça seu login na plataforma</DialogTitle>
                        <DialogDescription>
                          Conecte-se usando sua conta do Google                    
                        </DialogDescription>
                    </DialogHeader>
  
                    <Button variant="outline" className="gap-1 font-bold" onClick={handleLoginWithGoogleClick}>
                      <Image src="/Google.svg" alt="Login Google" width={18} height={18} />
                      Google
                    </Button>
                  </DialogContent> 
                </Dialog>
                </>
              ) }
            </div>

            <div className="py-5 flex flex-col gap-2 border-b border-solid">
              <SheetClose asChild>
                <Button className="gap-2 justify-start" variant="ghost" asChild>
                  <Link href="/">
                  <HomeIcon size={18} />
                  Inicio
                  </Link>
                </Button>
              </SheetClose>
              <Button className="gap-2 justify-start" variant="ghost">
                <CalendarIcon size={18} />
                Agendamentos
                </Button>
            </div>

            <div className="py-5 flex flex-col gap-2 border-b border-solid">
              {quickSearchOptions.map((option) =>(
                <SheetClose key={option.title} asChild>
                  <Button  className="gap-2 justify-start" variant="ghost" asChild>
                  <Link href={`/barbershops?service=${option.title}`}>
                  <Image alt={option.title} src={option.imageUrl} height={18} width={18} />
                  {option.title}
                  </Link>
                  </Button>
                </SheetClose>
              ))}
            </div>

            <div className="py-5 flex flex-col gap-2 ">
              <Button variant="ghost" className="justify-start gap-2" onClick={handleLogoutClick}>
                <LogOutIcon size={18}/>
                Sair da conta
                </Button>
            </div>

          </SheetContent>
   );
}
 
export default SidebarSheet;