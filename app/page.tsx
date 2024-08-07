import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import  Image  from "next/image"

const Home = () => {
  return <div>
        <Header />
        
        <div className="p-5">
          <h2 className="text-xl font-bold">Olá, Everton!</h2>
          <p>Segunda-Feira, 5 de Agosto</p>

          <div className="flex itens-center gap-2 mt-6">
            <Input placeholder="Faça sua busca..." />
            <Button>
              <SearchIcon />
            </Button>
          </div>
          <div className="relative mt-6 rounded-xl w-full h-[150px]">
              <Image alt="banner de agendamento" src="/public/banner-01.png" fill className="object-cover" />
          </div>


          
          
        </div>  
  </div>
}

export default Home