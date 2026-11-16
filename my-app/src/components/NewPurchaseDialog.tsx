import type { RefObject, SubmitEvent } from "react";

type NewPurchaseDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  selectedValue: string;
  selectedSubValue: string;
  addExpenseTextAreaId: string;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  onRequestClose: () => void;
};

export function NewPurchaseDialog({
  dialogRef,
  selectedValue,
  selectedSubValue,
  addExpenseTextAreaId,
  onCategoryChange,
  onSubcategoryChange,
  onSubmit,
  onRequestClose,
}: NewPurchaseDialogProps) {
  return (
    <dialog id="new-expense-dialog" ref={dialogRef}>
      <div className="purchase-dialog-header">
        <h2>Log a New Expense</h2>
        <button
          type="button"
          id="close-btn"
          className="purchase-dialog-close"
          aria-label="Close dialog"
          onClick={onRequestClose}
        >
          ✖
        </button>
      </div>

      <form method="post" onSubmit={onSubmit} className="purchase-dialog-form">
        <div className="purchase-field-pair">
          <label>
            Amount of Purchase: $
            <input
              type="number"
              name="amount"
              step="0.01"
              min="0.01"
              required
            />
          </label>

          <label>
            Purchase Date:
            <input type="date" name="date" required />
          </label>
        </div>
        <label>
          Category:
          <select
            name="categories"
            id="category-select"
            value={selectedValue}
            onChange={(event) => onCategoryChange(event.target.value)}
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

        {selectedValue === "food-and-drink" && (
          <label id="food-and-drink-sub">
            Subcategory:
            <select
              name="food-and-drink-sub"
              id="food-and-drink-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="groceries">Groceries</option>
              <option value="dining-out">Dining Out</option>
              <option value="takeout-delivery">Takeout & Delivery</option>
              <option value="coffee-tea">Coffee & Tea</option>
              <option value="snacks-convenience">
                Snacks & Convenience Stores
              </option>
              <option value="alcohol">Alcohol</option>
              <option value="meal-kits">Meal Kits</option>
              <option value="work-school-meal">Work & School Meals</option>
            </select>
          </label>
        )}

        {selectedValue === "housing-utilities" && (
          <label id="housing-utilities-sub">
            Subcategory:
            <select
              name="housing-utilities-sub"
              id="housing-utilities-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="rent">Rent</option>
              <option value="mortgage">Mortgage</option>
              <option value="property-taxes">Property Taxes</option>
              <option value="hoa-condo">HOA or Condo Fees</option>
              <option value="electricity">Electricity</option>
              <option value="water-sewer">Water & Sewer</option>
              <option value="gas-heating">Gas & Heating</option>
              <option value="trash-recycling">Trash & Recycling</option>
              <option value="internet">Internet</option>
              <option value="mobile">Mobile Phone</option>
              <option value="home-renter-insurance">
                Home & Renters Insurance
              </option>
              <option value="home-maintenance">
                Home Maintenance & Repairs
              </option>
              <option value="furniture-applicances">
                Furniture & Appliances
              </option>
              <option value="household-supplies">Household Supplies</option>
              <option value="cleaning">Cleaning Services</option>
              <option value="lawn-garden">Lawn & Garden</option>
              <option value="moving-storage">Moving & Storage</option>
            </select>
          </label>
        )}

        {selectedValue === "transportation" && (
          <label id="transportation-sub">
            Subcategory:
            <select
              name="transportation-sub"
              id="transportation-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="gas-ev">Gas & EV Charging</option>
              <option value="car-payment">Car Payment</option>
              <option value="auto-insurance">Auto Insurance</option>
              <option value="vehicle-maintenance">
                Vehicle Maintenance & Repairs
              </option>
              <option value="registration">Registration & Inspection</option>
              <option value="parking-tolls">Parking & Tolls</option>
              <option value="public-transit">Public Transportation</option>
              <option value="rideshare-taxi">Rideshare & Taxis</option>
              <option value="car-rental">Car Rental</option>
              <option value="bicycle-scooter">Bicycle & Scooter Costs</option>
            </select>
          </label>
        )}

        {selectedValue === "health-wellness" && (
          <label id="health-wellness-sub">
            Subcategory:
            <select
              name="health-wellness-sub"
              id="health-wellness-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="insurance">Insurance</option>
              <option value="visits-procedures">
                Medical Visits & Procedures
              </option>
              <option value="prescriptions">Prescriptions</option>
              <option value="otc-meds">Over-the-Counter Medication</option>
              <option value="dental">Dental Care</option>
              <option value="vision">Vision Care</option>
              <option value="mental-health">
                Therapy, Psychiatry, & Mental Health
              </option>
              <option value="pt">Physical Therapy</option>
              <option value="med-supplies">Medical Supplies & Equipment</option>
              <option value="vitamins">Vitamins & Supplements</option>
              <option value="gym">Gym & Fitness</option>
              <option value="sports-rec">Sports & Recreation</option>
            </select>
          </label>
        )}

        {selectedValue === "household-shopping" && (
          <label id="household-shopping-sub">
            Subcategory:
            <select
              name="household-shopping-sub"
              id="household-shopping-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="toiletries">Toiletries</option>
              <option value="skincare-makeup">Skincare & Makeup</option>
              <option value="hair">Haircuts & Hair Care</option>
              <option value="nails-spa">Nails & Spa</option>
              <option value="clothing-shoes">Clothing & Shoes</option>
              <option value="accessories">Accessories & Jewelry</option>
              <option value="laundry-dry-cleaning">
                Laundry & Dry Cleaning
              </option>
              <option value="electronics">Electronics</option>
              <option value="home-decor">Home Decor</option>
              <option value="vitamins">Vitamins & Supplements</option>
              <option value="gym">Gym & Fitness</option>
              <option value="sports-rec">Sports & Recreation</option>
            </select>
          </label>
        )}

        {selectedValue === "family-pets" && (
          <label id="family-pets-sub">
            Subcategory:
            <select
              name="family-pets-sub"
              id="family-pets-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="childcare">Childcare & Babysitting</option>
              <option value="baby-supplies">Baby Supplies</option>
              <option value="school-supplies">School Supplies & Fees</option>
              <option value="activities-camp">Kids' Activities & Camps</option>
              <option value="child-support">Child Support</option>
              <option value="family-support">Family Support</option>
              <option value="elder-care">Elder Care</option>
              <option value="pet-food">Pet Food & Supplies</option>
              <option value="vet-care">Vet Care & Pet Medication</option>
              <option value="pet-insurance">Pet Insurance</option>
              <option value="grooming">Pet Grooming</option>
              <option value="boarding">Pet Boarding & Sitting</option>
            </select>
          </label>
        )}

        {selectedValue === "entertainment-subs" && (
          <label id="entertainment-subs-sub">
            Subcategory:
            <select
              name="entertainment-subs-sub"
              id="entertainment-subs-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="streaming">Streaming Service</option>
              <option value="music">Music Service</option>
              <option value="video-games">
                Video Games & In-Game Purchases
              </option>
              <option value="books">Books & Audiobooks</option>
              <option value="movie-concert-event">
                Movies, Concerts, & Events
              </option>
              <option value="hobbies">Hobbies & Crafting Supplies</option>
              <option value="software-apps">Software & Applications</option>
              <option value="memberships">Memberships</option>
              <option value="news">News & Publications</option>
              <option value="nicotine">Nicotine, Tobacco</option>
              <option value="cannabis">Cannabis</option>
            </select>
          </label>
        )}

        {selectedValue === "travel" && (
          <label id="travel-sub">
            Subcategory:
            <select
              name="travel-sub"
              id="travel-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="flights">Flights</option>
              <option value="lodging">Hotels & Lodging</option>
              <option value="travel-transportation">
                Travel Transporation
              </option>
              <option value="travel-meals">Travel Meals</option>
              <option value="tours-activities">Tours & Activities</option>
              <option value="travel-insurance">Travel Insurance</option>
              <option value="passport-visa">Passport & Visa Fees</option>
              <option value="memberships">Memberships</option>
              <option value="baggage-travel">Baggage & Travel Fees</option>
            </select>
          </label>
        )}

        {selectedValue === "gifts" && (
          <label id="gifts-sub">
            Subcategory:
            <select
              name="gifts-sub"
              id="gifts-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="gift">Gift</option>
              <option value="holiday">Holidays</option>
              <option value="birthdays-celebrations">
                Birthdays & Celebrations
              </option>
              <option value="weddings-special">
                Weddings & Special Events
              </option>
              <option value="charity">Charitable Donations</option>
              <option value="mutual-aid">Mutual Aid</option>
              <option value="religious-giving">Religious Giving</option>
              <option value="political">Political Contributions</option>
            </select>
          </label>
        )}

        {selectedValue === "education-work" && (
          <label id="education-work-sub">
            Subcategory:
            <select
              name="education-work-sub"
              id="education-work-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="tuition">Tuition</option>
              <option value="course-certs">Courses & Certifications</option>
              <option value="books-study">Textbooks & Study Materials</option>
              <option value="dues-licenses">
                Professional Dues & Licenses
              </option>
              <option value="conferences-networking">
                Conferences & Networking
              </option>
              <option value="office-supplies">
                Office Supplies & Equipment
              </option>
              <option value="work-uniform">Work Clothing & Uniforms</option>
              <option value="business-expenses">Business Expenses</option>
            </select>
          </label>
        )}

        {selectedValue === "debt-taxes-fees" && (
          <label id="debt-taxes-fees-sub">
            Subcategory:
            <select
              name="debt-taxes-fees-sub"
              id="debt-taxes-fees-select"
              value={selectedSubValue}
              onChange={(e) => onSubcategoryChange(e.target.value)}
            >
              <option value="">No subcategory currently selected.</option>
              <option value="credit-card">Credit Card Payment</option>
              <option value="student-loan">Student Loan Payment</option>
              <option value="personal-loan">Personal Loan Payment</option>
              <option value="med-debt">Medical Debt Payment</option>
              <option value="buy-now">Buy Now, Pay Later Payment</option>
              <option value="interest-charges">Interest Charges</option>
              <option value="bank-atm">Bank & ATM Fees</option>
              <option value="late-fees">Late Fees</option>
              <option value="income-taxes">Income Taxes</option>
              <option value="tax-prep">Tax Preparation</option>
              <option value="legal-professional">
                Legal & Professional Fees
              </option>
            </select>
          </label>
        )}

        <label>
          Notes:
          <textarea
            id={addExpenseTextAreaId}
            name="expenseNotes"
            rows={4}
            cols={40}
          />
        </label>

        <div className="purchase-dialog-actions">
          <button
            type="submit"
            id="expense-submit"
            className="receipt-primary-btns"
          >
            SAVE EXPENSE
          </button>
        </div>
      </form>
    </dialog>
  );
}
