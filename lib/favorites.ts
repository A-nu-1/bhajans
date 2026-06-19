



export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];

  return JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
}

export function isFavorite(id: string) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string) {
  const favorites = getFavorites();

  if (favorites.includes(id)) {
    localStorage.setItem(
      "favorites",
      JSON.stringify(
        favorites.filter((f) => f !== id)
      )
    );
  } else {
    localStorage.setItem(
      "favorites",
      JSON.stringify([...favorites, id])
    );
  }
}