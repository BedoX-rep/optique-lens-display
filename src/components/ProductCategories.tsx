
const ProductCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ordering your glasses online just got easier.
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Shop thousands of glasses and sunglasses with prescription lenses. Next Day
            Express and frames starting from just £39
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Complete Glasses */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <div className="aspect-[4/3] bg-gradient-to-br from-orange-300 to-orange-400"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">COMPLETE GLASSES</h3>
                <p className="text-lg">From only £39</p>
              </div>
            </div>
          </div>

          {/* Get 15% Off */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <div className="aspect-[4/3] bg-gradient-to-br from-blue-300 to-blue-400"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">GET 15% OFF</h3>
                <p className="text-lg">With two or more pairs of glasses or sunglasses</p>
              </div>
            </div>
          </div>

          {/* Glasses Next Day */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <div className="aspect-[4/3] bg-gradient-to-br from-green-300 to-green-400"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">GLASSES NEXT DAY</h3>
                <p className="text-lg">Order before 4:30pm, get tomorrow or Saturday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
