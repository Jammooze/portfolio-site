export function censorEmail(email: string): string {
  const atIndex = email.indexOf("@");

  if (atIndex === -1) {
    throw new Error("Invalid email format.");
  }

  const username = email.slice(0, atIndex);
  const censoredUsername = username.charAt(0) + "*".repeat(username.length - 1);
  return censoredUsername + email.slice(atIndex);
}
