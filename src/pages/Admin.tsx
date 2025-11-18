import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Session } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/badge";
import { LogOut, Mail, Calendar, DollarSign, Clock } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  web_idea: string;
  project_type: string;
  budget: string;
  delivery_time: string;
  consultation_date: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    // Check for existing session and verify admin role
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (error || !roleData) {
        toast.error("Access denied. You need admin privileges.");
        await supabase.auth.signOut();
        navigate("/auth");
        return;
      }

      setIsAdmin(true);
      fetchData();
      setLoading(false);
    };

    checkAuth();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [messagesResult, consultationsResult] = await Promise.all([
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('consultations').select('*').order('created_at', { ascending: false })
      ]);

      if (messagesResult.error) throw messagesResult.error;
      if (consultationsResult.error) throw consultationsResult.error;

      setContactMessages(messagesResult.data || []);
      setConsultations(consultationsResult.data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch data");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage contact messages and consultation requests</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="messages">
              Contact Messages ({contactMessages.length})
            </TabsTrigger>
            <TabsTrigger value="consultations">
              Consultations ({consultations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            {contactMessages.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No contact messages yet</p>
                </CardContent>
              </Card>
            ) : (
              contactMessages.map((message) => (
                <Card key={message.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{message.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Mail className="w-4 h-4" />
                          {message.email}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {new Date(message.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 whitespace-pre-wrap">{message.message}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="consultations" className="space-y-4">
            {consultations.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No consultation requests yet</p>
                </CardContent>
              </Card>
            ) : (
              consultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{consultation.name}</CardTitle>
                        <CardDescription className="space-y-1 mt-2">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {consultation.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 flex items-center">📱</span>
                            {consultation.phone}
                          </div>
                        </CardDescription>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant="secondary">
                          {new Date(consultation.created_at).toLocaleDateString()}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(consultation.consultation_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Project Idea:</h4>
                      <p className="text-foreground/80 whitespace-pre-wrap">{consultation.web_idea}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Project Type</p>
                        <Badge variant="outline">{consultation.project_type}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          Budget
                        </p>
                        <Badge variant="outline">{consultation.budget}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Delivery Time
                        </p>
                        <Badge variant="outline">{consultation.delivery_time}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
