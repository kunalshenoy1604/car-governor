
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, BarChart3, Car, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { OverviewSection } from "@/components/admin/OverviewSection";
import { CarsSection } from "@/components/admin/CarsSection";
import { BookingsSection } from "@/components/admin/BookingsSection";
import { UsersSection } from "@/components/admin/UsersSection";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const { profile, isAdmin, signOut, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
  }, [authLoading, isAdmin, navigate, toast]);

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full grid grid-cols-4 h-auto p-1">
            <TabsTrigger value="overview" className="py-2 px-3">
              <BarChart3 className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="py-2 px-3">
              <Car className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Cars</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="py-2 px-3">
              <Calendar className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="py-2 px-3">
              <Users className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Users</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewSection />
          </TabsContent>
          <TabsContent value="cars">
            <CarsSection />
          </TabsContent>
          <TabsContent value="bookings">
            <BookingsSection />
          </TabsContent>
          <TabsContent value="users">
            <UsersSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
