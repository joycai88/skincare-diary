import { Filter, Plus } from "lucide-react";
import { useState } from "react";
import NewProduct from "../components/NewProduct";

function ProductPage() {
    const [filterType, setFilterType] = useState('date-added');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        brand: '',
        type: 'cleanser',
        description: '',
        price: '',
        count: 0,
        imageUrl: ''
    });

    const applyFilter = (products, type) => {
        let sorted = [...products];

        if (type == 'date-added') {
            sorted.sort((a,b) => b.createdAt - a.createdAt);
        } 
    }

    const handleFilterChange = (type) => {
        setFilterType(type);
        applyFilter(products, type);
        setShowFilterMenu(false);
    };

    return(
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
          </div>
          
          <div className="flex gap-3">
            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2 px-4 py-3 bg-[#bfd3c1]/50 hover:bg-[#68a691] border border-[#68a691]/30 rounded-lg transition-all text-[#694f5d]"
              >
                <Filter size={20} />
                <span className="hidden sm:inline">Filter</span>
              </button>
              
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-[#bfd3c1] border border-[#68a691]/30 rounded-lg shadow-2xl shadow-[#68a691]/20 overflow-hidden z-10">
                  <button
                    onClick={() => handleFilterChange('date-added')}
                    className={`w-full text-left px-4 py-3 hover:bg-[#68a691] transition-colors ${
                      filterType === 'date-added' ? 'text-black bg-[#68a691]/50' : 'text-[#694f5d]'
                    }`}
                  >
                    Date Added
                  </button>
                  <button
                    onClick={() => handleFilterChange('product-type')}
                    className={`w-full text-left px-4 py-3 hover:bg-[#68a691] transition-colors ${
                      filterType === 'product-type' ? 'text-black bg-[#68a691]/50' : 'text-[#694f5d]'
                    }`}
                  >
                    Product Type
                  </button>
                  <button
                    onClick={() => handleFilterChange('most-repurchased')}
                    className={`w-full text-left px-4 py-3 hover:bg-[#68a691] transition-colors ${
                      filterType === 'most-repurchased' ? 'text-black bg-[#68a691]/50' : 'text-[#694f5d]'
                    }`}
                  >
                    Most Repurchased
                  </button>
                </div>
              )}
            </div>
            
            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#efc7c2] to-[#694f5d] hover:shadow-[#694f5d]/30 rounded-lg transition-all shadow-lg"
            >
              <Plus className="text-white" size={20} />
              <span className="text-white font-semibold hidden sm:inline">Add Product</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <Image className="text-slate-700 mx-auto mb-4" size={64} />
              <p className="text-slate-500 text-lg">No products yet. Add your first product to get started!</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div> */}
      </div>

      {showAddModal && <NewProduct
        onClose={() => setShowAddModal(false)}
        newProduct={newProduct} 
        />}
    </div>
    );

}

export default ProductPage