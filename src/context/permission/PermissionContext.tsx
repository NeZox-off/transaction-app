import { createContext } from "react";

export type PermissionRoleType = "casher" | "admin";

export type PermissionContextType = {
  role: PermissionRoleType | null;
  setRole: (role: PermissionRoleType) => void;
};

export const PermissionContext = createContext<
  PermissionContextType | undefined
>(undefined);
