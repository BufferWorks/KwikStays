export async function logout(router) {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    // Redirect to login
    router.push("/auth/login");

    // IMPORTANT for App Router – clears cached layouts
    router.refresh();
  } catch (err) {
    console.error("Logout failed:", err);
  }
}
