"use client";

import { useSyncExternalStore } from "react";

/* Africa/Nairobi has never observed DST, so this resolves to a fixed UTC+3,
   but naming the IANA zone rather than hardcoding an offset is still the right
   input: the time stays Brian's regardless of where the visitor's own machine
   clock is set. */
const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Nairobi",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/* The server has no business guessing a wall clock. It renders dashes, the
   client swaps in the real time after hydration, and the two markups match.
   Same character count as a real reading, so nothing shifts when it lands. */
const PLACEHOLDER = "--:--";

function getServerSnapshot() {
  return PLACEHOLDER;
}

/* Safe to format fresh on every call: the string only changes once a minute,
   and React compares snapshots by value, so equal strings are not a change. */
function getSnapshot() {
  return formatter.format(new Date());
}

/* Polls every second even though the reading only moves once a minute, so the
   flip lands within a second of the real boundary instead of drifting up to a
   minute behind it. Fifty-nine of every sixty checks return the same string
   and React re-renders nothing. */
function subscribe(onStoreChange: () => void) {
  const id = setInterval(onStoreChange, 1000);
  return () => clearInterval(id);
}

/* useSyncExternalStore rather than useState in an effect: a clock is an
   external mutable source, and this is the one hook that gets the hydration
   handoff right without a setState call in an effect body. */
export function NairobiClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* Not an aria-live region on purpose. The text changes on its own, and
     announcing that on a loop would make the navbar unusable with a screen
     reader. Read on demand like any other label. */
  return (
    <span className="label tabular-nums text-foreground">{time}</span>
  );
}
