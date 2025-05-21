import React from 'react';
import { FilterState } from '../functions/types';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const colors = ['pink', 'red', 'blue', 'green', 'orange'];
const sizes = ['S', 'M', 'L', 'XL'];
const dressStyles = ['Casual', 'Formal', 'Party'];
const vendors = ['Alpha Wear', 'Beta Brand', 'Denim Co'];

type Props = {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

export const FilterSidebar: React.FC<Props> = ({ filters, setFilters}) => {
    const handleCheckboxChange = (category: keyof FilterState, value: string) => {
        setFilters((prev) => {
            const values = prev[category] as string[];
            const updated = values.includes(value)
                ? values.filter((v) => v !== value)
                : [...values, value];
            return {...prev, [category]: updated };
        });
    };

    const handlePriceChange = (value: number[]) => {
        setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }));
    };

    return (
        <div className='space-y-6'>
            <div>
                <h2 className='font-semibold mb-2'>Price</h2>
                <Slider defaultValue={filters.priceRange} 
                min={20} max={300} step={10} 
                onValueChange={handlePriceChange} 
                />
                <div className="text-sm mt-1">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </div>
            </div>

            <div>
                <h2 className='font-semibold mb-2'>Color</h2>
                {colors.map((color) => (
                    <div key={color} className='flex items-center gap-2'>
                        <Checkbox checked={filters.colors.includes(color)}
                        onCheckedChange={() => handleCheckboxChange('colors', color)} id={color}
                        />
                        <label htmlFor={color}>{color}</label>
                    </div>
                ))}
            </div>

            <div>
                <h2 className='font-semibold mb-2'>Size</h2>
                {sizes.map((size) => (
                    <div key={size} className='flex items-center gap-2'>
                        <Checkbox checked={filters.sizes.includes(size)}
                        onCheckedChange={() => handleCheckboxChange('sizes', size)} id={size}
                        />
                        <label htmlFor={size}>{size}</label>
                    </div>
                ))}
            </div>

            <div>
                <h2 className='font-semibold mb-2'>Dress Style</h2>
                {dressStyles.map((style) => (
                    <div key={style} className='flex items-center gap-2'>
                        <Checkbox checked={filters.dressStyles.includes(style)}
                        onCheckedChange={() => handleCheckboxChange('dressStyles', style)} id={style}
                        />
                        <label htmlFor={style}>{style}</label>
                    </div>
                ))}
            </div>

            <div>
                <h2 className='font-semibold mb-2'>Vendor</h2>
                {vendors.map((vendor) => (
                    <div key={vendor} className='flex items-center gap-2'>
                        <Checkbox checked={filters.vendors.includes(vendor)}
                        onCheckedChange={() => handleCheckboxChange('vendors', vendor)} id={vendor}
                        />
                        <label htmlFor={vendor}>{vendor}</label>
                    </div>
                ))}
            </div>

        </div>
    )
}