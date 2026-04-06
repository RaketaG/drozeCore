import type { Request, Response } from 'express';
import { addMenuCategory, changeMenuCategoryDetails, deleteMenuCategory, listMenuCategories } from "../services/menu-category-services.js";
import type { MenuCategoryType } from "../repository/menu-categories-repository.js";

export const addMenuCategoryController = async (
    req: Request<{}, {}, MenuCategoryType>, res: Response
) => {
    try {
        const responseObject = await addMenuCategory(req.body);
        res.json(responseObject);

    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};

export const changeMenuCategoryDetailsController = async (
    req: Request, res: Response
) => {
    try {
        const responseObject = await changeMenuCategoryDetails(req.body);
        res.json(responseObject);

    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};

export const deleteMenuCategoryController = async (
    req: Request, res: Response
) => {
    const { id } = req.params as { id: string };
    try {
        const responseObject = await deleteMenuCategory(id);
        res.json(responseObject);

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const listMenuCategoryController = async (
    req: Request, res: Response
) => {
    const { venueId } = req.query;
    try {
        const menuCategories = await listMenuCategories(venueId as string);
        res.json(menuCategories);

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};