import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 

type SortOrder = "asc" | "des";
/**
* Sorts an array of items.
*
* @param arrayItems The array to be sorted.
* @param sortBy The key to be sorted by
* @param order ordering direction, either by ascending or descending
* @returns The sorted item.
*/
export const sortItems = <T>(
arrayItems: T[],
sortBy?: keyof T,
order:SortOrder = "asc"
) => {
if (arrayItems?.length) {
  const basicConditions = Array.isArray(arrayItems) && sortBy;
  if (basicConditions) {
    const sort = [...arrayItems]?.sort((itemA, itemB) =>
      order === "asc"
        ? String(itemA[sortBy])?.localeCompare(String(itemB[sortBy]))
        : String(itemB[sortBy])?.localeCompare(String(itemA[sortBy]))
    );
    return sort;
  } else if (order === "asc") {
    return [...arrayItems]?.sort((a, b) =>
      String(a).localeCompare(String(b))
    );
  } else {
    return [...arrayItems]?.sort((a, b) =>
      String(b).localeCompare(String(a))
    );
  }
}
return [];
};