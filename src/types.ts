export interface Treatment {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  indications: string[];
  iconName: string; // Used to dynamic render Lucide icons
  duration: string;
  price: string; // For realistic pricing feedback e.g. "R$ 120" or "Sob consulta"
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  role: string;
  image: string;
}

export interface AppointmentInput {
  name: string;
  email: string;
  phone: string;
  treatmentId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface ImageAssetPaths {
  hero: string;
  clinic: string;
  profile: string;
}
