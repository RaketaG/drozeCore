import { MenuCategory } from "../entities/menu-categories.js";
import { deleteFromMenuCategories, insertIntoMenuCategories, selectFromMenuCategories, type MenuCategoryType } from "../repository/menus-repository.js";

export const addMenuCategory = async (
    { venueId, category }: MenuCategoryType
) => {
    const newMenuCategory = new MenuCategory({ venueId, category });
    try {
        await insertIntoMenuCategories(newMenuCategory);
        return {
            id: newMenuCategory.id,
            category: newMenuCategory.category
        };

    } catch (error) {
        throw error;
    }
};

export const deleteMenuCategory = async (
    id: string
) => {
    try {
        await deleteFromMenuCategories(id);
        return {
            id
        };

    } catch (error) {
        throw error;
    }
};

export const listMenuCategories = async (
    venueId: string
) => {
    try {
        const listObject = await selectFromMenuCategories(venueId);
        return listObject.rows;

    } catch (error) {
        throw error;
    }
};

export const changeMenuCategoryDetails = async (
    { id, venueId, category }:
        { id: string, venueId: string, category?: string }
) => {
    const prevDetails = await MenuCategory.menuCategoryDetails(id, venueId);
    const menuCategory = new MenuCategory(prevDetails);
    try {
        await menuCategory.changeDetails(venueId, category);
        return {
            id
        };
    } catch (error) {
        throw error;
    }
};