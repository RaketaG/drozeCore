import { v4 as uuidv4 } from 'uuid';
import { selectSpecificFromMenuItems, updateIntoMenuItems, type MenuItemType } from "../repository/menue-items-repository.js";

export class MenuItem {
    id: string;
    categoryId: string;
    venueId: string;
    itemName: string;
    description: string;
    itemPrice: number;
    isAvailable: boolean;

    constructor({ id, categoryId, venueId, itemName,
        description, itemPrice, isAvailable }: MenuItemType) {
        this.id = id ?? uuidv4();
        this.categoryId = categoryId;
        this.venueId = venueId;
        this.itemName = itemName;
        this.description = description ?? "";
        this.itemPrice = itemPrice;
        this.isAvailable = isAvailable;
    }

    static async menuItemDetails(id: string) {
        try {
            const detailsObject = await selectSpecificFromMenuItems(id);
            return detailsObject.rows[0];

        } catch (error) {
            throw error;
        }
    }

    async changeDetails(
        categoryId?: string,
        itemName?: string,
        description?: string,
        itemPrice?: number,
        isAvailable?: boolean
    ) {

        try {
            await updateIntoMenuItems({
                id: this.id,
                venueId: this.venueId,
                categoryId: categoryId ?? this.categoryId,
                itemName: itemName ?? this.itemName,
                description: description ?? this.description,
                itemPrice: itemPrice ?? this.itemPrice,
                isAvailable: isAvailable ?? this.isAvailable
            });
            return {
                id: this.id
            };

        } catch (error) {
            throw error
        }
    }
}