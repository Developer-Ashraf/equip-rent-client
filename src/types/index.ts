export interface Equipment {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rentalPrice?: number;
  rentalType: "Daily" | "Weekly" | "Monthly";
  location: string;
  quantity: number;
  availableQuantity?: number;
  condition: string;
  brand: string;
  model: string;
  image: string;
  terms?: string;
  rentalTerms?: string;
  status: "pending" | "approved" | "rejected";
  ownerId?: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhoto?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  _id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentImage?: string;
  ownerId?: string;
  ownerName?: string;
  ownerEmail?: string;
  customerId?: string;
  customerName?: string;
  customerEmail: string;
  startDate: string;
  endDate: string;
  rentalStartDate?: string;
  rentalEndDate?: string;
  rentalDurationDays?: number;
  quantity: number;
  requiredQuantity?: number;
  phone?: string;
  contactNumber?: string;
  deliveryAddress: string;
  notes?: string;
  additionalNotes?: string;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  bookingStatus: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
  bookingDate?: string;
  paidAt?: string;
}

export interface FavoriteItem {
  _id: string;
  userId: string;
  userEmail: string;
  equipmentId: string;
  createdAt: string;
  equipment?: Equipment;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "customer" | "owner" | "admin";
  phone?: string;
  address?: string;
  createdAt?: string;
}
