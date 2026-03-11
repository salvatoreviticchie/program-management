import { createModuleRecord, getModuleData } from "../_helpers/module-route";

export async function GET() {
  return getModuleData("mel");
}

export async function POST(request: Request) {
  const payload = await request.json();
  return createModuleRecord("mel", payload);
}
