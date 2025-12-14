import { X } from "lucide-react";
import { useState } from "react";

interface NewProductProps {
    newProduct: {
        name: string;
        brand: string;
        type: string;
        description: string;
        price: string;
        count: number;
        imageUrl: string;
      };
    onClose: () => void;
  }

function NewProduct({ onClose, newProduct }: NewProductProps) {
    const [imagePreview, setImagePreview] = useState(null);

    return (
        <div className="fixed inset-0 bg-[#ffe5d4]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#bfd3c1] rounded-2xl p-8 max-w-2xl w-full border border-[#efc7c2]/30 shadow-2xl shadow-[#efc7c2]/20 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#694f5d]">Add New Product</h3>
              <button
                onClick={() => {
                  onClose();
                //   setNewProduct({
                //     name: '',
                //     brand: '',
                //     type: 'cleanser',
                //     description: '',
                //     price: '',
                //     purchaseCount: 0,
                //     imageUrl: ''
                //   });
                  setImagePreview(null);
                }}
                className="p-1 hover:bg-[#68a691] rounded transition-colors"
              >
                <X className="text-[#694f5d]" size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-[#694f5d] mb-2 text-sm">Product Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 bg-[#efc7c2]/50 rounded-lg border border-[#68a691]/30 overflow-hidden flex items-center justify-center">
                    {/* {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Image className="text-slate-600" size={32} />
                    )} */}
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-cyan-500/30 rounded-lg cursor-pointer transition-colors">
                    {/* <Upload size={18} className="text-cyan-400" />
                    <span className="text-white">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      //onChange={handleImageUpload}
                      className="hidden"
                    /> */}
                  </label>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#694f5d] mb-2 text-sm">Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    //onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-[#efc7c2]/50 border border-[#68a691]/30 rounded-lg px-4 py-3 text-[#694f5d] focus:outline-none focus:border-[#694f5d] transition-colors"
                    placeholder="e.g., 24h Hydrating Lotion"
                  />
                </div>
                
                <div>
                  <label className="block text-[#694f5d] mb-2 text-sm">Brand</label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    //onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    className="w-full bg-[#efc7c2]/50 border border-[#68a691]/30 rounded-lg px-4 py-3 text-[#694f5d] focus:outline-none focus:border-[#694f5d] transition-colors"
                    placeholder="e.g., CeraVe"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#694f5d] mb-2 text-sm">Type</label>
                  <select
                    value={newProduct.type}
                    //onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
                    className="w-full bg-[#efc7c2]/50 border border-[#68a691]/30 rounded-lg px-4 py-3 text-[#694f5d] focus:outline-none focus:border-[#694f5d] transition-colors"
                  >
                    <option value="cleanser">Cleanser</option>
                    <option value="toner">Toner</option>
                    <option value="serum">Serum</option>
                    <option value="moisturizer">Moisturizer</option>
                    <option value="sunscreen">Sunscreen</option>
                    <option value="treatment">Treatment</option>
                    <option value="exfoliant">Exfoliant</option>
                    <option value="mask">Mask</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[#694f5d] mb-2 text-sm">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    //onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full bg-[#efc7c2]/50 border border-[#68a691]/30 rounded-lg px-4 py-3 text-[#694f5d] focus:outline-none focus:border-[#694f5d] transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[#694f5d] text-sm">Description</label>
                  {/* <button
                    onClick={generateAIDescription}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-purple-300 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles size={14} className={isGenerating ? 'animate-spin' : ''} />
                    {isGenerating ? 'Generating...' : 'Fill in with AI'}
                  </button> */}
                </div>
                <textarea
                  value={newProduct.description}
                  //onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full bg-[#efc7c2]/50 border border-[#68a691]/30 rounded-lg px-4 py-3 text-[#694f5d] focus:outline-none focus:border-[#694f5d] transition-colors"
                  //rows="4"
                  placeholder="Product description and benefits..."
                />
              </div>
              
              <div>
                <label className="block text-[#694f5d] mb-2 text-sm">Purchase Count</label>
                <input
                  type="number"
                  value={newProduct.count}
                  //onChange={(e) => setNewProduct({...newProduct, purchaseCount: parseInt(e.target.value) || 0})}
                  className="w-full bg-[#efc7c2]/50 border border-[#68a691]/30 rounded-lg px-4 py-3 text-[#694f5d] focus:outline-none focus:border-[#694f5d] transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                // onClick={() => {
                //   setShowAddModal(false);
                //   setNewProduct({
                //     name: '',
                //     brand: '',
                //     type: 'cleanser',
                //     description: '',
                //     price: '',
                //     purchaseCount: 0,
                //     imageUrl: ''
                //   });
                //   setImagePreview(null);
                // }}
                className="flex-1 px-4 py-3 bg-[#68a691]/80 hover:bg-[#68a691] text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                //onClick={handleAddProduct}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#efc7c2] to-[#694f5d] hover:from-[#694f5d] text-white rounded-lg transition-all shadow-lg shadow-[#efc7c2]/30"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
    );
}

export default NewProduct;