
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Car, Users, Trophy, Clock } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Car,
      title: "Premium Fleet",
      description: "Access to a wide range of luxury and comfort vehicles"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Dedicated support team available 24/7 for your needs"
    },
    {
      icon: Trophy,
      title: "Top Rated",
      description: "Consistently rated 5 stars by our satisfied customers"
    },
    {
      icon: Clock,
      title: "Flexible Rentals",
      description: "Hourly, daily, or weekly rentals to suit your schedule"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About CarRental
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Your trusted partner in premium car rentals since 2010. We provide exceptional service and top-quality vehicles for every occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-accent/10 rounded-2xl p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              We strive to provide the best car rental experience possible, combining luxury vehicles with exceptional service. Our commitment to quality and customer satisfaction has made us a leader in the industry, serving thousands of satisfied customers each year.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
