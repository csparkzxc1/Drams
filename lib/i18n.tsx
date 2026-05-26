"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Lang } from "./types";

const translations: Record<string, Record<Lang, string>> = {
  "entries": { ko: "노트", en: "Entries" },
  "cellar": { ko: "셀러", en: "Cellar" },
  "stats": { ko: "통계", en: "Stats" },
  "member": { ko: "멤버", en: "Member" },
  "new_entry": { ko: "새 노트", en: "New Entry" },
  "new_bottle": { ko: "보틀 추가", en: "Add Bottle" },
  "nose": { ko: "노스", en: "Nose" },
  "palate": { ko: "팔레트", en: "Palate" },
  "finish": { ko: "피니시", en: "Finish" },
  "rating": { ko: "평점", en: "Rating" },
  "save": { ko: "저장", en: "Save" },
  "cancel": { ko: "취소", en: "Cancel" },
  "delete": { ko: "삭제", en: "Delete" },
  "edit": { ko: "수정", en: "Edit" },
  "search": { ko: "검색", en: "Search" },
  "no_entries": { ko: "아직 기록된 노트가 없습니다", en: "No entries yet" },
  "no_bottles": { ko: "아직 등록된 보틀이 없습니다", en: "No bottles yet" },
  "log_first_dram": { ko: "첫 잔을 기록하세요", en: "Log your first dram" },
  "member_number": { ko: "멤버 번호", en: "Member no." },
  "member_since": { ko: "가입일", en: "Member since" },
  "total_entries": { ko: "총 기록", en: "Total entries" },
  "total_bottles": { ko: "총 보틀", en: "Total bottles" },
  "avg_rating": { ko: "평균 평점", en: "Avg. rating" },
  "region_distribution": { ko: "지역 분포", en: "Region distribution" },
  "pending_issue": { ko: "발급 대기 중", en: "Pending" },
  "settings": { ko: "설정", en: "Settings" },
  "language": { ko: "언어", en: "Language" },
  "unit": { ko: "단위", en: "Unit" },
  "drams_members": { ko: "Drams Members", en: "Drams Members" },
  "lifetime_membership": { ko: "₩12,900 — 평생 멤버십", en: "₩12,900 — Lifetime membership" },
  "bottle": { ko: "보틀", en: "Bottle" },
  "entry_no": { ko: "entry no.", en: "entry no." },
  "all": { ko: "전체", en: "All" },
  "owned": { ko: "보유", en: "Owned" },
  "tasted": { ko: "시음", en: "Tasted" },
  "wishlist": { ko: "위시", en: "Wishlist" },
  "next": { ko: "다음", en: "Next" },
  "back": { ko: "이전", en: "Back" },
  "log_this_dram": { ko: "잔을 기록한다", en: "Log this dram" },
  "select_bottle": { ko: "보틀 선택", en: "Select bottle" },
  "from_cellar": { ko: "내 셀러에서 선택", en: "From my cellar" },
  "selected": { ko: "선택됨", en: "Selected" },
  "confirm_delete": { ko: "정말 삭제하시겠습니까?", en: "Delete this?" },
  "location": { ko: "장소", en: "Location" },
  "companions": { ko: "동행", en: "Companions" },
  "serving_style": { ko: "서빙 스타일", en: "Serving style" },
  "add_note": { ko: "기록", en: "Log" },
  "no_notes_yet": { ko: "아직 기록이 없습니다", en: "No notes yet" },
};

type I18nContextValue = {
  lang: Lang;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
  lang: "ko",
  t: (key: string) => key,
});

export function I18nProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      t: (key: string) => translations[key]?.[lang] ?? key,
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
