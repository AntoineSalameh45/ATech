export function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.');
    if (!payload) {return true;}
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/')),
    );
    if (!decoded.exp) {return true;}
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
