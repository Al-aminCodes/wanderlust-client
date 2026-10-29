import { connectDB } from "@/lib/db";
import { Destination } from "@/lib/models/destination";

const REQUIRED_FIELDS = [
  "destinationName",
  "country",
  "category",
  "duration",
] as const;

export async function GET() {
  try {
    await connectDB();
    const destinations = await Destination.find()
      .sort({ createdAt: -1 })
      .lean();
    return Response.json({ destinations });
  } catch (error) {
    console.error("GET /api/destinations failed:", error);
    return Response.json(
      { error: "Failed to load destinations." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const text = (value: unknown) =>
    typeof value === "string" ? value.trim() : "";

  const missing = REQUIRED_FIELDS.filter((field) => !text(data[field]));
  if (missing.length > 0) {
    return Response.json(
      { error: `Missing required fields: ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  const price = Number(data.price);
  if (!Number.isFinite(price) || price < 0) {
    return Response.json(
      { error: "Price must be a valid non-negative number." },
      { status: 400 }
    );
  }

  const departureDate = new Date(text(data.departureDate));
  if (Number.isNaN(departureDate.getTime())) {
    return Response.json(
      { error: "Departure date must be a valid date." },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const destination = await Destination.create({
      destinationName: text(data.destinationName),
      country: text(data.country),
      category: text(data.category),
      price,
      duration: text(data.duration),
      departureDate,
      imageUrl: text(data.imageUrl),
      description: text(data.description),
    });

    return Response.json({ destination }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error("POST /api/destinations failed:", error);
    return Response.json(
      { error: "Failed to save the travel package." },
      { status: 500 }
    );
  }
}
