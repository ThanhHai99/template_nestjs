export enum EnumRole {
  root = 0,
  super_admin = 1,
  warehouse_manager = 2,
  business_manager = 3,
}

export const RolesAsObject = Object.fromEntries(Object.entries(EnumRole).filter((e): boolean => isNaN(Number(e[0]))))

export const RoleIds: Array<number> = Object.values(RolesAsObject).map((e: any): number => parseInt(e))
export const RoleNames: Array<string> = Object.keys(RolesAsObject)
