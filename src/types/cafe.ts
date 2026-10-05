export type MenuCategory = 
  | 'coffee' 
  | 'signature' 
  | 'pastry' 
  | 'brunch' 
  | 'retail-beans';

export type DietaryTag = 'Vegan' | 'Vegetarian' | 'Gluten-Free Option' | 'House Specialty' | 'Single Origin' | 'Organic';

export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  category: MenuCategory;
  price: number;
  description: string;
  tastingNotes?: string[];
  origin?: string;
  dietary?: DietaryTag[];
  image: string;
  imageFallbackPrompt?: string;
  customizable?: boolean;
  availableGrinds?: string[];
  availableMilks?: string[];
  roastLevel?: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark';
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedMilk?: string;
  selectedGrind?: string;
  sweetnessLevel?: string;
  temperature?: 'Hot' | 'Iced';
  specialNotes?: string;
}

export interface ReservationData {
  id: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending';
  createdAt: string;
}

export interface CoffeeRecommendation {
  coffee: MenuItem;
  pastryPairing?: MenuItem;
  reason: string;
}
