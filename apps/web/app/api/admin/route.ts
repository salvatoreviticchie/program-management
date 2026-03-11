import { createModuleRecord, getModuleData } from "../_helpers/module-route";

export async function GET() {
  return getModuleData("admin");
}

export async function POST(request: Request) {
  const payload = await request.json();
  return createModuleRecord("admin", payload);
}
