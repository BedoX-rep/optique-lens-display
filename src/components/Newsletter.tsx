
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">
              Hassle free,<br />
              glasses delivered<br />
              directly to your<br />
              front door.
            </h2>
          </div>
          <div className="text-white">
            <p className="mb-6 leading-relaxed">
              Direct Sight is a proud supporter of sustainable eyewear throughout the supply chain and the extended supply chain directly to you. We signed the UN commitment and the extended supply chain directly to you. We signed the UN's complete with prescription glasses when the whole family needs them, often the same day as your order. And if you've got a glasses emergency, you can even get next-day to any UK address, even on weekends.
            </p>
            <p className="mb-6 leading-relaxed">
              Our prescription glasses are fair-trade in design, with affordable prescription lenses. If you looking for prescription glasses or a funky new set of fashion glasses frames without prescription lenses, we host the right optical solution that fits your style. Our expert team based optometrists check to recommend the perfect lenses that suit your own prescription to leave your door for a hassle-free buying experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
