import { NextResponse } from "next/server";
import {
  moduleConfigs,
  type ModuleKey,
  type ModuleRecord,
} from "../../../lib/module-data";

export async function getModuleData(moduleKey: ModuleKey) {
  return NextResponse.json({ data: moduleConfigs[moduleKey] });
}

export async function createModuleRecord(
  moduleKey: ModuleKey,
  payload: Partial<ModuleRecord>,
) {
  const module = moduleConfigs[moduleKey];
  const next: ModuleRecord = {
    id: payload.id ?? `${moduleKey.toUpperCase()}-${Date.now().toString().slice(-4)}`,
    title: payload.title ?? "New record",
    owner: payload.owner ?? "Unassigned",
    status: payload.status ?? "New",
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  module.records.unshift(next);
  return NextResponse.json({ data: next }, { status: 201 });
}

export async function updateModuleRecord(
  moduleKey: ModuleKey,
  id: string,
  payload: Partial<ModuleRecord>,
) {
  const module = moduleConfigs[moduleKey];
  const index = module.records.findIndex((record) => record.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Record not found" }, { status: 404 });
  }

  module.records[index] = {
    ...module.records[index],
    ...payload,
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  return NextResponse.json({ data: module.records[index] });
}
