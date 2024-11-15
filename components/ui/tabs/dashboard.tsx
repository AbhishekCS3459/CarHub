"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CarLoader } from "./carloader";
import Header from "./Header";
import Sidebar from "./Slidebar";
import Stats from "./Stats";
import FeaturedCar from "./FeaturedCar";
import RecentBookings from "./RecentBookings";
import CarManagement from "./car-management";
import BookingsPage from "./booking";
import CustomersPage from "./customer";
import AiAssistant from "./AiAssistant";
import MessagesPage from "./messages";

interface Car {
  id: number;
  name: string;
  type: string;
  images: string[];
  price: number;
  location: string;
  features: string[];
  status: string;
  description: string;
}

interface Booking {
  id: string;
  customer: string;
  car: string;
  date: string;
  time: string;
  duration: string;
  amount: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
  rating: number;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentCarIndex, setCurrentCarIndex] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setCars([
        {
          id: 1,
          name: "Volvo EX30",
          type: "Electric Crossover",
          images: ["/placeholder.svg"],
          price: 45000,
          location: "Los Angeles",
          features: ["Fully Electric", "Autopilot", "360° Camera"],
          status: "Available",
          description:
            "The Volvo EX30 is a compact electric crossover with advanced features.",
        },
        {
          id: 2,
          name: "Tesla Model S",
          type: "Electric Sedan",
          images: ["/placeholder.svg"],
          price: 89990,
          location: "San Francisco",
          features: ["Ludicrous Mode", "Full Self-Driving", "Premium Interior"],
          status: "On Order",
          description:
            "The Tesla Model S is a premium electric sedan with cutting-edge technology.",
        },
        {
          id: 3,
          name: "Porsche Taycan",
          type: "Electric Sports Car",
          images: ["/placeholder.svg"],
          price: 103800,
          location: "New York",
          features: [
            "800V Architecture",
            "Performance Battery Plus",
            "Adaptive Air Suspension",
          ],
          status: "Available",
          description:
            "The Porsche Taycan is a high-performance electric sports car with exceptional handling.",
        },
      ]);

      setBookings([
        {
          id: "B001",
          customer: "John Doe",
          car: "Tesla Model S",
          date: "2024-01-20",
          time: "10:00 AM",
          duration: "3 days",
          amount: 1200,
          status: "Completed",
        },
        {
          id: "B002",
          customer: "Jane Smith",
          car: "Porsche Taycan",
          date: "2024-01-21",
          time: "2:00 PM",
          duration: "2 days",
          amount: 1500,
          status: "Confirmed",
        },
        {
          id: "B003",
          customer: "Alice Johnson",
          car: "BMW iX",
          date: "2024-01-22",
          time: "9:00 AM",
          duration: "1 day",
          amount: 800,
          status: "Pending",
        },
        {
          id: "B004",
          customer: "Bob Brown",
          car: "Audi e-tron GT",
          date: "2024-01-23",
          time: "11:00 AM",
          duration: "4 days",
          amount: 2000,
          status: "Confirmed",
        },
        {
          id: "B005",
          customer: "Charlie Davis",
          car: "Volvo EX30",
          date: "2024-01-24",
          time: "3:00 PM",
          duration: "2 days",
          amount: 1000,
          status: "Cancelled",
        },
      ]);

      setCustomers([
        {
          id: "C001",
          name: "John Doe",
          email: "john@example.com",
          phone: "(555) 123-4567",
          totalBookings: 5,
          totalSpent: 5000,
          lastBooking: "2024-01-20",
          rating: 4.8,
        },
        {
          id: "C002",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "(555) 987-6543",
          totalBookings: 3,
          totalSpent: 3500,
          lastBooking: "2024-01-18",
          rating: 4.5,
        },
        {
          id: "C003",
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "(555) 246-8135",
          totalBookings: 2,
          totalSpent: 2000,
          lastBooking: "2024-01-15",
          rating: 4.2,
        },
        {
          id: "C004",
          name: "Bob Brown",
          email: "bob@example.com",
          phone: "(555) 369-2580",
          totalBookings: 4,
          totalSpent: 4500,
          lastBooking: "2024-01-22",
          rating: 4.7,
        },
        {
          id: "C005",
          name: "Charlie Davis",
          email: "charlie@example.com",
          phone: "(555) 159-7531",
          totalBookings: 1,
          totalSpent: 1000,
          lastBooking: "2024-01-10",
          rating: 4.0,
        },
      ]);

      setMessages([
        {
          id: "M001",
          sender: "John Doe",
          content: "Hello, I have a question about my booking.",
          timestamp: "2024-01-20 10:30 AM",
          isRead: false,
        },
        {
          id: "M002",
          sender: "Jane Smith",
          content: "Can I extend my rental period?",
          timestamp: "2024-01-20 11:45 AM",
          isRead: true,
        },
        {
          id: "M003",
          sender: "Alice Johnson",
          content: "I need to change my pickup location.",
          timestamp: "2024-01-20 2:15 PM",
          isRead: false,
        },
        {
          id: "M004",
          sender: "Bob Brown",
          content: "Is there an additional fee for returning the car late?",
          timestamp: "2024-01-20 4:00 PM",
          isRead: true,
        },
        {
          id: "M005",
          sender: "Charlie Davis",
          content: "I forgot an item in the rental car. Can you help?",
          timestamp: "2024-01-20 5:30 PM",
          isRead: false,
        },
      ]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prevIndex) => (prevIndex + 1) % cars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cars.length]);

  const handleAddCar = (newCar: Car) => {
    setCars([...cars, newCar]);
  };

  const handleUpdateCar = (updatedCar: Car) => {
    setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
  };

  const handleDeleteCar = (id: number) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.features.some((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  if (isLoading) return <CarLoader />;

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground flex">
        <AnimatePresence>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            activeView={activeView}
            setActiveView={setActiveView}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </AnimatePresence>

        <div className="flex-1 min-h-screen">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <main className="container mx-auto px-4 py-8">
            {activeView === "dashboard" && (
              <>
                <Stats cars={cars} />
                <FeaturedCar car={filteredCars[currentCarIndex]} />
                <RecentBookings bookings={bookings.slice(0, 5)} />
              </>
            )}

            {activeView === "cars" && (
              <CarManagement
                cars={filteredCars}
                onAddCar={handleAddCar}
                onUpdateCar={handleUpdateCar}
                onDeleteCar={handleDeleteCar}
              />
            )}

            {activeView === "bookings" && (
              <BookingsPage bookings={filteredBookings} />
            )}

            {activeView === "customers" && (
              <CustomersPage customers={filteredCustomers} />
            )}

            {activeView === "messages" && <MessagesPage messages={messages} />}
          </main>
        </div>

        <AiAssistant />
      </div>
    </div>
  );
}
