import { createModuleRecord, getModuleData } from "../_helpers/module-route";

export async function GET() {
  return getModuleData("portal");
}

export async function POST(request: Request) {
  const payload = await request.json();
  return createModuleRecord("portal", payload);
}
