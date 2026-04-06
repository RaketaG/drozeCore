import { v4 as uuidv4 } from 'uuid';
import { selectSpecificFromMenuCategories, updateIntoMenuCategories } from "../repository/menus-repository.js";

export type MenuCategoryType = {
    id?: string;
    venueId: string;
    category: string;
};

export class MenuCategory {
    id: string;
    venueId: string;
    category: string;

    constructor({ id, venueId, category }: MenuCategoryType) {
        this.id = id ?? uuidv4();
        this.venueId = venueId;
        this.category = category;
    }

    static async menuCategoryDetails(id: string, venueId: string) {
        try {
            const detailsObject = await selectSpecificFromMenuCategories(id, venueId);
            return detailsObject.rows[0];

        } catch (error) {
            throw error;
        }
    }

    async changeDetails(
        venueId?: string, category?: string
    ) {
        try {
            await updateIntoMenuCategories({
                id: this.id,
                venueId: venueId ?? this.venueId,
                category: category ?? this.category
            });
            return {
                id: this.id
            };

        } catch (error) {
            throw error
        }
    }
}