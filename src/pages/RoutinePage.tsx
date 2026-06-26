import { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { Moon, Plus, Sun, Trash2, X } from "lucide-react";
import type { Product } from "../types/product";

type Routine = 'morning' | 'evening';

type RoutineItem = {
    docId: string;
    productId: string;
    name: string;
    brand: string;
    type: string;
};

function RoutinePage() {
    const [morningProducts, setMorningProducts] = useState<RoutineItem[]>([]);
    const [eveningProducts, setEveningProducts] = useState<RoutineItem[]>([]);
    const [productLibrary, setProductLibrary] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [activeRoutine, setActiveRoutine] = useState<Routine>('morning');

    useEffect(() => {
        loadRoutine();
    }, []);

    const loadRoutine = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const morningSnap = await getDocs(collection(db, 'routines', user.uid, 'morning'));
        setMorningProducts(morningSnap.docs.map(d => ({ docId: d.id, ...d.data() } as RoutineItem)));

        const eveningSnap = await getDocs(collection(db, 'routines', user.uid, 'evening'));
        setEveningProducts(eveningSnap.docs.map(d => ({ docId: d.id, ...d.data() } as RoutineItem)));
    };

    const loadProductLibrary = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const snap = await getDocs(query(
            collection(db, 'products', user.uid, 'myProducts'),
            where('userId', '==', user.uid)
        ));
        setProductLibrary(snap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
    };

    const openAddModal = async (routine: Routine) => {
        setActiveRoutine(routine);
        await loadProductLibrary();
        setShowModal(true);
    };

    const addToRoutine = async (product: Product) => {
        const user = auth.currentUser;
        if (!user) return;

        const docId = crypto.randomUUID();
        const item: RoutineItem = {
            docId,
            productId: product.id,
            name: product.name,
            brand: product.brand,
            type: product.type,
        };

        await setDoc(doc(db, 'routines', user.uid, activeRoutine, docId), item);

        if (activeRoutine === 'morning') {
            setMorningProducts(prev => [...prev, item]);
        } else {
            setEveningProducts(prev => [...prev, item]);
        }

        setShowModal(false);
    };

    const removeFromRoutine = async (routine: Routine, docId: string) => {
        const user = auth.currentUser;
        if (!user) return;

        await deleteDoc(doc(db, 'routines', user.uid, routine, docId));

        if (routine === 'morning') {
            setMorningProducts(prev => prev.filter(p => p.docId !== docId));
        } else {
            setEveningProducts(prev => prev.filter(p => p.docId !== docId));
        }
    };

    const alreadyInRoutine = (productId: string) => {
        const list = activeRoutine === 'morning' ? morningProducts : eveningProducts;
        return list.some(p => p.productId === productId);
    };

    return (
        <div>
            {/* Header */}
            <div className="text-center mb-12 flex items-center justify-center gap-3 mb-4">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#efc7c2] to-[#694f5d]">
                    Skincare Routines
                </h1>
            </div>

            {/* Routines Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Morning Routine */}
                <div className="rounded-2xl p-6 border border-[#efc7c2]/80">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Sun className="text-[#694f5d]" size={24} />
                            <h2 className="text-2xl font-bold text-[#694f5d]">Morning</h2>
                        </div>
                        <button
                            onClick={() => openAddModal('morning')}
                            className="p-2 bg-[#694f5d]/20 hover:bg-[#694f5d]/30 border border-[#694f5d]/50 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#694f5d]/30"
                        >
                            <Plus className="text-[#694f5d]" size={24} />
                        </button>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {morningProducts.length === 0 ? (
                            <p className="text-[#694f5d] text-center py-8">No products added yet</p>
                        ) : (
                            morningProducts.map(product => (
                                <RoutineCard
                                    key={product.docId}
                                    item={product}
                                    onRemove={() => removeFromRoutine('morning', product.docId)}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Evening Routine */}
                <div className="rounded-2xl p-6 border border-[#efc7c2]/80">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Moon className="text-[#694f5d]" size={24} />
                            <h2 className="text-2xl font-bold text-[#694f5d]">Evening</h2>
                        </div>
                        <button
                            onClick={() => openAddModal('evening')}
                            className="p-2 bg-[#694f5d]/20 hover:bg-[#694f5d]/30 border border-[#694f5d]/50 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                        >
                            <Plus className="text-[#694f5d]" size={24} />
                        </button>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {eveningProducts.length === 0 ? (
                            <p className="text-[#694f5d] text-center py-8">No products added yet</p>
                        ) : (
                            eveningProducts.map(product => (
                                <RoutineCard
                                    key={product.docId}
                                    item={product}
                                    onRemove={() => removeFromRoutine('evening', product.docId)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-[#ffe5d4]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#bfd3c1] rounded-2xl p-6 max-w-lg w-full border border-[#efc7c2]/30 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-[#694f5d] capitalize">
                                Add to {activeRoutine} Routine
                            </h3>
                            <button onClick={() => setShowModal(false)}>
                                <X className="text-[#694f5d]" size={24} />
                            </button>
                        </div>

                        {productLibrary.length === 0 ? (
                            <p className="text-[#694f5d] text-center py-8">
                                No products in your library yet. Add some from the Products page first.
                            </p>
                        ) : (
                            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                                {productLibrary.map(product => {
                                    const added = alreadyInRoutine(product.id);
                                    return (
                                        <button
                                            key={product.id}
                                            onClick={() => !added && addToRoutine(product)}
                                            disabled={added}
                                            className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                                added
                                                    ? 'bg-[#68a691]/20 border-[#68a691]/30 opacity-50 cursor-not-allowed'
                                                    : 'bg-[#efc7c2]/30 border-[#68a691]/20 hover:bg-[#efc7c2]/60 hover:border-[#68a691]/50'
                                            }`}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[#694f5d] font-medium truncate">{product.name}</p>
                                                {product.brand && (
                                                    <p className="text-[#68a691] text-sm truncate">{product.brand}</p>
                                                )}
                                            </div>
                                            <span className="text-xs px-2 py-1 bg-[#68a691]/10 border border-[#68a691]/30 rounded-full text-[#68a691] shrink-0">
                                                {product.type}
                                            </span>
                                            {added && (
                                                <span className="text-xs text-[#694f5d]/50 shrink-0">Added</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function RoutineCard({ item, onRemove }: { item: RoutineItem; onRemove: () => void }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-[#efc7c2]/30 rounded-xl border border-[#68a691]/20">
            <div className="flex-1 min-w-0">
                <p className="text-[#694f5d] font-medium truncate">{item.name}</p>
                {item.brand && (
                    <p className="text-[#68a691] text-sm truncate">{item.brand}</p>
                )}
            </div>
            <span className="text-xs px-2 py-1 bg-[#68a691]/10 border border-[#68a691]/30 rounded-full text-[#68a691] shrink-0">
                {item.type}
            </span>
            <button
                onClick={onRemove}
                className="p-1 hover:bg-red-500/20 rounded-lg transition-colors shrink-0"
            >
                <Trash2 className="text-red-400" size={16} />
            </button>
        </div>
    );
}

export default RoutinePage;
