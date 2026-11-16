import { type SubmitEvent, useState, useRef, useId } from "react";
import { samplePurchases } from "../data/samplePurchases";
import { NewPurchaseDialog } from "./NewPurchaseDialog";
import { PurchaseReceipt } from "./PurchaseReceipt";

let nextId = 2;

export function PurchaseHistory() {
  const [selectedValue, setSelectedValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedSubValue, setSelectedSubValue] = useState("");
  const [purchaseHistory, setPurchaseHistory] = useState(samplePurchases);
  const inputRef = useRef<HTMLDialogElement>(null);
  const receiptDialogRef = useRef<HTMLDialogElement>(null);
  const addExpenseTextAreaId = useId();
  const selectedPurchase = purchaseHistory.find(
    (purchase) => purchase.id === selectedId,
  );
  const listItems = purchaseHistory.map((purchase) => (
    <li key={purchase.id}>
      <button
        onClick={() => {
          setSelectedId(purchase.id);
          handleViewDetails();
        }}
      >
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(purchase.amount)}{" "}
        {purchase.date} {purchase.category}
      </button>
    </li>
  ));

  return (
    <>
      <NewPurchaseDialog
        dialogRef={inputRef}
        selectedValue={selectedValue}
        selectedSubValue={selectedSubValue}
        addExpenseTextAreaId={addExpenseTextAreaId}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={setSelectedSubValue}
        onSubmit={handleSubmit}
        onRequestClose={handleClose}
      />
      <button onClick={handleClick}>ADD EXPENSE</button>
      <ul>{listItems}</ul>
      <PurchaseReceipt
        dialogRef={receiptDialogRef}
        selectedPurchase={selectedPurchase}
        edit={edit}
        onEdit={() => setEdit(true)}
        onSave={handleSaveEdits}
        onRequestClose={handleCloseReceipt}
        onClose={() => setEdit(false)}
        onDelete={handleDeletePurchase}
      />
    </>
  );

  function handleCategoryChange(category: string) {
    setSelectedValue(category);
    setSelectedSubValue("");
  }

  function handleClose() {
    if (inputRef.current !== null) {
      inputRef.current.close();
    }
  }

  function handleClick() {
    if (inputRef.current !== null) {
      inputRef.current.showModal();
    }
  }

  function handleViewDetails() {
    if (receiptDialogRef.current !== null) {
      receiptDialogRef.current.showModal();
    }
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (
      typeof formJson.categories !== "string" ||
      typeof formJson.date !== "string" ||
      typeof formJson.expenseNotes !== "string"
    ) {
      return;
    }

    const newPurchase = {
      id: nextId++,
      category: formJson.categories,
      amount: Number(formJson.amount),
      subcategory: selectedSubValue,
      date: formJson.date,
      notes: formJson.expenseNotes,
    };
    setPurchaseHistory([...purchaseHistory, newPurchase]);
    console.log(newPurchase);
    handleClose();
  }

  function handleSaveEdits(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const submittedCategory = formJson.categories
    const submittedDate = formJson.date
    const submittedNotes = formJson.notes

    if (
      typeof submittedCategory !== "string" ||
      typeof submittedDate !== "string" ||
      typeof formJson["purchase-amount"] !== "string" ||
      typeof submittedNotes !== "string"
    ) {
      return;
    }

    const updatedPurchase = purchaseHistory.map((purchase) => {
      if (purchase.id === selectedId) {
        const categoryChanged = purchase.category !== submittedCategory
        const nextSubcategory = categoryChanged ? "" : purchase.subcategory
        return { ...purchase, amount: Number(formJson["purchase-amount"]), date: submittedDate, category: submittedCategory, subcategory: nextSubcategory, notes: submittedNotes };
      }

      return purchase;
    });

    setPurchaseHistory(updatedPurchase);
    setEdit(false);
  }

  function handleCloseReceipt() {
    if (receiptDialogRef.current !== null) {
      receiptDialogRef.current.close();
    }
  }

  function handleDeletePurchase() {
    const confirmed = window.confirm("Delete this transaction?")

    if (!confirmed) {
      return
    }

    const remainingPurchases = purchaseHistory.filter(purchase => purchase.id !== selectedId)
    setPurchaseHistory(remainingPurchases)
    handleCloseReceipt()
    setSelectedId(null)
  }
}
