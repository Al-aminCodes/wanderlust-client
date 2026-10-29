import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarDays, ArrowUpRight, Star, Clock3 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Travel {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

interface DestinationCardProps {
  destination: Travel;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 overflow-hidden sm:h-48 lg:h-52">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />

        {/* Category */}
        <Badge className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur-md hover:bg-white">
          {destination.category}
        </Badge>

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          4.5
        </div>

        {/* Country over image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white">
          <MapPin size={15} />
          {destination.country}
        </div>
      </div>

      {/* Content */}
      <CardContent className="space-y-4 p-5">
        <div>
          <h2 className="line-clamp-1 text-lg font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-teal-700">
            {destination.name}
          </h2>

          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
            {destination.description}
          </p>
        </div>

        {/* Duration and departure */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-gray-100 py-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock3 size={14} className="text-teal-600" />
            <span>{destination.duration} days / nights</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CalendarDays size={14} className="text-teal-600" />
            <span>{destination.departureDate}</span>
          </div>
        </div>

        {/* Price and action */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>

            <p className="mt-0.5 text-xl font-bold tracking-tight text-gray-900">
              ৳{Number(destination.price).toLocaleString()}
              <span className="ml-1 text-xs font-normal text-gray-500">
                / person
              </span>
            </p>
          </div>

          <Link
            href={`/destination/${destination._id}`}
            className="shrink-0 rounded-xl bg-teal-700 px-4 text-white shadow-sm transition-colors hover:bg-teal-800"
          >
            Explore
            <ArrowUpRight size={16} className="ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
