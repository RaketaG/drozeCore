import type { Request, Response } from 'express';
import type { MenuItemType } from "../repository/menue-items-repository.js";
import { addMenuItem, changeMenuItemDetails, deleteMenuItem, listCategoryMenuItems, listMenuItems } from "../services/menu-item-services.js";

export const addMenuItemController = async (
    req: Request<{}, {}, MenuItemType>, res: Response
) => {
    try {
        const responseObject = await addMenuItem(req.body);
        res.json(responseObject);

    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};

export const changeMenuItemDetailsController = async (
    req: Request, res: Response
) => {
    const { id, categoryId, itemName, description, itemPrice, isAvailable } = req.body
    try {
        const responseObject = await changeMenuItemDetails(
            id, categoryId, itemName, description, itemPrice, isAvailable
        );
        res.json(responseObject);

    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};

export const deleteMenuItemController = async (
    req: Request, res: Response
) => {
    const { id } = req.params as { id: string };
    try {
        const responseObject = await deleteMenuItem(id);
        res.json(responseObject);

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const listMenuItemController = async (
    req: Request, res: Response
) => {
    const { venueId } = req.query;
    try {
        const menuItems = await listMenuItems(venueId as string);
        res.json(menuItems);

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const listCategoryMenuItemController = async (
    req: Request, res: Response
) => {
    const { categoryId } = req.query;
    try {
        const menuItems = await listCategoryMenuItems(categoryId as string);
        res.json(menuItems);

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};