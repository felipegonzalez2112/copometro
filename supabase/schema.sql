-- ChinChin: schema para un uso personal sin autenticación.
-- IMPORTANTE: las políticas anon permiten que cualquiera con la URL pública acceda.
-- No contiene secretos; proteger datos privados requeriría autenticación.
create table if not exists public.drinks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null default '',
  category text not null,
  country text not null default '',
  alcohol_percentage numeric(5,2),
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  drink_id uuid not null references public.drinks(id) on delete cascade,
  score integer not null check (score between 1 and 10),
  comments text not null default '',
  tasted_at date not null default current_date,
  would_drink_again boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.drinks enable row level security;
alter table public.ratings enable row level security;

grant select, insert, update, delete on public.drinks to anon;
grant select, insert, update, delete on public.ratings to anon;

create policy "Personal drinks access" on public.drinks for all to anon using (true) with check (true);
create policy "Personal ratings access" on public.ratings for all to anon using (true) with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('drink-images', 'drink-images', true, 10485760, array['image/jpeg','image/png','image/webp','image/heic'])
on conflict (id) do nothing;

create policy "Public read drink images" on storage.objects for select to anon using (bucket_id = 'drink-images');
create policy "Upload drink images" on storage.objects for insert to anon with check (bucket_id = 'drink-images');
create policy "Update drink images" on storage.objects for update to anon using (bucket_id = 'drink-images') with check (bucket_id = 'drink-images');
create policy "Delete drink images" on storage.objects for delete to anon using (bucket_id = 'drink-images');
