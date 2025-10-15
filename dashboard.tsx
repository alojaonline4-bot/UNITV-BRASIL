"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut, Lock, Unlock, Edit, Trash2, Plus, Key, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Channel {
  id: number
  name: string
  category: "Filmes" | "Séries" | "Cinema" | "Desenho" | "PPV" | "Anime" | "+18 Adulto"
  status: "Liberado" | "Bloqueado" | "Pendente"
}

interface License {
  id: number
  licenseKey: string
  subscriptionType: "Recurring" | "One-time"
  plan: "Monthly" | "Yearly" | "Lifetime"
  startDate: string
  endDate: string
  status: "Active" | "Sale" | "Expired" | "Suspended"
}

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [channels, setChannels] = useState<Channel[]>([
    { id: 1, name: "HBO Max", category: "Filmes", status: "Liberado" },
    { id: 2, name: "Netflix Originals", category: "Séries", status: "Liberado" },
    { id: 3, name: "Telecine Premium", category: "Cinema", status: "Bloqueado" },
    { id: 4, name: "Cartoon Network", category: "Desenho", status: "Liberado" },
    { id: 5, name: "UFC Fight Pass", category: "PPV", status: "Pendente" },
    { id: 6, name: "Crunchyroll", category: "Anime", status: "Liberado" },
    { id: 7, name: "Playboy TV", category: "+18 Adulto", status: "Bloqueado" },
    { id: 8, name: "Prime Video", category: "Filmes", status: "Liberado" },
    { id: 9, name: "Disney+", category: "Séries", status: "Liberado" },
    { id: 10, name: "Star+", category: "Cinema", status: "Liberado" },
    { id: 11, name: "Discovery Kids", category: "Desenho", status: "Liberado" },
    { id: 12, name: "Combate", category: "PPV", status: "Bloqueado" },
    { id: 13, name: "Funimation", category: "Anime", status: "Liberado" },
    { id: 14, name: "Sextreme", category: "+18 Adulto", status: "Bloqueado" },
  ])

  const [licenses, setLicenses] = useState<License[]>([
    {
      id: 1,
      licenseKey: "244813B5-4986-4306-9691-6BF3FA98FDDC",
      subscriptionType: "Recurring",
      plan: "Monthly",
      startDate: "12-10-2025",
      endDate: "12-11-2025",
      status: "Sale",
    },
    {
      id: 2,
      licenseKey: "A1B2C3D4-E5F6-7890-ABCD-EF1234567890",
      subscriptionType: "Recurring",
      plan: "Yearly",
      startDate: "01-01-2025",
      endDate: "01-01-2026",
      status: "Active",
    },
    {
      id: 3,
      licenseKey: "9876FEDC-BA09-8765-4321-FEDCBA098765",
      subscriptionType: "One-time",
      plan: "Lifetime",
      startDate: "15-03-2025",
      endDate: "∞",
      status: "Active",
    },
  ])

  const [activeTab, setActiveTab] = useState<"channels" | "licenses">("channels")
  const [activeCategory, setActiveCategory] = useState<Channel["category"] | "Todos">("Todos")

  const [showNewLicenseForm, setShowNewLicenseForm] = useState(false)
  const [newLicense, setNewLicense] = useState({
    licenseKey: "",
    subscriptionType: "Recurring" as "Recurring" | "One-time",
    plan: "Monthly" as "Monthly" | "Yearly" | "Lifetime",
    startDate: "",
    endDate: "",
    status: "Active" as "Active" | "Sale" | "Expired" | "Suspended",
  })

  const toggleChannelStatus = (channelId: number) => {
    setChannels(
      channels.map((channel) => {
        if (channel.id === channelId) {
          const newStatus = channel.status === "Liberado" ? "Bloqueado" : "Liberado"
          return { ...channel, status: newStatus }
        }
        return channel
      }),
    )
  }

  const deleteLicense = (licenseId: number) => {
    setLicenses(licenses.filter((license) => license.id !== licenseId))
  }

  const generateLicenseKey = () => {
    const segments = []
    for (let i = 0; i < 4; i++) {
      segments.push(
        Array.from({ length: 8 }, () =>
          Math.floor(Math.random() * 16)
            .toString(16)
            .toUpperCase(),
        ).join(""),
      )
    }
    return segments.join("-")
  }

  const handleCreateLicense = () => {
    if (!newLicense.licenseKey || !newLicense.startDate || !newLicense.endDate) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    const newLicenseEntry: License = {
      id: licenses.length + 1,
      licenseKey: newLicense.licenseKey,
      subscriptionType: newLicense.subscriptionType,
      plan: newLicense.plan,
      startDate: newLicense.startDate,
      endDate: newLicense.endDate,
      status: newLicense.status,
    }

    setLicenses([...licenses, newLicenseEntry])
    setShowNewLicenseForm(false)
    setNewLicense({
      licenseKey: "",
      subscriptionType: "Recurring",
      plan: "Monthly",
      startDate: "",
      endDate: "",
      status: "Active",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Liberado":
        return "bg-[#007BFF]/20 text-[#007BFF] border-[#007BFF]/30"
      case "Bloqueado":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "Pendente":
        return "bg-[#FF8C00]/20 text-[#FF8C00] border-[#FF8C00]/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getLicenseStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#007BFF]/20 text-[#007BFF] border-[#007BFF]/30"
      case "Sale":
        return "bg-[#FF5C00]/20 text-[#FF5C00] border-[#FF5C00]/30"
      case "Expired":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "Suspended":
        return "bg-[#FF8C00]/20 text-[#FF8C00] border-[#FF8C00]/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredChannels =
    activeCategory === "Todos" ? channels : channels.filter((channel) => channel.category === activeCategory)

  const liberados = filteredChannels.filter((c) => c.status === "Liberado").length
  const bloqueados = filteredChannels.filter((c) => c.status === "Bloqueado").length
  const pendentes = filteredChannels.filter((c) => c.status === "Pendente").length

  const categories: (Channel["category"] | "Todos")[] = [
    "Todos",
    "Filmes",
    "Séries",
    "Cinema",
    "Desenho",
    "PPV",
    "Anime",
    "+18 Adulto",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-[#FF5C00] via-[#FF8C00] to-[#007BFF] bg-clip-text text-transparent">
              UNITV BRASIL
            </h1>
            <span className="text-muted-foreground">|</span>
            <span className="text-lg font-semibold text-foreground">Painel de Gerenciamento</span>
          </div>
          <Button onClick={onLogout} variant="destructive" size="sm" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("channels")}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === "channels" ? "text-[#007BFF]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Canais
              {activeTab === "channels" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#007BFF] to-[#4B00A0]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("licenses")}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === "licenses" ? "text-[#007BFF]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Chaves de Licença
              {activeTab === "licenses" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#007BFF] to-[#4B00A0]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        {activeTab === "channels" ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Canais Disponíveis</h2>

            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-[#007BFF] to-[#4B00A0] text-white shadow-lg"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-card/80 border border-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredChannels.map((channel) => (
                <Card key={channel.id} className="border-border bg-card hover:bg-card/80 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg text-foreground">{channel.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{channel.category}</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(channel.status)}>
                        {channel.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => toggleChannelStatus(channel.id)}
                      variant={channel.status === "Liberado" ? "destructive" : "default"}
                      className={
                        channel.status === "Liberado"
                          ? "w-full gap-2"
                          : "w-full gap-2 bg-gradient-to-r from-[#007BFF] to-[#4B00A0] hover:from-[#4B00A0] hover:to-[#007BFF] text-white"
                      }
                      disabled={channel.status === "Pendente"}
                    >
                      {channel.status === "Liberado" ? (
                        <>
                          <Lock className="w-4 h-4" />
                          Bloquear
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4" />
                          Liberar
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Licenças</h2>
              <Button
                onClick={() => setShowNewLicenseForm(true)}
                className="gap-2 bg-gradient-to-r from-[#007BFF] to-[#4B00A0] hover:from-[#4B00A0] hover:to-[#007BFF] text-white"
              >
                <Plus className="w-4 h-4" />
                Nova Licença
              </Button>
            </div>

            {showNewLicenseForm && (
              <Card className="border-border bg-card mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Criar Nova Licença</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowNewLicenseForm(false)} className="h-8 w-8">
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="licenseKey" className="text-foreground">
                        Chave de Licença *
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="licenseKey"
                          value={newLicense.licenseKey}
                          onChange={(e) => setNewLicense({ ...newLicense, licenseKey: e.target.value })}
                          placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                          className="font-mono"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setNewLicense({ ...newLicense, licenseKey: generateLicenseKey() })}
                        >
                          Gerar
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subscriptionType" className="text-foreground">
                        Tipo de Assinatura *
                      </Label>
                      <Select
                        value={newLicense.subscriptionType}
                        onValueChange={(value: "Recurring" | "One-time") =>
                          setNewLicense({ ...newLicense, subscriptionType: value })
                        }
                      >
                        <SelectTrigger id="subscriptionType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Recurring">Recurring</SelectItem>
                          <SelectItem value="One-time">One-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="plan" className="text-foreground">
                        Plano *
                      </Label>
                      <Select
                        value={newLicense.plan}
                        onValueChange={(value: "Monthly" | "Yearly" | "Lifetime") =>
                          setNewLicense({ ...newLicense, plan: value })
                        }
                      >
                        <SelectTrigger id="plan">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Yearly">Yearly</SelectItem>
                          <SelectItem value="Lifetime">Lifetime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-foreground">
                        Status *
                      </Label>
                      <Select
                        value={newLicense.status}
                        onValueChange={(value: "Active" | "Sale" | "Expired" | "Suspended") =>
                          setNewLicense({ ...newLicense, status: value })
                        }
                      >
                        <SelectTrigger id="status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Sale">Sale</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-foreground">
                        Data de Início *
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newLicense.startDate}
                        onChange={(e) => setNewLicense({ ...newLicense, startDate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate" className="text-foreground">
                        Data de Fim *
                      </Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newLicense.endDate}
                        onChange={(e) => setNewLicense({ ...newLicense, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowNewLicenseForm(false)}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleCreateLicense}
                      className="bg-gradient-to-r from-[#007BFF] to-[#4B00A0] hover:from-[#4B00A0] hover:to-[#007BFF] text-white"
                    >
                      Criar Licença
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-border bg-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-foreground font-semibold">
                          <div className="flex items-center gap-2">
                            <Key className="w-4 h-4" />
                            Chave de Licença
                          </div>
                        </TableHead>
                        <TableHead className="text-foreground font-semibold">Tipo de Assinatura</TableHead>
                        <TableHead className="text-foreground font-semibold">Plano</TableHead>
                        <TableHead className="text-foreground font-semibold">Data Início</TableHead>
                        <TableHead className="text-foreground font-semibold">Data Fim</TableHead>
                        <TableHead className="text-foreground font-semibold">Status</TableHead>
                        <TableHead className="text-foreground font-semibold text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {licenses.map((license) => (
                        <TableRow key={license.id} className="border-border hover:bg-muted/50">
                          <TableCell className="font-mono text-sm text-muted-foreground">
                            {license.licenseKey}
                          </TableCell>
                          <TableCell className="text-foreground">{license.subscriptionType}</TableCell>
                          <TableCell className="text-foreground">{license.plan}</TableCell>
                          <TableCell className="text-foreground">{license.startDate}</TableCell>
                          <TableCell className="text-foreground">{license.endDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getLicenseStatusColor(license.status)}>
                              {license.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-[#007BFF] hover:text-[#007BFF] hover:bg-[#007BFF]/10"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteLicense(license.id)}
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          {activeTab === "channels" ? (
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#007BFF]">{liberados}</div>
                <div className="text-sm text-muted-foreground mt-1">Liberados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-destructive">{bloqueados}</div>
                <div className="text-sm text-muted-foreground mt-1">Bloqueados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF8C00]">{pendentes}</div>
                <div className="text-sm text-muted-foreground mt-1">Pendentes</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#007BFF]">
                  {licenses.filter((l) => l.status === "Active").length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF5C00]">
                  {licenses.filter((l) => l.status === "Sale").length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Em Promoção</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-destructive">
                  {licenses.filter((l) => l.status === "Expired").length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Expiradas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">{licenses.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Total</div>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
