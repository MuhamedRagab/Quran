import React from "react";

interface Props {
  label?: string;
  drawerToggleRef?: React.RefObject<HTMLInputElement>;
  children?: React.ReactNode;
}

export default function Drawer({ label, drawerToggleRef, children }: Props) {
  return (
    <div className="drawer z-40">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerToggleRef}
      />
      <div className="drawer-content">
        {/* Page content here */}
        {label && (
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            {label}
          </label>
        )}
      </div>
      <div className="drawer-side" dir="ltr">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {children && (
          <ul
            tabIndex={0}
            className="p-4 w-80 min-h-full bg-base-200 text-base-content z-20"
          >
            {/* Sidebar content here */}
            {children}
          </ul>
        )}
      </div>
    </div>
  );
}
