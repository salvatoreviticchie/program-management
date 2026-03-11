import { createModuleRecord, getModuleData } from "../_helpers/module-route";

export async function GET() {
  return getModuleData("fundraising");
}

export async function POST(request: Request) {
  const payload = await request.json();
  return createModuleRecord("fundraising", payload);
}
