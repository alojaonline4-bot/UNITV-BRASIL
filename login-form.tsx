"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

interface LoginFormProps {
  onLogin: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (username === "admin" && password === "1234") {
      setError("")
      onLogin()
    } else {
      setError("Usuário ou senha incorretos!")
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <div className="text-[20rem] font-black tracking-tighter bg-gradient-to-br from-[#FF5C00] via-[#FF8C00] to-[#007BFF] bg-clip-text text-transparent">
          UNITV
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF5C00] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#007BFF] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4B00A0] rounded-full blur-[150px] opacity-5 pointer-events-none" />

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Login card */}
      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto mb-2">
            <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-[#FF5C00] via-[#FF8C00] to-[#007BFF] bg-clip-text text-transparent">
              UNITV BRASIL
            </h1>
          </div>
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-[#FF5C00] to-[#FF8C00] flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-balance text-foreground">Painel de Canais</CardTitle>
          <CardDescription className="text-base text-muted-foreground">Faça login para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-[#FF8C00]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-[#FF8C00]"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF5C00] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FF5C00] text-white font-semibold shadow-lg shadow-[#FF5C00]/20"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
