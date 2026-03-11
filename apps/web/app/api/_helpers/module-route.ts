import { NextResponse } from "next/server";
import { moduleConfigs, type ModuleKey } from "../../../lib/module-data";

export async function getModuleData(moduleKey: ModuleKey) {
  return NextResponse.json({ data: moduleConfigs[moduleKey] });
}
