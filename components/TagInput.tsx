"use client";

import { useState } from "react";
import { IconX } from "@tabler/icons-react";

const SUGGESTED_TAGS = [
  "peat", "smoke", "sherry", "honey", "vanilla", "citrus", "oak",
  "caramel", "chocolate", "spice", "fruit", "floral", "malt",
  "maritime", "brine", "leather", "tobacco", "nutty", "dried fruit",
  "toffee", "cinnamon", "ginger", "pepper", "apple", "pear",
  "tropical", "berry", "cherry", "plum", "orange peel", "lemon",
  "heather", "grass", "herbal", "mineral", "creamy", "oily",
  "butterscotch", "coffee", "iodine", "tar", "medicinal",
];

type Props = {
  tags: string[];
  onChange: (tags: string[]) => void;
};

export default function TagInput({ tags, onChange }: Props) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const t = tag.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      onChange([...tags, t]);
    }
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const suggestions = SUGGESTED_TAGS.filter(
    (s) => !tags.includes(s) && (input === "" || s.includes(input.toLowerCase()))
  ).slice(0, 12);

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber/15 text-amber text-xs font-mono tracking-mono-tight"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-amber/60 hover:text-amber"
              >
                <IconX size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(input);
          }
        }}
        placeholder="태그 추가..."
        className="w-full bg-ink border border-border rounded-lg px-3 py-2 text-cream text-sm placeholder:text-ash-soft focus:outline-none focus:border-amber/50 transition-colors"
      />

      <div className="flex flex-wrap gap-1.5 mt-2">
        {suggestions.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => addTag(tag)}
            className="px-2 py-0.5 rounded border border-border-soft text-ash text-[11px] font-mono tracking-mono-tight hover:border-amber/30 hover:text-cream transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
