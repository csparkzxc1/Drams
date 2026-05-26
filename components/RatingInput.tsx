"use client";

import { IconStar, IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";

type Props = {
  value: number;
  onChange: (v: number) => void;
  size?: number;
};

export default function RatingInput({ value, onChange, size = 32 }: Props) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        const filled = value >= star;
        const half = !filled && value >= star - 0.5;

        return (
          <button
            key={star}
            type="button"
            className="text-amber active:scale-110 transition-transform relative"
            onClick={() => {
              if (value === star) {
                onChange(star - 0.5);
              } else if (value === star - 0.5) {
                onChange(star - 1);
              } else {
                onChange(star);
              }
            }}
          >
            {filled ? (
              <IconStarFilled size={size} />
            ) : half ? (
              <IconStarHalfFilled size={size} />
            ) : (
              <IconStar size={size} stroke={1.5} className="text-ash-soft" />
            )}
          </button>
        );
      })}
      <span className="font-serif text-xl text-amber ml-2">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
