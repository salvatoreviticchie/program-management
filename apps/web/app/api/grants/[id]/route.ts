import { NextResponse } from "next/server";
import { grantsDb, type Stage } from "../../../../lib/mockdb";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await request.json()) as { stage?: Stage; note?: string };

  const index = grantsDb.findIndex((row) => row.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Record not found" }, { status: 404 });
  }

  grantsDb[index] = {
    ...grantsDb[index],
    ...(body.stage ? { stage: body.stage } : {}),
    ...(typeof body.note === "string" ? { note: body.note } : {}),
  };

  return NextResponse.json({ data: grantsDb[index] });
}
