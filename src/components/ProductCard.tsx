import { useState } from "react";
import type { Product } from "../types/product";
import { Trash2 } from "lucide-react";

interface ProductCardProps {
    product: Product;
    onDelete: (productId: string) => Promise<void>;
}

function ProductCard({ product, onDelete }: ProductCardProps) {
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

    const isExpanded = expandedProduct === product.id;

    const toggleExpand = (productId: string) => {
        setExpandedProduct(expandedProduct === productId ? null : productId);
    };

    return (
      <div
        className={`bg-gradient-to-br from-[#bfd3c1] to-[#efc7c2]/50 rounded-xl border border-[#68a691]/20 hover:border-[#68a691]/50 transition-all duration-300 overflow-hidden ${
          isExpanded ? 'col-span-full' : ''
        }`}
      >
        <div
          onClick={() => toggleExpand(product.id)}
          className="cursor-pointer"
        >
          {/* Summary View */}
          <div className={`p-4 ${isExpanded ? 'pb-0' : ''}`}>
            <div className={`flex gap-4 ${isExpanded ? 'items-start' : 'items-center'}`}>
              <div className={`${isExpanded ? 'w-48 h-48' : 'w-20 h-20'} flex-shrink-0 bg-[#efc7c2]/50 rounded-lg overflow-hidden border border-[#68a691]/30 transition-all duration-300`}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`text-[#694f5d] font-semibold ${isExpanded ? 'text-2xl mb-2' : 'text-lg mb-1'} transition-all`}>
                  {product.name}
                </h3>
                {product.brand && (
                  <p className={`text-[#68a691] ${isExpanded ? 'text-base mb-3' : 'text-sm'}`}>
                    {product.brand}
                  </p>
                )}

                {!isExpanded && (
                  <div className="inline-block px-3 py-1 bg-[#68a691]/10 border border-[#68a691]/30 rounded-full text-xs text-[#68a691] mt-2">
                    {product.type}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Expanded View */}
          {isExpanded && (
            <div className="p-4 pt-0 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[#694f5d]/60 text-sm mb-1">Type</p>
                  <div className="inline-block px-3 py-1 bg-[#68a691]/10 border border-[#68a691]/30 rounded-full text-[#68a691]">
                    {product.type}
                  </div>
                </div>

                {product.price && (
                  <div>
                    <p className="text-[#694f5d]/60 text-sm mb-1">Price</p>
                    <p className="text-[#694f5d] text-lg">${product.price}</p>
                  </div>
                )}

                <div>
                  <p className="text-[#694f5d]/60 text-sm mb-1">Purchase Count</p>
                  <p className="text-[#694f5d] text-lg">{product.count}</p>
                </div>

                {product.createdAt && (
                  <div>
                    <p className="text-[#694f5d]/60 text-sm mb-1">Date Added</p>
                    <p className="text-[#694f5d] text-lg">
                      {product.createdAt.toDate().toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {product.description && (
                <div>
                  <p className="text-[#694f5d]/60 text-sm mb-2">Description</p>
                  <p className="text-[#694f5d] bg-[#efc7c2]/30 rounded-lg p-4 border border-[#68a691]/30 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product.id);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 transition-all"
              >
                <Trash2 size={18} />
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>
    );
}

export default ProductCard;
