import type { RefObject, SubmitEvent } from "react";
import { getPurchaseLabel } from "../data/purchaseLabels";
import type { Purchase } from "../data/samplePurchases";
import { formatPurchaseDate } from "../utils/formatPurchaseDate";

type PurchaseReceiptProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  selectedPurchase: Purchase | undefined;
  edit: boolean;
  onEdit: () => void;
  onSave: (event: SubmitEvent<HTMLFormElement>) => void;
  onRequestClose: () => void;
  onClose: () => void;
  onDelete: () => void;
  fullDate: boolean;
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
  fullDate,
}: PurchaseReceiptProps) {
  return (
    <dialog id="purchase-details-dialog" ref={dialogRef} onClose={onClose}>
      <div className="purchase-dialog-header">
        <h2>Purchase Details</h2>
        <button
          type="button"
          onClick={onRequestClose}
          className="purchase-dialog-close"
          aria-label="Close dialog"
        >
          ✖
        </button>
      </div>
      <hr className="purchase-dialog-divider" />
      <form
        method="post"
        onSubmit={onSave}
        className={
          edit
            ? "purchase-dialog-form purchase-dialog-form--edit"
            : "purchase-dialog-form"
        }
      >
        {selectedPurchase &&
          (edit ? (
            <label>
              Amount of Purchase: $
              <input
                type="number"
                name="purchase-amount"
                defaultValue={selectedPurchase.amount}
                required
                min="0.01"
                step="0.01"
              />
            </label>
          ) : (
            <p className="receipt-amount">
              <span className="receipt-amount-label">Purchase Amount:</span>
              <span className="receipt-amount-value">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(selectedPurchase.amount)}
              </span>
            </p>
          ))}
        {selectedPurchase &&
          (edit ? (
            <label>
              Purchase Date:
              <input
                type="date"
                name="date"
                defaultValue={selectedPurchase.date}
                required
              />
            </label>
          ) : (
            <p className="receipt-detail-row">
              <span className="receipt-detail-label">Date:</span>
              <span className="receipt-detail-value">
                {formatPurchaseDate(selectedPurchase.date, fullDate)}
              </span>
            </p>
          ))}
        {selectedPurchase &&
          (edit ? (
            <label className="purchase-field-full">
              Category:
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
            </label>
          ) : (
            <p className="receipt-detail-row">
              <span className="receipt-detail-label">Category:</span>
              <span className="receipt-detail-value">
                {getPurchaseLabel(selectedPurchase.category, "")}
              </span>
            </p>
          ))}
        {selectedPurchase &&
          (edit ? (
            <label className="purchase-field-full">
              Notes:
              <textarea
                name="notes"
                defaultValue={selectedPurchase.notes}
                rows={3}
              />
            </label>
          ) : (
            <p className="receipt-detail-row">
              <span className="receipt-detail-label">Notes:</span>
              <span className="receipt-detail-value">
                {selectedPurchase.notes}
              </span>
            </p>
          ))}
        <div className="purchase-dialog-actions">
          {edit ? (
            <button
              type="submit"
              id="save-edits"
              className="receipt-primary-btns"
            >
              SAVE
            </button>
          ) : (
            <button
              onClick={(event) => {
                event.preventDefault();
                onEdit();
              }}
              type="button"
              className="receipt-primary-btns"
            >
              EDIT
            </button>
          )}
          <button
            type="button"
            onClick={onDelete}
            className="receipt-secondary-btns"
          >
            DELETE
          </button>
        </div>
      </form>
    </dialog>
  );
}
