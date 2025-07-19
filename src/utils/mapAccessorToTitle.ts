const dictionary: Record<string, string> = {
  "filename": "نام فایل",
  "duration": "مدت زمان",
  "processed": "تاریخ بارگذاری"
}

export function getTitleFromAccessor(accessor: string) {
  return dictionary[accessor] ?? "";
}