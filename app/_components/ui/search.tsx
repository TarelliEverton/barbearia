"use client"

import { SearchIcon } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";

const fromSchema = z.object({
  search: z.string().trim().min(1, {
    message: "Digite Algo para buscar",
  }),
})

const Search = () => {
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      search: "",
    },
  })
  const router = useRouter()

  const handleSubmit = (data: z.infer<typeof fromSchema>) => {
    router.push(`/barbershops?search=${data.search}`)
  }
  return ( 
    <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2 w-full">
      <FormField
        control={form.control}
        name="search"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input placeholder="Faça sua busca..." {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </form>
  </Form>
   );
}
 
export default Search; 