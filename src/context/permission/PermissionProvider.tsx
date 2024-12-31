import { ReactNode, useState } from "react";
import { PermissionContext, PermissionRoleType } from "./PermissionContext";

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<PermissionRoleType | null>(null);

  return (
    <PermissionContext.Provider value={{ role, setRole }}>
      {children}
    </PermissionContext.Provider>
  );
};
