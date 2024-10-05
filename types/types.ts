export interface UserDetails {
  id: string;
  name: string;
  avatar_url?: string;
}

export interface Image {
  id: string;
  title: string;
  description: string;
  is_public: boolean;
  image_path: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
