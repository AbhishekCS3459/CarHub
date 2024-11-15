'use client'

import { useState, useEffect, useRef } from 'react'
import { Moon, Sun, Search, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { useSpring, animated } from 'react-spring'
import Image from 'next/image'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { CarLoader } from './carloader'
import AiAssistant from './AiAssistant'

interface Car {
  id: number;
  name: string;
  type: string;
  image: string;
  price: number;
  location: string;
  features: string[];
}

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Placeholder car data
  const cars: Car[] = [
    {
      id: 1,
      name: "Volvo EX30",
      type: "Electric Crossover",
      image: "/placeholder.svg",
      price: 45000,
      location: "Los Angeles",
      features: ["Fully Electric", "Autopilot", "360° Camera"]
    },
    {
      id: 2,
      name: "Tesla Model S",
      type: "Electric Sedan",
      image: "/placeholder.svg",
      price: 89990,
      location: "San Francisco",
      features: ["Ludicrous Mode", "Full Self-Driving", "Premium Interior"]
    },
    {
      id: 3,
      name: "Porsche Taycan",
      type: "Electric Sports Car",
      image: "/placeholder.svg",
      price: 103800,
      location: "New York",
      features: ["800V Architecture", "Performance Battery Plus", "Adaptive Air Suspension"]
    },
    {
      id: 4,
      name: "BMW iX",
      type: "Electric SUV",
      image: "/placeholder.svg",
      price: 84100,
      location: "Chicago",
      features: ["iDrive 8", "Panoramic Sky Lounge LED Roof", "Harman Kardon Surround Sound"]
    },
    {
      id: 5,
      name: "Audi e-tron GT",
      type: "Electric Sports Sedan",
      image: "/placeholder.svg",
      price: 102400,
      location: "Miami",
      features: ["Quattro All-Wheel Drive", "Boost Mode", "Matrix LED Headlights"]
    }
  ]

  const [{ x }, set] = useSpring(() => ({ x: 0 }))

  useEffect(() => {
    const autoScroll = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current
        set({ x: -scrollWidth + clientWidth, config: { duration: 50000 } })
      }
    }

    autoScroll()
    const interval = setInterval(autoScroll, 50000)

    return () => clearInterval(interval)
  }, [set])

  const handleSearchSelect = (car: Car) => {
    setSelectedCar(car)
    setSearchTerm(car.name)
    setOpenSearch(false)
  }

  const handleSearch = () => {
    const foundCar = cars.find(car => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
    if (foundCar) {
      setSelectedCar(foundCar)
    } else {
      setSelectedCar(null)
    }
  }

  const renderCarCard = (car: Car, index: number) => (
    <Card key={`${car.id}-${index}`} className="flex-shrink-0 w-72 mr-6 overflow-hidden">
      <CardContent className="p-0">
        <Image
          src={car.image}
          alt={car.name}
          width={288}
          height={162}
          className="w-full aspect-video object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
          <p className="text-muted-foreground mb-4">{car.type}</p>
          <div className="flex items-center space-x-2 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span>{car.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">${car.price.toLocaleString()}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button>View Details</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{car.name}</DialogTitle>
                  <DialogDescription>{car.type}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Image
                    src={car.image}
                    alt={car.name}
                    width={400}
                    height={225}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
                  <p><strong>Location:</strong> {car.location}</p>
                  <div>
                    <strong>Features:</strong>
                    <ul className="list-disc list-inside">
                      {car.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full">Book Now</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {isLoading && <CarLoader />}
      <div className="bg-background text-foreground">
        {/* Centered Navigation */}
        <nav className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <span className="text-2xl font-bold">CarEmpire</span>
              </Link>
              <div className="flex items-center space-x-6">
                <Button variant="ghost">Rent</Button>
                <Button variant="ghost">Buy</Button>
                <Button variant="ghost">Sell</Button>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">Find Your Perfect Drive</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover an extensive collection of premium vehicles. Buy, rent, or sell with confidence.
            </p>
            <div className="w-full max-w-2xl">
              <Popover open={openSearch} onOpenChange={setOpenSearch}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search by make, model, or type..."
                      className="pl-10 pr-20 py-6"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button 
                      className="absolute right-1 top-1 bottom-1" 
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search cars..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Cars">
                        {cars.map((car) => (
                          <CommandItem
                            key={car.id}
                            onSelect={() => handleSearchSelect(car)}
                          >
                            {car.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>

        {/* Searched Car Display */}
        {selectedCar && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Search Result</h2>
            <div className="flex justify-center">
              {renderCarCard(selectedCar, -1)}
            </div>
          </section>
        )}

        {/* Auto-moving Horizontal Cards */}
        <section className="container mx-auto px-4 py-12 overflow-hidden">
          <h2 className="text-3xl font-bold mb-6 text-center">Featured Cars</h2>
          <div className="relative" ref={carouselRef}>
            <animated.div
              style={{
                display: 'flex',
                transform: x.to(x => `translate3d(${x}px, 0, 0)`),
              }}
              className="flex transition-transform duration-&lsqb;50000ms&rsqb; ease-linear"
            >
              {[...cars, ...cars].map((car, index) => renderCarCard(car, index))}
            </animated.div>
          </div>
        </section>

        {/* AI Assistant */}
        <AiAssistant />
      </div>
    </div>
  )
}