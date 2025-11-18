-- Create role enum
create type public.app_role as enum ('admin', 'moderator', 'user');

-- Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    unique (user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Add SELECT policies for consultations
create policy "Admins can view all consultations"
on public.consultations
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Add SELECT policies for contact_messages
create policy "Admins can view all contact messages"
on public.contact_messages
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Add UPDATE policies for consultations
create policy "Admins can update consultations"
on public.consultations
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policies for consultations
create policy "Admins can delete consultations"
on public.consultations
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Add UPDATE policies for contact_messages
create policy "Admins can update contact messages"
on public.contact_messages
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policies for contact_messages
create policy "Admins can delete contact messages"
on public.contact_messages
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));