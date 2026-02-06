
-- 1. Add RLS policies to user_roles table
-- Users can read their own roles
CREATE POLICY "Users can read own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins can manage all roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Add validation trigger for consultations to limit input lengths
CREATE OR REPLACE FUNCTION public.validate_consultation_input()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be less than 100 characters';
  END IF;
  IF length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email must be less than 255 characters';
  END IF;
  IF length(NEW.phone) > 20 THEN
    RAISE EXCEPTION 'Phone must be less than 20 characters';
  END IF;
  IF length(NEW.web_idea) > 2000 THEN
    RAISE EXCEPTION 'Web idea must be less than 2000 characters';
  END IF;
  IF length(NEW.project_type) > 100 THEN
    RAISE EXCEPTION 'Project type must be less than 100 characters';
  END IF;
  IF length(NEW.budget) > 50 THEN
    RAISE EXCEPTION 'Budget must be less than 50 characters';
  END IF;
  IF length(NEW.delivery_time) > 50 THEN
    RAISE EXCEPTION 'Delivery time must be less than 50 characters';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_consultation_before_insert
BEFORE INSERT ON public.consultations
FOR EACH ROW
EXECUTE FUNCTION public.validate_consultation_input();

-- 3. Add validation trigger for contact_messages
CREATE OR REPLACE FUNCTION public.validate_contact_message_input()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be less than 100 characters';
  END IF;
  IF length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email must be less than 255 characters';
  END IF;
  IF length(NEW.message) > 2000 THEN
    RAISE EXCEPTION 'Message must be less than 2000 characters';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_contact_message_before_insert
BEFORE INSERT ON public.contact_messages
FOR EACH ROW
EXECUTE FUNCTION public.validate_contact_message_input();

-- 4. Enable realtime on contact_messages and consultations
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.consultations;
