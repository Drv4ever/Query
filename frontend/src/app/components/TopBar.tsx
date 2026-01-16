import { Plus, Search } from 'lucide-react';

interface TopBarProps {
  onAddQuestion: () => void;
}

import React from 'react';
export function TopBar({ onAddQuestion }: TopBarProps) {
  return (
    <div className="w-full flex justify-center border-b border-zinc-800 bg-[#232428] rounded">
      <div className="w-full max-w-5xl px-3 sm:px-6 rounded">
        <div className="h-14 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-white">
          QUERY
          {/* Search */}
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full sm:w-2/3 md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646669] w-4 h-4" />
              <input
                type="text"
                placeholder="search questions..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 text-[#d1d0c5] placeholder:text-[#646669] border border-[#44474e] focus:border-orange-400 focus:outline-none rounded-full transition-colors text-sm"
              />
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={onAddQuestion}
            className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-zinc-900 hover:bg-orange-400 rounded flex items-center justify-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>add</span>
          </button>

        </div>
      </div>
    </div>
  );
}
