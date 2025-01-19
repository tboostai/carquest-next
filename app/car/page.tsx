"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type SortOption = 'price' | 'distance' | 'year';
type SortDirection = 'asc' | 'desc';

type Car = {
  id: number;
  name: string;
  estimated: string;
  price: number;
  miles: string;
  cash: string;
  milesAway: string;
  src: string;
  isFavorite?: boolean;
};

type FilterCategory = {
  id: string;
  title: string;
  options: {
    id: string;
    text: string;
    count?: number;
  }[];
  isExpanded?: boolean;
};

type FilterTag = {
  id: string;
  text: string;
  count?: number;
  removable?: boolean;
};

export default function CarPage() {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<number, number>>({});
  const [tabs, setTabs] = useState<{ id: number; text: string }[]>([]);
  const [cars, setCars] = useState<Car[]>([
    {
      id: 0,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 45K miles",
      price: 19800,
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "10 miles away",
      src: "carmain0.png"
    },
    {
      id: 1,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 45K miles",
      price: 19800,
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "11 miles away",
      src: "carmain1.png"
    },
    {
      id: 2,
      name: "2021 Toyota Camry Hybrid",
      estimated: "SE 90K miles",
      price: 16808,
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "19 miles away",
      src: "carmain2.png"
    },
    {
      id: 3,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 40K miles",
      price: 19500,
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "21 miles away",
      src: "carmain3.png"
    },
    {
      id: 4,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 40K miles",
      price: 19500,
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "21 miles away",
      src: "carmain4.png"
    }
  ]);

  const [sortOption, setSortOption] = useState<SortOption>('price');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [savedSearch, setSavedSearch] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>([
    { id: 'used', text: 'Used', removable: true },
    { id: 'sedan', text: 'Sedan', removable: true },
    { id: 'awd', text: 'AWD/4WD', count: 10341, removable: true },
    { id: 'rwd', text: 'Rear Wheel Drive', count: 1840, removable: true },
    { id: 'fwd', text: 'Front Wheel Drive', count: 768, removable: true }
  ]);

  const filterCategories: FilterCategory[] = [
    {
      id: 'price',
      title: 'Price & Payments',
      options: [
        { id: 'p1', text: '$0 - $10,000', count: 156 },
        { id: 'p2', text: '$10,000 - $20,000', count: 284 },
        { id: 'p3', text: '$20,000 - $30,000', count: 342 },
        { id: 'p4', text: '$30,000 - $50,000', count: 198 },
        { id: 'p5', text: '$50,000+', count: 89 }
      ]
    },
    {
      id: 'mileage',
      title: 'Mileage',
      options: [
        { id: 'm1', text: 'Under 15,000', count: 124 },
        { id: 'm2', text: '15,000 - 30,000', count: 256 },
        { id: 'm3', text: '30,000 - 45,000', count: 312 },
        { id: 'm4', text: '45,000+', count: 178 }
      ]
    },
    {
      id: 'brand',
      title: 'Make & Model',
      options: [
        { id: 'b1', text: 'Toyota', count: 245 },
        { id: 'b2', text: 'Honda', count: 189 },
        { id: 'b3', text: 'BMW', count: 156 },
        { id: 'b4', text: 'Mercedes-Benz', count: 134 }
      ]
    },
    {
      id: 'features',
      title: 'Features',
      options: [
        { id: 'f1', text: 'Sunroof', count: 234 },
        { id: 'f2', text: 'Navigation', count: 312 },
        { id: 'f3', text: '4WD/AWD', count: 189 },
        { id: 'f4', text: 'Leather Seats', count: 267 }
      ]
    }
  ];

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['price']));
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  function changeFilter() {
    setIsFilter(!isFilter);
  }

  function end() {
    const newTabs: { id: number; text: string }[] = [];
    for (const [typeIdStr, itemId] of Object.entries(selectedItems)) {
      const typeId = parseInt(typeIdStr, 10);
      const selectedTab = filterCategories[typeId].options.find(l => l.id === itemId);
      if (selectedTab && !newTabs.find(t => t.text === selectedTab.text)) {
        newTabs.push({ id: newTabs.length, text: selectedTab.text });
      }
    }
    setTabs(newTabs);
    setIsFilter(false);
  }

  function sele(typeId: number, itemId: number) {
    setSelectedItems(prev => ({ ...prev, [typeId]: itemId }));
  }

  function removeTab(index: number) {
    const newTabs = [...tabs];
    newTabs.splice(index, 1);
    setTabs(newTabs);
  }

  function jump(id: number) {
    router.push(`/details/${id}`);
  }

  const handleSort = (option: SortOption) => {
    if (option === sortOption) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(option);
      setSortDirection('asc');
    }
    
    const sortedCars = [...cars].sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      switch (option) {
        case 'price':
          return (a.price - b.price) * multiplier;
        case 'distance':
          return (parseInt(a.milesAway) - parseInt(b.milesAway)) * multiplier;
        case 'year':
          return (parseInt(a.name.split(' ')[0]) - parseInt(b.name.split(' ')[0])) * multiplier;
        default:
          return 0;
      }
    });
    
    setCars(sortedCars);
    setIsSortMenuOpen(false);
  };

  const handleFavoriteClick = (e: React.MouseEvent, carId: number) => {
    e.stopPropagation();
    setCars(prevCars => 
      prevCars.map(car => 
        car.id === carId 
          ? { ...car, isFavorite: !car.isFavorite }
          : car
      )
    );
  };

  const FilterPanel = () => {
    const toggleCategory = (categoryId: string) => {
      setExpandedCategories(prev => {
        const next = new Set(prev);
        if (next.has(categoryId)) {
          next.delete(categoryId);
        } else {
          next.add(categoryId);
        }
        return next;
      });
    };

    const toggleFilter = (filterId: string) => {
      setSelectedFilters(prev => {
        const next = new Set(prev);
        if (next.has(filterId)) {
          next.delete(filterId);
        } else {
          next.add(filterId);
        }
        return next;
      });
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          {selectedFilters.size > 0 && (
            <button 
              onClick={() => setSelectedFilters(new Set())}
              className="text-sm text-[#2d5181] hover:text-[#1f3557] mt-2"
            >
              Clear all filters
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filterCategories.map(category => (
            <div key={category.id} className="border-b border-gray-200 pb-4 last:border-0">
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center justify-between w-full py-2 text-left"
              >
                <span className="font-medium text-gray-900">{category.title}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    expandedCategories.has(category.id) ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedCategories.has(category.id) && (
                <div className="mt-2 space-y-2">
                  {category.options.map(option => (
                    <label
                      key={option.id}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.has(option.id)}
                        onChange={() => toggleFilter(option.id)}
                        className="w-4 h-4 text-[#2d5181] border-gray-300 rounded focus:ring-[#2d5181]"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {option.text}
                        {option.count !== undefined && (
                          <span className="text-gray-400 ml-1">({option.count})</span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const removeFilter = (filterId: string) => {
    setActiveFilters(prev => prev.filter(filter => filter.id !== filterId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      <main className="max-w-[1400px] mx-auto px-2 sm:px-4 pt-2 sm:pt-4 pb-8">
        {/* Breadcrumb - Hide on mobile */}
        <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <span>Used Cars for Sale</span>
          <span>›</span>
          <span>Sedan</span>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Used Sedans for Sale
        </h1>

        {/* Mobile Filters Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="w-full bg-white rounded-lg shadow-sm p-3 text-left flex justify-between items-center"
          >
            <span className="text-gray-700">Filters</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterPanel />
          </div>

          {/* Mobile Filters Modal */}
          {isMobileFiltersOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsMobileFiltersOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 max-w-full flex z-50">
                <div className="relative w-full max-w-xs">
                  <div className="h-full bg-white shadow-xl flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h2 className="text-lg font-semibold">Filters</h2>
                      <button 
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <FilterPanel />
                    </div>
                    <div className="border-t p-4">
                      <button
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="w-full bg-[#2d5181] text-white py-2 px-4 rounded-lg"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {/* Search and Save Bar */}
            <div className="bg-white rounded-lg shadow-sm p-3 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-grow w-full sm:max-w-md">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-3 pr-9 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5181]/20 focus:border-[#2d5181]"
                  />
                  <button className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Save Search Button */}
                <button 
                  onClick={() => setSavedSearch(!savedSearch)}
                  className="flex items-center space-x-1.5 text-sm text-gray-700 hover:text-[#2d5181] transition-colors"
                >
                  <svg 
                    className={`w-4 h-4 ${savedSearch ? 'text-[#D85040] fill-current' : 'fill-none'}`}
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Save Search</span>
                </button>
              </div>
            </div>

            {/* Results Count and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">
                {cars.length.toLocaleString()} Results
              </h2>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <button className="text-sm text-[#2d5181] hover:text-[#1f3557]">
                  My Wallet
                </button>
                <div className="relative flex-grow sm:flex-grow-0">
                  <select 
                    className="w-full sm:w-auto appearance-none text-sm bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#2d5181]/20 focus:border-[#2d5181]"
                    value={sortOption}
                    onChange={(e) => handleSort(e.target.value as SortOption)}
                  >
                    <option value="relevance">Sort By: Relevance</option>
                    <option value="price">Price</option>
                    <option value="distance">Distance</option>
                    <option value="year">Year</option>
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cars.map(car => (
                <motion.div
                  key={car.id}
                  onClick={() => jump(car.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={`/images/${car.src}`}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => handleFavoriteClick(e, car.id)}
                      className="absolute bottom-4 right-4 z-10 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07)]"
                      aria-label={car.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <svg 
                        className={`w-6 h-6 transition-colors ${
                          car.isFavorite 
                            ? 'text-[#D85040] fill-current'
                            : 'text-gray-400 fill-none hover:text-[#D85040] hover:fill-[#D85040]/30'
                        }`}
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900">{car.name}</h3>
                    <p className="text-gray-600">{car.estimated}</p>
                    <div className="mt-2 flex items-baseline space-x-2">
                      <span className="text-2xl font-bold">${car.price.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm">{car.miles}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{car.cash}</p>
                    <p className="text-gray-500 text-sm mt-1">{car.milesAway}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
