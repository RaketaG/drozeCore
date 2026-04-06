import { MenuItem } from "../entities/menu-item.js";
import { deleteFromMenuItems, insertIntoMenuItems, selectCategoryFromMenuItems, selectFromMenuItems, type MenuItemType } from "../repository/menue-items-repository.js";

export const addMenuItem = async (
    menueItemBody: MenuItemType
): Promise<{ id: string, itemName: string }> => {
    const newMenuItem = new MenuItem(menueItemBody);
    try {
        await insertIntoMenuItems(newMenuItem);
        return {
            id: newMenuItem.id,
            itemName: newMenuItem.itemName
        };

    } catch (error) {
        throw error;
    }
};

export const deleteMenuItem = async (
    id: string
): Promise<{ id: string }> => {
    try {
        await deleteFromMenuItems(id);
        return {
            id
        };

    } catch (error) {
        throw error;
    }
};

export const listMenuItems = async (
    venueId: string
): Promise<{
    id: string,
    categoryId: string,
    venueId: string,
    itemName: string,
    description: string,
    itemPrice: number,
    isAvailable: boolean,
}[]> => {
    try {
        const listObject = await selectFromMenuItems(venueId);
        return listObject.rows;

    } catch (error) {
        throw error;
    }
};

export const listCategoryMenuItems = async (
    categoryId: string
): Promise<{
    id: string,
    categoryId: string,
    venueId: string,
    itemName: string,
    description: string,
    itemPrice: number,
    isAvailable: boolean,
}[]> => {
    try {
        const listObject = await selectCategoryFromMenuItems(categoryId);
        return listObject.rows;

    } catch (error) {
        throw error;
    }
};

export const changeMenuItemDetails = async (
    id: string, categoryId?: string, itemName?: string,
    description?: string, itemPrice?: number, isAvailable?: boolean
) => {
    const prevDetails = await MenuItem.menuItemDetails(id);
    const menuItem = new MenuItem(prevDetails);
    try {
        await menuItem.changeDetails(
            categoryId, itemName, description, itemPrice, isAvailable
        );
        return {
            id
        };
    } catch (error) {
        throw error;
    }
};