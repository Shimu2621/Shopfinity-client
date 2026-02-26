import {
  Headphones,
  Tv,
  Camera,
  Smartphone,
  Video,
  Gamepad2,
  Watch,
  Book,
  Tablet,
  Shirt,
  Laptop,
  Package,
} from "lucide-react";

export const categoryIconMap: Record<string, React.ElementType> = {
  Headphone: Headphones,
  TV: Tv,
  Cameras: Camera,
  Mobile: Smartphone,
  "Action Camera": Video,
  "Gaming Console": Gamepad2,
  Accessories: Package,
  Watch: Watch,
  Books: Book,
  Laptop: Laptop,
  Fashion: Shirt,
  Tablets: Tablet,
};

export const categoryColors = [
  "bg-pink-100 text-pink-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-yellow-100 text-yellow-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-red-100 text-red-600",
  "bg-teal-100 text-teal-600",
];
