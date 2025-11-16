-- Create consultations table
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  consultation_date DATE NOT NULL,
  web_idea TEXT NOT NULL,
  budget TEXT NOT NULL,
  delivery_time TEXT NOT NULL,
  project_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for public form submissions)
CREATE POLICY "Anyone can insert consultations"
ON public.consultations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for public form submissions)
CREATE POLICY "Anyone can insert contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);