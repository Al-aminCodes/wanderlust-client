import MyBookingList from "./MyBookingList";

export const dynamic = "force-dynamic";

export interface Booking {
  _id: string;
  bookingDate: string;
  category: string;
  country: string;
  departureDate: string;
  description: string;
  duration: string;
  email: string;
  image: string;
  imageUrl: string;
  name: string;
  price: string;
  userName: string;
  status?: "Confirmed" | "Pending" | "Cancelled";
}

async function getBookings(): Promise<Booking[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return response.json();
  } catch (error) {
    console.error("Booking fetch error:", error);
    return [];
  }
}

export default async function MyBookingsPage() {
  const bookings = await getBookings();

  return <MyBookingList initialBookings={bookings} />;
}
