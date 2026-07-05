import { cookies } from "next/headers";
import { CHANNELS } from "./channels";

const COOKIE_NAME = "active_channel";

export function getActiveChannel(): string {
  const value = cookies().get(COOKIE_NAME)?.value;
  return CHANNELS.some((c) => c.slug === value) ? (value as string) : CHANNELS[0].slug;
}
