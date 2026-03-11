import { NextResponse } from "next/server";
import { updateModuleRecord } from "../../../_helpers/module-route";
import type { ModuleKey } from "../../../../../lib/module-data";

const allowed = new Set<ModuleKey>([
  "crm",
  "fundraising",
  "programs",
  "grants",
  "mel",
  "portal",
  "admin",
]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ module: string; id: string }> },
) {
  const { module, id } = await params;
  if (!allowed.has(module as ModuleKey)) {
    return NextResponse.json({ error: "Invalid module" }, { status: 400 });
  }

  const payload = await request.json();
  return updateModuleRecord(module as ModuleKey, id, payload);
}
