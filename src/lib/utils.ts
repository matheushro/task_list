import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateToBR(dateString: string): string | null {
  if(dateString){
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy');
  }
  return '';
}

export function formatCurrencyToBR (value: number): string {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(value);
};

