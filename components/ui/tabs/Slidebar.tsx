import { motion } from 'framer-motion'
import { X, BarChart3, Car, Calendar, Users, MessageSquare, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  activeView: string
  setActiveView: (view: string) => void
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  activeView,
  setActiveView,
  isDarkMode,
  setIsDarkMode
}: SidebarProps) {
  if (!isSidebarOpen) return null

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r p-4 z-50"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <span className="text-2xl font-bold">CarEmpire</span>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-2 flex-grow">
          <Button
            variant={activeView === 'dashboard' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveView('dashboard')}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeView === 'cars' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveView('cars')}
          >
            <Car className="mr-2 h-4 w-4" />
            Cars
          </Button>
          <Button
            variant={activeView === 'bookings' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveView('bookings')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Bookings
          </Button>
          <Button
            variant={activeView === 'customers' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveView('customers')}
          >
            <Users className="mr-2 h-4 w-4" />
            Customers
          </Button>
          <Button
            variant={activeView === 'messages' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveView('messages')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </nav>
        <Button
          variant="ghost"
          className="w-full justify-start mt-auto"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          Toggle Theme
        </Button>
      </div>
    </motion.div>
  )
}