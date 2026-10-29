"use client";

import { useMemo, useState } from "react";

import DestinationCard, { type Travel } from "@/components/DestinationCard";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DestinationListProps {
  destinations: Travel[];
}

export default function DestinationList({
  destinations,
}: DestinationListProps) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(
    () => [...new Set(destinations.map((item) => item.category))],
    [destinations],
  );

  const filteredDestinations = useMemo(() => {
    let result = destinations.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;

      const price = Number(item.price);

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "low" && price < 5000) ||
        (priceRange === "medium" && price >= 5000 && price <= 20000) ||
        (priceRange === "high" && price > 20000);

      return matchesCategory && matchesPrice;
    });

    result = [...result];

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-high":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "date":
        result.sort(
          (a, b) =>
            new Date(a.departureDate).getTime() -
            new Date(b.departureDate).getTime(),
        );
        break;
    }

    return result;
  }, [destinations, category, priceRange, sortBy]);

  const selectClass =
    "h-7 w-full rounded-none border-0 bg-transparent px-2 shadow-none focus-visible:ring-0";

  return (
    <section>
      {/* Filters */}
      <div className="grid grid-cols-1 border border-gray-200 sm:grid-cols-3">
        <Select
          value={category}
          onValueChange={(value) => {
            if (value !== null) setCategory(value);
          }}
        >
          <SelectTrigger
            aria-label="Filter by category"
            className={`${selectClass} sm:border-r sm:border-gray-200`}
          >
            <SelectValue placeholder="CATEGORY" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>

            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={priceRange}
          onValueChange={(value) => {
            if (value !== null) setPriceRange(value);
          }}
        >
          <SelectTrigger
            aria-label="Filter by price"
            className={`${selectClass} sm:border-r sm:border-gray-200`}
          >
            <SelectValue placeholder="PRICE RANGE" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All prices</SelectItem>
            <SelectItem value="low">Under $5,000</SelectItem>
            <SelectItem value="medium">$5,000 – $20,000</SelectItem>
            <SelectItem value="high">Above $20,000</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value) => {
            if (value !== null) setSortBy(value);
          }}
        >
          <SelectTrigger aria-label="Sort destinations" className={selectClass}>
            <SelectValue placeholder="SORT BY" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="default">Default order</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name: A to Z</SelectItem>
            <SelectItem value="date">Departure Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="mt-2.5 text-[10px] text-gray-500" aria-live="polite">
        Showing {filteredDestinations.length} destinations
      </p>

      {/* Destination Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <h2 className="text-lg font-medium text-gray-800">
            No destinations found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your filters.
          </p>

          <button
            onClick={() => {
              setCategory("all");
              setPriceRange("all");
              setSortBy("default");
            }}
            className="mt-4 text-sm text-sky-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
