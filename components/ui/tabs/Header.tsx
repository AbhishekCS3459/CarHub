import { Menu, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

interface HeaderProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function Header({
  isSidebarOpen,
  setIsSidebarOpen,
  isDarkMode,
  setIsDarkMode,
  searchTerm,
  setSearchTerm
}: HeaderProps) {
  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-4">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Button>Logout</Button>
        </div>
      </div>
    </header>
  )
}