import React from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'

interface Car {
  id: number
  name: string
  type: string
  images: string[]
  price: number
  location: string
  features: string[]
  status: string
  description: string
}

interface FeaturedCarProps {
  car: Car
}

export default function FeaturedCar({ car }: FeaturedCarProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Featured Car</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <Image
            src={car.images[0] || "/placeholder.svg"}
            alt={car.name}
            width={96}
            height={96}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div>
            <h3 className="text-xl font-bold">{car.name}</h3>
            <p className="text-muted-foreground">{car.type}</p>
            <p className="font-semibold">${car.price.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{car.location}</p>
            <div className="mt-2">
              {car.features.slice(0, 2).map((feature, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {feature}
                </span>
              ))}
              {car.features.length > 2 && (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  +{car.features.length - 2} more
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}