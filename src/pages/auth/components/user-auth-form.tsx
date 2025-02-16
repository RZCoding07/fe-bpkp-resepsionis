import type React from "react"
import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/custom/button"
import { PasswordInput } from "@/components/custom/password-input"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "react-hot-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  identifier: z.string().min(1, {
    message: "Please enter your email or username",
  }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(7, {
      message: "Password must be at least 7 characters long",
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      setIsLoading(true)
      try {
        await login(data.identifier, data.password)
        toast.success("Login successful")
        navigate("/dashboard")
      } catch (error) {
        console.error("Login error:", error)
        form.setError("root", { message: "Invalid email or password" })
      } finally {
        setIsLoading(false)
      }
    },
    [login, navigate, form],
  )

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email / Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com / 250******* " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" loading={isLoading}>
              Login
            </Button>
          </div>
          {form.formState.errors.root && (
            <p className="text-sm text-red-500 mt-2">{form.formState.errors.root.message}</p>
          )}
        </form>
      </Form>
    </div>
  )
}

