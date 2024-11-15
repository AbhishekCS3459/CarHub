"use client";

import * as React from "react";
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CarData {
  id: number;
  name: string;
  type: string;
  image: string;
  price: number;
  location: string;
  features: string[];
  status: string;
}

interface SearchBarProps {
  cars: CarData[];
  onSearch: (term: string) => void;
  onSelect: (car: CarData) => void;
}

export default function SearchBar({
  cars,
  onSearch,
  onSelect,
}: SearchBarProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
    setOpen(false);
  };

  const handleSelect = (car: CarData) => {
    setSearchTerm(car.name);
    onSelect(car);
    setOpen(false);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-2xl">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search by make, model, or type..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setOpen(true);
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 pr-20 py-6"
            />
            <Button
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Cars">
                {filteredCars.map((car) => (
                  <CommandItem
                    key={car.id}
                    onSelect={() => handleSelect(car)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-8 h-8 mr-2 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{car.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {car.type}
                        </p>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}