"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useEffect } from "react"
import { LoginFormValues, loginSchema } from "../types/schema"
import { useRouter } from "next/navigation"
import { handleApiError } from "@/lib/error"

export default function LoginContainer() {
    const router = useRouter()
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (res?.ok) {
                toast.success("Berhasil masuk!")
                router.push("/dashboard/product")
            }else{
                throw new Error(res?.error || "Gagal masuk!")
            }
        } catch (error) {
            toast.error(handleApiError(error))
        }
    }

    useEffect(() => {
    }, [])
    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Masuk</CardTitle>
                <CardDescription className="text-center">
                    Masukkan email dan password untuk masuk ke akun Anda
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="nama@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Masukkan password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Masuk
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Belum punya akun?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Daftar di sini
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
