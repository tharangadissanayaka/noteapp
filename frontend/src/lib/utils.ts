import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Session from 'supertokens-web-js/recipe/session';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function doesSessionExist(): Promise<boolean> {
  if (await Session.doesSessionExist()) {
    // user is logged in
    return true;
  } else {
    // user has not logged in yet
    return false;
  }
}

export async function logout() {
  await Session.signOut();
  window.location.href = "/"; // or to wherever your logic page is
}

export function getUserIntials(email: string): string {
  const [local] = email.split('@');
  const display = local
    .split(/[._-]/)
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
  const initials = display
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w.charAt(0))
    .join('')
    .toUpperCase() || (email ? email.charAt(0).toUpperCase() : "U");
  return initials;
}

export function getDisplayName(email: string): string {
  const [local] = email.split('@');
  const display = local
    .split(/[._-]/)
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
  return display;
}