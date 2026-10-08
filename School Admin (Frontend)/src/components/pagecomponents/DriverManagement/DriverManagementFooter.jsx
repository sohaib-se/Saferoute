import React from 'react';

const DriverManagementFooter = () => {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-gutter-lg py-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container-high/50">
      <div className="font-body-sm text-body-sm text-outline">
        © 2026 School Transport System. All rights reserved.
      </div>
      <div className="flex items-center gap-space-lg">
        <a className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors" href="#">
          Terms of Service
        </a>
        <a className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors" href="#">
          System Status
        </a>
        <div className="flex items-center gap-space-xs pl-space-sm">
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
          <span className="font-label-sm text-label-sm text-tertiary font-semibold">
            All Servers 100%
          </span>
        </div>
      </div>
    </footer>
  );
};

export default DriverManagementFooter;
