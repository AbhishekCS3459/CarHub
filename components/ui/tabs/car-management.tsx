"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Plus, Camera, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface CarManagementProps {
  cars: Car[];
  onAddCar: (car: Car) => void;
  onUpdateCar: (car: Car) => void;
  onDeleteCar: (id: number) => void;
}

export const CarLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M5 17h14v-5H5v5zm10-3h2v2h-2v-2zm-3 0h2v2h-2v-2z" />
          <path d="M17 6H7l-2 5h14l-2-5z" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      </motion.div>
    </div>
  );
};

const SmallLoader = () => (
  <div className="flex items-center justify-center p-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-6 h-6 border-2 border-yellow-500 border-t-green-500 rounded-full"
    />
  </div>
);

export default function CarManagement({
  cars,
  onAddCar,
  onUpdateCar,
  onDeleteCar,
}: CarManagementProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNewCar, setIsAddingNewCar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddCar = () => {
    setIsAddingCar(true);
    setSelectedCar({
      id: Date.now(),
      name: "",
      type: "",
      images: [],
      price: 0,
      location: "",
      features: [],
      status: "Available",
      description: "",
    });
  };

  const handleSaveCar = async () => {
    if (selectedCar) {
      setIsAddingNewCar(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (isAddingCar) {
        onAddCar(selectedCar);
      } else {
        onUpdateCar(selectedCar);
      }
      setSelectedCar(null);
      setIsAddingCar(false);
      setIsAddingNewCar(false);
    }
  };

  const handleDeleteCar = () => {
    if (selectedCar) {
      onDeleteCar(selectedCar.id);
      setSelectedCar(null);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && selectedCar) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedCar({
        ...selectedCar,
        images: [...selectedCar.images, ...newImages].slice(0, 10),
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    if (selectedCar) {
      const newImages = selectedCar.images.filter((_, i) => i !== index);
      setSelectedCar({ ...selectedCar, images: newImages });
    }
  };

  if (isLoading) return <CarLoader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Car Management</h2>
        <Button
          onClick={handleAddCar}
          className="bg-black text-white hover:bg-gray-800 transition-colors duration-200"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Car
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card
            key={car.id}
            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <CardContent className="p-0">
              <img
                src={car.images[0] || "/placeholder.svg"}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <p className="text-muted-foreground mb-2">{car.type}</p>
                <p className="font-bold mb-2">${car.price.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {car.location}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {car.features.length > 3 && (
                    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
                      +{car.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button
                variant="outline"
                className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setSelectedCar(car)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog
        open={selectedCar !== null}
        onOpenChange={(open) => !open && setSelectedCar(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {isAddingCar ? "Add New Car" : "Edit Car"}
            </DialogTitle>
            <DialogDescription>
              {isAddingCar
                ? "Add a new car to your inventory"
                : "Make changes to the car details here"}
            </DialogDescription>
          </DialogHeader>
          {selectedCar && (
            <ScrollArea className="max-h-[80vh]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={selectedCar.name}
                      onChange={(e) =>
                        setSelectedCar({ ...selectedCar, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      value={selectedCar.type}
                      onChange={(e) =>
                        setSelectedCar({ ...selectedCar, type: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={selectedCar.price}
                      onChange={(e) =>
                        setSelectedCar({
                          ...selectedCar,
                          price: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={selectedCar.location}
                      onChange={(e) =>
                        setSelectedCar({
                          ...selectedCar,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={selectedCar.features.join(", ")}
                    onChange={(e) =>
                      setSelectedCar({
                        ...selectedCar,
                        features: e.target.value
                          .split(",")
                          .map((f) => f.trim()),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={selectedCar.description}
                    onChange={(e) =>
                      setSelectedCar({
                        ...selectedCar,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Images</Label>
                  <div className="grid grid-cols-5 gap-4 mt-2">
                    {selectedCar.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Car ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {selectedCar.images.length < 10 && (
                      <Button
                        variant="outline"
                        className="h-24 w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="h-6 w-6" />
                      </Button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCar(null)}>
              Cancel
            </Button>
            {!isAddingCar && (
              <Button
                variant="destructive"
                onClick={handleDeleteCar}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Car
              </Button>
            )}
            <Button
              onClick={handleSaveCar}
              className="bg-black text-white hover:bg-gray-800 transition-colors duration-200"
              disabled={isAddingNewCar}
            >
              {isAddingNewCar ? (
                <SmallLoader />
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />{" "}
                  {isAddingCar ? "Add Car" : "Save Changes"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
