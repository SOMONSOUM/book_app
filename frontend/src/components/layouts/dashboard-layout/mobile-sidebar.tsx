'use client';
import { Button } from '@/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { SidebarNav } from './sidebar';
import { useDir } from '@/hooks/use-dir';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const MobileSidebar = () => {
  const dir = useDir();
  const isRTL = dir === 'rtl';
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button className='size-9 px-1 py-1' variant='ghost' aria-label='toggle sidebar'>
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent dir={dir} side={isRTL ? 'right' : 'left'} className='bg-card p-0'>
        <SidebarNav
          ignoreCollapse
          heading={
            <SheetHeader>
              <div className='flex items-center gap-2 overflow-hidden border-b px-6 py-5'>
                <svg
                  className='w-auto shrink-0'
                  aria-label='logo'
                  height='22'
                  role='img'
                  viewBox='0 0 74 64'>
                  <path
                    d='M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z'
                    className='fill-foreground'
                  />
                </svg>
                <span className='whitespace-nowrap text-sm'>Bookstore</span>
              </div>
            </SheetHeader>
          }
        />
      </SheetContent>
    </Sheet>
  );
};
