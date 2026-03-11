import {
  Waves,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Users,
  Briefcase,
  Plane,
  Wifi,
  ConciergeBell,
  WashingMachine,
  Car,
  ShieldCheck,
  Coffee,
  Wine,
  Clock,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Waves,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Users,
  Briefcase,
  Plane,
  Wifi,
  ConciergeBell,
  WashingMachine,
  Car,
  ShieldCheck,
  Coffee,
  Wine,
  Clock,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Briefcase;
}
