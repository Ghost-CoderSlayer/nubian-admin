/* Footer.tsx */
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-10 py-8 px-4 md:px-16">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h2>
          <div className="flex items-center gap-2">
            <Input type="email" placeholder="Your email" className="w-64" />
            <Button>Subscribe</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground">
          <div>
            <h3 className="font-medium mb-2">Company</h3>
            <ul className="space-y-1">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Support</h3>
            <ul className="space-y-1">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Shipping & Returns</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
