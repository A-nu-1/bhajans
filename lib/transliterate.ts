import { transliterate as tr } from "transliteration";

export function trans(text: string) {
  // basic fallback (we improve later)
  return tr(text);
}
