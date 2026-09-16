'use client';

import { useState } from 'react';
import { generateQuotePDF } from '@/lib/generateQuote';
import { Download, Calculator } from 'lucide-react';

export default function QuoteGeneratorBtn({ booking }: { booking: any }) {
  const [customPrice, setCustomPrice] = useState(booking.amount || 0);
  const [isEditing, setIsEditing] = useState(false);

  const handleDownload = () => {
    generateQuotePDF(booking, customPrice);
    setIsEditing(false);
  };

  return (
    <div className="mt-6 pt-6 border-t border-[#282624]">
      <h3 className="text-sm font-semibold text-[#a39e98] mb-3 flex items-center gap-2">
        <Calculator className="w-4 h-4" />
        Generate PDF Quote
      </h3>
      
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66625d]">₹</span>
            <input 
              type="number"
              value={customPrice}
              onChange={(e) => setCustomPrice(Number(e.target.value))}
              placeholder="Enter quote amount"
              className="w-full bg-[#0a0908] text-white pl-8 pr-4 py-2 rounded-lg border border-[#282624] focus:outline-none focus:border-[#f3c892]"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleDownload}
              disabled={!customPrice || customPrice <= 0}
              className="flex-1 bg-[#f3c892] text-[#0c0b0a] font-bold py-2 rounded-lg disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="px-4 bg-[#1a1918] text-white rounded-lg text-sm border border-[#282624]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsEditing(true)}
          className="w-full bg-[#1a1918] hover:bg-[#282624] text-white font-medium py-2.5 rounded-lg border border-[#282624] transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Download className="w-4 h-4" /> Generate Official Quote
        </button>
      )}
    </div>
  );
}
