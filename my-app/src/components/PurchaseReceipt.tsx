import type { RefObject, SubmitEvent } from "react";
import type { Purchase } from "../data/samplePurchases";

type PurchaseReceiptProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  selectedPurchase: Purchase | undefined;
  edit: boolean;
  onEdit: () => void;
  onSave: (event: SubmitEvent<HTMLFormElement>) => void;
  onRequestClose: () => void;
  onClose: () => void;
  onDelete: () => void;
};

export function PurchaseReceipt({
  dialogRef,
  selectedPurchase,
  edit,
  onEdit,
  onSave,
  onRequestClose,
  onClose,
  onDelete,
}: PurchaseReceiptProps) {
  return (
    <dialog id="purchase-details-dialog" ref={dialogRef} onClose={onClose}>
      <h2>Purchase Details</h2>
      <button type="button" onClick={onRequestClose}>
        ✖
      </button>
      <hr />
      <form method="post" onSubmit={onSave}>
        {selectedPurchase &&
          (edit ? (
            <input
              type="number"
              name="purchase-amount"
              defaultValue={selectedPurchase.amount}
              required
              min="0.01"
              step="0.01"
            />
          ) : (
            <p>Purchase Amount: {selectedPurchase.amount}</p>
          ))}
        {selectedPurchase &&
          (edit ? (
            <input
              type="date"
              name="date"
              defaultValue={selectedPurchase.date}
              required
            />
          ) : (
            <p>Date: {selectedPurchase.date}</p>
          ))}
        {selectedPurchase &&
          (edit ? (
            <select
              name="categories"
              id="category-select-edit"
              defaultValue={selectedPurchase.category}
              required
            >
              <option value="">Please select a category.</option>
              <option value="education-work" id="education-work">
                Education & Work
              </option>
              <option value="debt-taxes-fees" id="debt-taxes-fees">
                Debt, Taxes, & Fees
              </option>
              <option value="family-pets" id="family-pets">
                Family & Pets
              </option>
              <option value="food-and-drink" id="food-and-drink">
                Food & Drink
              </option>
              <option value="gifts" id="gifts">
                Gifts, Celebrations, & Giving
              </option>
              <option value="health-wellness" id="health-wellness">
                Health & Wellness
              </option>
              <option value="housing-utilities" id="housing-utilities">
                Housing & Utilities
              </option>
              <option value="household-shopping" id="household-shopping">
                Household, Personal Care & Shopping
              </option>
              <option value="transportation" id="transportation">
                Transportation
              </option>
              <option value="travel" id="travel">
                Travel
              </option>
              <option value="entertainment-subs" id="entertainment-subs">
                Entertainment & Subscriptions
              </option>
              <option value="other" id="other">
                Other
              </option>
            </select>
          ) : (
            <p>Category: {selectedPurchase.category}</p>
          ))}
        {selectedPurchase &&
          (edit ? (
            <input
              type="text"
              name="notes"
              defaultValue={selectedPurchase.notes}
            />
          ) : (
            <p>Notes: {selectedPurchase.notes}</p>
          ))}
        {edit ? (
          <button type="submit" id="save-edits">
            SAVE
          </button>
        ) : (
          <button
            onClick={(event) => {
              event.preventDefault();
              onEdit();
            }}
            type="button"
          >
            EDIT
          </button>
        )}
        <button type="button" onClick={onDelete}>
          DELETE
        </button>
      </form>
    </dialog>
  );
}
