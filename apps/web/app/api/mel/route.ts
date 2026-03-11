import { getModuleData } from "../_helpers/module-route";

export async function GET() {
  return getModuleData("mel");
}
