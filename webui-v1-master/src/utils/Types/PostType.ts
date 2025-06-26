export type PostType = {
  data: PostTypeSingle[];
};

export type PostTypeSingle = {
  id: string;
  sort: any;
  user_created: UserType;
  date_created: string;
  caption: string;
  post_img: { id: string };
  likes: Array<string>;
};
export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location: any;
  title: any;
  description: any;
  tags: any;
  avatar: any;
  language: any;
  tfa_secret: any;
  status: string;
  role: string;
  token: any;
  last_access: string;
  last_page: any;
  provider: string;
  external_identifier: any;
  auth_data: any;
  email_notifications: boolean;
  appearance: any;
  theme_dark: any;
  theme_light: any;
  theme_light_overrides: any;
  theme_dark_overrides: any;
};
