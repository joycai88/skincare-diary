import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

function RoutinePage() {
    const [routineNum, setRoutineNum] = useState(1);

    return (
        <div>
            {/*Header*/}
            <div className="flex items-center justify-between mb-8">
                <h1 className="test-4xl font-bold text-[#694F5D]"
                    style={{fontFamily: "Limelight"}}>
                    Routine #{routineNum}
                </h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setRoutineNum(Math.max(1, routineNum - 1))}
                        className="text-[#7FA99B] hover:text-[#6A8A7E] transition-colors">
                        <ChevronLeft className="w-10 h-10" />
                    </button>

                    <button
                        onClick={() => setRoutineNum(routineNum + 1)}
                        className="text-[#7FA99B] hover:text-[#6A8A7E] transition-colors">
                        <ChevronRight className="w-10 h-10" />
                    </button>
                </div>
            </div>

            {/*Products*/}
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-px bg-[#694F5D]"></div>

                <div
                    className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-hide"
                    style={{
                        msOverflowStyle: "none"
                    }}
                    onMouseDown={(e) => {
                        const ele = e.currentTarget;
                        const startX = e.pageX - ele.offsetLeft;
                        const scrollLeft = ele.scrollLeft;

                        const onMouseMove = (e: { pageX: number; }) => {
                            const x = e.pageX - ele.offsetLeft;
                            const walk = (x - startX) * 2;
                            ele.scrollLeft = scrollLeft - walk;
                        };

                        const onMouseUp = () => {
                            document.removeEventListener("mousemove", onMouseMove);
                            document.removeEventListener("mouseup", onMouseUp);
                        };

                        document.addEventListener("mousemove", onMouseMove);
                        document.addEventListener("mouseup", onMouseUp);
                    }}>
                    <div 
                        className="flex gap-16 pb-4"
                        style={{width: "max-content"}}>
                            {[1,2,3,4,5,6,7,8,9,10].map((item) => (
                                <div key={item} className="flex flex-col items-center pt-8">
                                    <div className="w-px h-16 bg-[#694F5D] mb-2"></div>
                                    <div className="absolute top-0 w-3 h-3 bg-[#FFE5D4] border-2 border-[#694F5D] rounded-full"></div>
                                    <div className="w-44 h-[480px] bg-[#A8C9C0] rounded-lg shadow-lg"></div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoutinePage;