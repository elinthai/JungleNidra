import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { getLocations } from "../../../lib/store";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const locations = await getLocations();
  return NextResponse.json(locations);
}
