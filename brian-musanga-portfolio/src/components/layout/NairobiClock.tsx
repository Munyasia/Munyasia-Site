"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Nairobi",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const PLACEHOLDER = "--:--";

function getServerSnapshot() {
  return PLACEHOLDER;
}

function getSnapshot() {
  return formatter.format(new Date());
}

function subscribe(onStoreChange: () => void) {
  const id = setInterval(onStoreChange, 1000);
  return () => clearInterval(id);
}

export function NairobiClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="label tabular-nums text-foreground">{time}</span>
  );
}
