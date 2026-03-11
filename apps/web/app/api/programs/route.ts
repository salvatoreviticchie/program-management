import { createModuleRecord, getModuleData } from "../_helpers/module-route";

export async function GET() {
  return getModuleData("programs");
}

export async function POST(request: Request) {
  const payload = await request.json();
  return createModuleRecord("programs", payload);
}
