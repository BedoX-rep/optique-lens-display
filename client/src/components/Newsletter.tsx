
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-16 bg-purple-800">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get the latest news about new arrivals, special offers, and exclusive deals
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="bg-white text-gray-900 border-none"
            />
            <Button className="bg-white text-purple-800 hover:bg-gray-100 px-8">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm mt-4 text-purple-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
