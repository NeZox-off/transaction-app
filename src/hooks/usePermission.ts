import { useContext } from "react";
import { PermissionContext } from "../context/permission/PermissionContext";

export const usePermission = () => {
  const context = useContext(PermissionContext);

  if (!context) {
    throw new Error("PermissionContent error");
  }

  return context;
};
