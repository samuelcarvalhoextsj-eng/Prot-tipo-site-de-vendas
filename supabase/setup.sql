-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. ENUMS
create type user_role as enum ('admin', 'customer');
create type order_status as enum ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

-- 2. PROFILES (Extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role user_role default 'customer'::user_role not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. CATEGORIES
create table if not exists public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;
create policy "Categories are viewable by everyone." on categories for select using (true);
create policy "Only admins can modify categories." on categories for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 4. PRODUCTS
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10, 2) not null,
  stock integer not null default 0,
  images text[] default array[]::text[],
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.products enable row level security;
create policy "Products are viewable by everyone." on products for select using (true);
create policy "Only admins can modify products." on products for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 5. ORDERS
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete restrict not null,
  status order_status default 'pending'::order_status not null,
  total_amount numeric(10, 2) not null,
  shipping_address jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;
create policy "Users can view their own orders." on orders for select using (auth.uid() = user_id);
create policy "Admins can view all orders." on orders for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can create their own orders." on orders for insert with check (auth.uid() = user_id);
create policy "Only admins can update order status." on orders for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 6. ORDER ITEMS
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete restrict not null,
  quantity integer not null,
  price_at_time numeric(10, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.order_items enable row level security;
create policy "Users can view their own order items." on order_items for select using (
  exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Users can insert their own order items." on order_items for insert with check (
  exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Admins can view all order items." on order_items for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 7. REVIEWS
create table if not exists public.reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(product_id, user_id)
);

alter table public.reviews enable row level security;
create policy "Approved reviews are viewable by everyone." on reviews for select using (is_approved = true);
create policy "Users can view their own unapproved reviews." on reviews for select using (auth.uid() = user_id);
create policy "Admins can view all reviews." on reviews for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can create reviews." on reviews for insert with check (auth.uid() = user_id);
create policy "Admins can update reviews (approve/hide)." on reviews for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 8. QUESTIONS
create table if not exists public.questions (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade not null,
  question text not null,
  answer text,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  answered_at timestamp with time zone
);

alter table public.questions enable row level security;
create policy "Approved questions are viewable by everyone." on questions for select using (is_approved = true);
create policy "Users can view their own questions." on questions for select using (auth.uid() = user_id);
create policy "Admins can view all questions." on questions for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can create questions." on questions for insert with check (auth.uid() = user_id);
create policy "Admins can answer and approve questions." on questions for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 9. FAQ
create table if not exists public.faq (
  id uuid default uuid_generate_v4() primary key,
  question text not null,
  answer text not null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.faq enable row level security;
create policy "FAQ is viewable by everyone." on faq for select using (true);
create policy "Only admins can modify FAQ." on faq for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 10. NOTIFICATIONS
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;
create policy "Users can view their own notifications." on notifications for select using (auth.uid() = user_id);
create policy "Users can update their own notifications (read)." on notifications for update using (auth.uid() = user_id);
create policy "Admins can create notifications." on notifications for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 11. AUDIT LOGS
create table if not exists public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  table_name text not null,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.audit_logs enable row level security;
create policy "Only admins can view audit logs." on audit_logs for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
-- Inserts into audit logs are usually done via triggers, but we can allow backend service role to insert.

-- Trigger for updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger set_products_updated_at before update on public.products for each row execute procedure public.set_updated_at();
create trigger set_orders_updated_at before update on public.orders for each row execute procedure public.set_updated_at();

-- Trigger for stock management (simplified for now, ideally checked in edge function or server action to prevent race conditions properly)
create or replace function public.decrement_stock()
returns trigger as $$
begin
  update public.products
  set stock = stock - new.quantity
  where id = new.product_id and stock >= new.quantity;
  
  if not found then
    raise exception 'Out of stock for product %', new.product_id;
  end if;
  
  return new;
end;
$$ language plpgsql;

create trigger decrement_stock_on_order_item
  before insert on public.order_items
  for each row execute procedure public.decrement_stock();

-- 12. GRANTS
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
