import { NextResponse } from "next/server";
import { grantsDb } from "../../../lib/mockdb";

export async function GET() {
  return NextResponse.json({ data: grantsDb });
}
