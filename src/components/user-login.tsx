"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { handleLoginWithGithub,handleLoginWithGoogle } from "@/lib/utils"
import { supabase } from "../../supabase"
import { AuthError } from "@supabase/supabase-js"
import Router from "next/navigation"
import { useState } from "react"
interface FormData {
    email: string;
    password:string;
  }

export function LoginAccount() {
    const schema = z.object({
        email: z.string().email({ message: 'Invalid email format' }),
        password: z.string().min(8, { message: ' at least 8 characters long' })
        .regex(/[A-Za-z]/, { message: ' must contain at least one letter' })
        .regex(/[0-9]/, { message: ' must contain at least one digit' })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: '  at least one special character' }),
    });
    const [email,setEmail] = useState('')
    const [error,setError] = useState<AuthError>()
    const [password,setPassword] = useState('')
    const { register, handleSubmit,watch, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function signInWithEmail() {
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            
            if(error){
                setError(error)
                console.error('Error login ',error.message)
            }else{
                console.log(data)
                Router.redirect('/')
            }
        }catch(err){
            console.error("Error login")
        }
        
        
        }
        
    async function onSubmit() {
        setIsLoading(true)
        const watched=watch()
                    setEmail(watched.email)
                    setPassword(watched.password)
                    signInWithEmail()
    setTimeout(() => {
        setIsLoading(false)
        }, 3000)
        }
        
        
    return (
    <>
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>
            Enter your email below to log in your account
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
            <Button onClick={handleLoginWithGithub} variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
            </Button>
            <Button onClick={handleLoginWithGoogle} variant="outline">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
            </Button>
            </div>
            <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                Or continue with
                </span>
            </div>
            </div>
            <form action="" className="gap-10 flex-col justify-between " onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" 
                    {...register('email')}
                    style={errors.email ? { border: '#EC5757 1px solid' } : {}}
                    />
                    {errors.email && <p className="text-red-600 font-normal ">{errors.email.message?.toString()}</p>}
                </div>
                <div className="grid gap-2 mt-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password"
                    {...register('password')}
                    style={errors.password ? { border: '#EC5757 1px solid' } : {}}
                        />
                    {errors.password && <p className="text-red-600 font-normal ">{errors.password.message?.toString()}</p>}
                </div>
                <Button type="submit" className="w-full">Login</Button>
                </form>
        
            </CardContent>
        </>
    )
}





