# 🛍️ SafeShop AI

### A Trusted AI Shopping Agent for Safer Agentic Commerce

**Razorpay AI Buildathon 2026 — Track 1: AI Growth & Agentic Commerce**

> ⚠️ **TEST / SIMULATION ONLY — No real money, real bank accounts, or real financial transactions are used.**

---

# 📌 Table of Contents

* [About SafeShop AI](#-about-safeshop-ai)
* [The Problem](#-the-problem)
* [Our Solution](#-our-solution)
* [Why SafeShop AI](#-why-safeshop-ai)
* [How It Works](#-how-it-works)
* [Main Features](#-main-features)
* [AI Shopping Agent](#-ai-shopping-agent)
* [AI-Readable Merchant Catalog](#-ai-readable-merchant-catalog)
* [Product Recommendation](#-product-recommendation)
* [Personalization](#-personalization)
* [Cross-Selling](#-cross-selling)
* [Safe AI Wallet](#-safe-ai-wallet)
* [Wallet Safety](#-wallet-safety)
* [User Approval](#-user-approval)
* [Payment Flow](#-payment-flow)
* [Razorpay Test Mode](#-razorpay-test-mode)
* [Price and Stock Validation](#-price-and-stock-validation)
* [Failure Handling](#-failure-handling)
* [Audit Trail](#-audit-trail)
* [Merchant Dashboard](#-merchant-dashboard)
* [Architecture](#-architecture)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Example User Journey](#-example-user-journey)
* [Security Principles](#-security-principles)
* [Setup](#-setup)
* [Environment Variables](#-environment-variables)
* [Running the Project](#-running-the-project)
* [Database](#-database)
* [Testing](#-testing)
* [Buildathon Demonstration](#-buildathon-demonstration)
* [Current MVP](#-current-mvp)
* [Limitations](#-limitations)
* [Future Improvements](#-future-improvements)
* [Conclusion](#-conclusion)
* [Disclaimer](#-disclaimer)

---

# 🛍️ About SafeShop AI

**SafeShop AI** is an AI-powered shopping agent designed to make online shopping easier, smarter, and safer.

Today, users often need to open multiple shopping websites, search for products, compare prices and specifications, read reviews, and decide which product is best.

SafeShop AI simplifies this process.

Instead of searching manually, the user can simply tell the AI what they want.

For example:

> "I need wireless headphones for college under ₹3000 with good battery life."

SafeShop AI understands the request and searches products from different merchant catalogs.

The AI then:

1. Understands the user's requirement.
2. Searches AI-readable merchant catalogs.
3. Finds matching products.
4. Compares available products.
5. Recommends a suitable product.
6. Explains why it recommends the product.
7. Suggests relevant additional products.
8. Shows the complete purchase amount.
9. Checks the TEST AI Wallet.
10. Requests user approval.
11. Validates the transaction.
12. Uses Razorpay Test Mode for the demo payment flow.
13. Updates the simulated wallet.
14. Records the complete activity in an Audit Trail.

The goal is not simply to create another shopping chatbot.

The goal is to demonstrate how an **AI buyer can participate in commerce while operating inside clear safety boundaries.**

---

# 🎯 The Problem

Online shopping has become convenient, but it can still be difficult for many users.

## 1. Too many choices

Users may have to compare hundreds of products across different platforms.

This can be confusing, especially for first-time online shoppers.

## 2. Difficult product comparison

Different websites may provide product information in different formats.

Users have to manually compare:

* Price
* Rating
* Specifications
* Availability
* Features
* Accessories
* Other requirements

## 3. Finding the right product

The cheapest product is not always the best product.

The best product depends on what the user actually needs.

For example:

A college student may care more about:

* Battery life
* Comfort
* Price
* Durability

than about advanced features they will never use.

## 4. Trust in AI purchasing

AI agents can potentially perform actions on behalf of users.

However, giving an AI direct access to a user's primary financial account creates an important trust problem.

Users may ask:

> "What happens if the AI makes a mistake?"

> "What if it purchases something expensive?"

> "Can the AI spend more than I expected?"

SafeShop AI focuses on this problem.

---

# 💡 Our Solution

SafeShop AI combines:

### 🤖 AI Shopping

The AI understands natural-language shopping requirements and finds suitable products.

### 🏪 AI-Readable Commerce

Merchants provide product information in a standardized format that AI agents can easily understand.

### 💳 Isolated AI Wallet

The project demonstrates a separate spending environment for the AI using **TEST/SIMULATION funds**.

### 🔐 Controlled Transactions

The AI does not directly control the money.

A deterministic Wallet Engine checks the transaction.

### 👆 User Approval

The user must approve the purchase before it can proceed.

### 📋 Audit Trail

Important actions are recorded so that the shopping and payment process can be reviewed.

---

# 🌟 Why SafeShop AI?

SafeShop AI focuses on three connected areas:

```text
             CONSUMER TRUST
                    ↓
             Safe AI Wallet
                    ↓
              AI COMMERCE
                    ↓
           AI Shopping Agent
                    ↓
            MERCHANT GROWTH
                    ↓
     AI Catalog + Recommendation
             + Cross-Sell
```

This creates value for both sides of commerce.

### For consumers

SafeShop AI provides:

* Easier product discovery
* Personalized recommendations
* Transparent pricing
* User-controlled purchases
* Spending boundaries
* Clear transaction information
* Audit history

### For merchants

SafeShop AI provides:

* AI-readable product catalogs
* AI product discovery
* AI recommendations
* Relevant cross-selling
* Demonstration of AI-driven orders
* Merchant growth metrics

---

# 🔄 How It Works

The complete SafeShop AI flow is:

```text
User describes what they need
             ↓
AI understands the request
             ↓
Search merchant catalogs
             ↓
Compare matching products
             ↓
Recommend a product
             ↓
Explain the recommendation
             ↓
Find related products
             ↓
Show cross-sell suggestion
             ↓
User accepts or rejects
             ↓
Create purchase request
             ↓
Check TEST AI Wallet
             ↓
Revalidate product, price and stock
             ↓
Ask user for purchase approval
             ↓
Razorpay Test Mode
             ↓
Payment result
             ↓
Update simulated wallet
             ↓
Create order
             ↓
Record Audit Trail
```

---

# ✨ Main Features

SafeShop AI currently includes:

* 🤖 AI shopping assistant
* 🔎 AI-powered product discovery
* 🏪 Multiple demo merchants
* 📦 AI-readable product catalogs
* 🎯 Personalized recommendations
* 🛒 Contextual cross-selling
* 💳 TEST/SIMULATION AI Wallet
* 🔐 Deterministic transaction validation
* 👆 User approval
* 💰 Razorpay Test Mode
* 🔄 Product and price revalidation
* 📦 Stock validation
* ❌ Insufficient balance handling
* 📋 Audit Trail
* 🏪 Merchant Dashboard
* 📊 Demo/Test merchant metrics
* 🗄️ PostgreSQL database
* 🚀 Production deployment

---

# 🤖 AI Shopping Agent

The main interface of SafeShop AI is the AI shopping agent.

Users do not need to understand product specifications or complicated filters.

They can simply describe what they want.

### Example

User:

> "I need headphones for college under ₹3000 with good battery life."

The AI identifies important requirements:

```json
{
  "category": "headphones",
  "max_price": 3000,
  "use_case": "college",
  "preferences": [
    "good battery life"
  ]
}
```

The AI then searches the available product catalog.

---

# 🔎 Product Discovery

SafeShop AI searches standardized merchant catalogs instead of allowing the AI to invent product information.

The application provides catalog tools such as:

```text
search_catalog()
get_product()
get_related_products()
```

These tools retrieve information from the database.

The AI uses this information to reason about the products.

---

# 🏪 AI-Readable Merchant Catalog

Traditional shopping websites may structure product information differently.

SafeShop AI uses a standardized product format.

A product can contain:

```text
Product ID
Merchant ID
Merchant Name
Product Name
Category
Description
Price
Currency
Rating
Review Count
Stock Status
Available Quantity
Specifications
Tags
Related Products
Image
Delivery Information
```

Example:

```json
{
  "product_id": "HP101",
  "merchant_id": "M001",
  "merchant_name": "AudioHub",
  "name": "SoundMax Pro",
  "category": "headphones",
  "price": 2499,
  "currency": "INR",
  "rating": 4.5,
  "stock_status": "available",
  "specifications": {
    "battery_hours": 40,
    "connectivity": "Bluetooth"
  },
  "related_products": [
    "CASE101"
  ]
}
```

The AI can therefore understand products from different merchants using the same structure.

---

# 🔐 Catalog as the Source of Truth

One important rule in SafeShop AI is:

> **The AI must not invent product facts.**

The database is the source of truth for:

* Product names
* Product IDs
* Prices
* Stock
* Merchant information
* Specifications
* Related products

The AI can explain and recommend products, but it cannot create product information.

This reduces the risk of AI hallucinations during shopping.

---

# 🎯 Product Recommendation

After searching the catalog, SafeShop AI selects suitable products.

The recommendation considers the user's current request.

For example:

```text
Budget: ₹3000
Category: Headphones
Use case: College
Preference: Good battery life
```

The AI can then compare available products based on:

* Price
* Availability
* Specifications
* Rating
* User requirements
* Relevant preferences

Instead of showing a huge list, the system presents a small number of useful recommendations.

---

# 💬 Why I Recommend This

SafeShop AI does not simply say:

> "Buy this product."

It explains why the product is suitable.

For example:

```text
Why I recommend this:

✓ Within your requested budget
✓ Good battery life
✓ Available in the merchant catalog
✓ Suitable for your stated use
✓ Highly rated
```

The explanation is based on available product data.

The system avoids unsupported claims.

---

# 👤 Personalization

Different users have different shopping preferences.

SafeShop AI can use a simple simulated user profile.

Example:

```json
{
  "preferred_brands": [],
  "typical_budget": 3000,
  "previous_categories": [
    "headphones"
  ],
  "preferences": [
    "good battery life"
  ]
}
```

The system can also use simulated purchase history.

This allows recommendations to become more relevant to the user.

---

# 🧠 Current Request vs Saved Preferences

A saved preference should not override what the user says now.

For example:

If the user's typical budget is ₹3000 but they say:

> "Show me laptops around ₹45000."

the current request should be treated as the main requirement.

The saved budget is only a soft preference when the user does not provide a current budget.

This prevents personalization from becoming a restriction.

---

# 🛒 Cross-Selling

SafeShop AI also demonstrates merchant growth through contextual cross-selling.

After a user selects a product, the application checks its related products.

Example:

```text
Main Product

SoundMax Pro
₹2499
```

Related product:

```text
AudioGuard Case
₹399
```

The AI can say:

> "This merchant also has a compatible protective case for ₹399. Would you like to add it?"

The user can choose:

```text
[Add to Order]

[No Thanks]
```

The additional product is never added automatically.

---

# 📈 Why Cross-Selling Matters

Cross-selling can help merchants increase the value of an order.

For example:

```text
Main product:      ₹2499
Cross-sell:         ₹399
-------------------------
Total:             ₹2898
```

SafeShop AI tracks this as a demo merchant-growth metric.

It can show:

* Cross-sell offers
* Accepted cross-sells
* Rejected cross-sells
* Additional order value
* Average order value

All metrics are clearly labeled as **Demo/Test Metrics**.

---

# 💳 Safe AI Wallet

One of the main ideas behind SafeShop AI is the **SafeShop AI Wallet**.

The wallet is designed as an isolated spending environment for the AI.

However, in this MVP, it is only a:

> **TEST/SIMULATION WALLET**

It does not contain real money.

---

# 🛡️ Why an Isolated Wallet?

A major concern with AI-powered purchasing is:

> "Should an AI have direct access to my main bank account?"

SafeShop AI demonstrates an alternative concept.

Instead of giving the AI direct access to the user's primary bank account, the AI operates within a separate spending environment with limited funds.

This creates a clearer boundary between:

```text
Personal Bank Account
        ❌
        AI
```

and:

```text
TEST AI WALLET
        ↓
   AI Purchase Request
        ↓
   Wallet Validation
        ↓
   User Approval
```

The AI does not directly control the user's main bank account.

---

# ⚠️ Important Wallet Disclaimer

The wallet in this project is not a real financial wallet.

It does not:

* Hold real money
* Connect to a bank account
* Create a real UPI account
* Transfer real money
* Provide financial services

All wallet balances are simulated.

Example:

```text
TEST WALLET

Balance
₹5000
```

---

# 💰 Wallet Example

Suppose the wallet contains:

```text
₹5000
```

The user purchases:

```text
SoundMax Pro       ₹2499
AudioGuard Case     ₹399
-------------------------
Total              ₹2898
```

The simulated wallet becomes:

```text
Before:   ₹5000
Purchase: ₹2898
After:    ₹2102
```

This is only a simulation.

---

# 🔐 Wallet Safety

The AI does not directly modify the wallet.

Instead, the application contains a deterministic Wallet Engine.

The AI can request:

```text
Purchase product HP101
Quantity: 1
```

But the Wallet Engine makes the final decision.

---

# ⚙️ Wallet Engine

The Wallet Engine checks:

### 1. Product

Does the product actually exist?

### 2. Price

Is the current database price valid?

### 3. Stock

Is the product available?

### 4. Quantity

Is the requested quantity valid?

### 5. Balance

Does the wallet contain enough test funds?

### 6. Approval

Has the user approved the purchase?

### 7. Transaction

Does the transaction satisfy the application rules?

Only after these checks pass can the purchase continue.

---

# 👆 User Approval

The user always gets a clear confirmation before a purchase.

Example:

```text
--------------------------------
        PURCHASE REVIEW
--------------------------------

PRODUCT
SoundMax Pro

PRICE
₹2499

CROSS-SELL
AudioGuard Case
₹399

TOTAL
₹2898

AI WALLET
₹5000

REMAINING
₹2102

--------------------------------

You are approving a TEST
transaction of ₹2898 from
your SafeShop AI Wallet.

[ Approve Purchase ]

[ Cancel ]
--------------------------------
```

The purchase cannot proceed until the user approves it.

---

# 💰 Transaction Boundaries

The AI is allowed to:

* Understand the request
* Find products
* Compare products
* Recommend products
* Suggest cross-sells
* Request a transaction

The AI is not allowed to:

* Change wallet balance
* Change product price
* Declare payment success
* Increase transaction amount
* Bypass wallet checks
* Bypass user approval
* Invent product information

This separation is one of the most important safety principles in the project.

---

# 💳 Razorpay Test Mode

SafeShop AI integrates with Razorpay using **Test Mode** for the payment demonstration.

No real payment is made.

The payment layer is kept separate from the main shopping logic.

Example abstraction:

```text
createPaymentOrder()
verifyPayment()
getPaymentStatus()
```

This makes the payment layer easier to maintain and replace later.

---

# 🔑 Payment Security

Razorpay secret credentials are kept on the backend.

They are stored using environment variables.

They are never placed directly inside frontend code.

The frontend receives only information that is safe to expose.

---

# 🔄 Purchase Validation

Product information can change.

For example, a product may cost:

```text
₹2499
```

when the AI first recommends it.

Later, the price may change.

Therefore, SafeShop AI revalidates important information before completing the purchase.

The application checks:

* Product ID
* Merchant
* Current price
* Stock
* Quantity
* Final amount

The system does not blindly trust the information previously shown by the AI.

---

# 🔄 Price Change Protection

If the price changes before purchase, the application should stop the transaction.

The user can then review the updated price.

This prevents the AI from purchasing an item based on outdated information.

---

# ❌ Insufficient Balance

SafeShop AI also demonstrates graceful failure.

Example:

```text
AI Wallet Balance
₹2102
```

User requests:

```text
ProBook 15 Laptop
₹45000
```

The Wallet Engine checks the balance.

```text
Required: ₹45000
Available: ₹2102
```

The transaction is blocked.

The application shows:

> **Purchase blocked.**

> The product costs ₹45000, but your AI Wallet contains only ₹2102.

The user can then choose:

```text
[ Find Cheaper Products ]

[ Add Test Funds ]

[ Cancel ]
```

The application does not crash.

The failed attempt can also be recorded in the Audit Trail.

---

# 📋 Audit Trail

Every important action should be traceable.

SafeShop AI provides an Audit Trail.

Example:

```text
10:42:11
USER_REQUEST

"I need headphones under ₹3000."

10:42:13
CATALOG_SEARCH

3 merchants searched.

10:42:15
RECOMMENDATION

SoundMax Pro — ₹2499.

10:42:19
CROSS_SELL

AudioGuard Case — ₹399 offered.

10:42:23
USER_APPROVAL

Cross-sell accepted.

10:42:25
PURCHASE_REQUEST

Total ₹2898.

10:42:26
WALLET_CHECK

Balance ₹5000 — approved.

10:42:27
PAYMENT

Razorpay TEST transaction initiated.

10:42:28
PAYMENT_RESULT

SUCCESS.

10:42:29
WALLET_UPDATE

₹5000 → ₹2102.
```

---

# 🧾 Audit Event Information

An audit event can contain:

```text
Timestamp
Event Type
Actor
User ID
Product ID
Amount
Reference ID
Result
Explanation
```

This makes it easier to understand what happened during a transaction.

---

# 🏪 Merchant Dashboard

SafeShop AI also contains a merchant-facing dashboard.

The dashboard demonstrates how merchants can benefit from AI commerce.

It can show:

* AI-readable catalog status
* Products available to AI
* AI product views
* AI recommendations
* AI-generated orders
* Cross-sell offers
* Cross-sell acceptance
* Average order value
* Simulated GMV

These are clearly marked:

> **Demo/Test Metrics**

They are not real revenue claims.

---

# 📊 Merchant Growth

The merchant side of SafeShop AI focuses on three main opportunities.

### 1. AI Discoverability

Merchants make their products available in a standardized AI-readable format.

### 2. AI Recommendations

The AI can recommend merchant products to users whose requirements match them.

### 3. Cross-Selling

The system can suggest related products when they are relevant.

This connects AI shopping with merchant growth.

---

# 🧑‍💻 Main Application Screens

SafeShop AI contains several screens.

## 1. Home / AI Shopping

The user interacts with the AI shopping agent.

## 2. Product Recommendations

Shows products selected by the AI.

## 3. Product Details

Shows product information from the database.

## 4. AI Wallet

Shows the TEST/SIMULATION wallet balance and transactions.

## 5. Order Confirmation

Shows the completed test purchase.

## 6. Transaction History

Shows wallet transaction information.

## 7. Audit Trail

Shows important AI and transaction events.

## 8. Merchant Dashboard

Shows merchant-side demo metrics.

## 9. AI-Readable Catalog

Shows how merchant product data is structured for AI discovery.

---

# 🏗️ Architecture

The application follows a layered architecture.

```text
┌──────────────────────────────┐
│          USER                │
│ Natural Language Request     │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│        FRONTEND              │
│     React + TypeScript       │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│        BACKEND / API         │
│        Next.js Routes        │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│      AI SHOPPING AGENT       │
│          LLM + Tools         │
└──────────────┬───────────────┘
               ↓
       ┌───────┴────────┐
       ↓                ↓
┌─────────────┐  ┌──────────────┐
│   Product   │  │ User Profile │
│   Catalog   │  │  & History   │
└──────┬──────┘  └──────────────┘
       ↓
┌──────────────────────────────┐
│       WALLET ENGINE          │
│ Deterministic Validation     │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│      RAZORPAY TEST MODE      │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       ORDER RESULT           │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│        AUDIT TRAIL            │
└──────────────────────────────┘
```

---

# 🧠 Separation of Responsibilities

SafeShop AI separates AI reasoning from application authority.

## AI is responsible for:

* Understanding user intent
* Searching through tools
* Comparing products
* Recommending products
* Explaining recommendations
* Suggesting relevant cross-sells
* Requesting actions

## Application is responsible for:

* Product facts
* Prices
* Stock
* Calculations
* Wallet balance
* Authorization
* Payment verification
* Transaction status
* Audit logs

This separation prevents the AI from becoming the final authority over money.

---

# 🧰 Technology Stack

## Frontend

* React
* TypeScript
* Next.js
* Tailwind CSS

## Backend

* Next.js API Routes
* TypeScript

## Database

* PostgreSQL
* Prisma ORM

## AI

* Groq
* LLM-based shopping agent
* Tool-based catalog access

## Payments

* Razorpay Test Mode

## Deployment

* Vercel

---

# 📁 Project Structure

```text
SafeShop-AI/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── api/
│   │   │   ├── agent/
│   │   │   ├── audit/
│   │   │   ├── payment/
│   │   │   ├── products/
│   │   │   ├── purchase/
│   │   │   └── wallet/
│   │   │
│   │   ├── audit/
│   │   ├── merchant/
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Navigation.tsx
│   │   └── SimulationBanner.tsx
│   │
│   └── lib/
│       ├── audit.ts
│       ├── db.ts
│       ├── razorpay.ts
│       └── wallet.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.js
│
├── .env.example
├── package.json
├── README.md
└── ...
```

---

# 👣 Example User Journey

Here is the complete example used to demonstrate SafeShop AI.

## Step 1 — User Request

The user says:

> "I need headphones for college under ₹3000 with good battery life."

---

## Step 2 — AI Understands

The AI identifies:

```text
Category: Headphones
Budget: ₹3000
Use: College
Preference: Good battery life
```

---

## Step 3 — Catalog Search

SafeShop AI searches multiple merchant catalogs.

The system looks at available products.

---

## Step 4 — Recommendation

The AI recommends:

```text
SoundMax Pro

₹2499

Rating: 4.5
Battery: 40 hours
```

The AI explains why it is a suitable match.

---

## Step 5 — Cross-Sell

The system finds a related product:

```text
AudioGuard Case

₹399
```

The AI asks:

> "Would you like to add the compatible protective case?"

The user selects:

**Yes.**

---

## Step 6 — Total

```text
SoundMax Pro       ₹2499
AudioGuard Case     ₹399
-------------------------
Total              ₹2898
```

---

## Step 7 — Wallet

The TEST wallet contains:

```text
₹5000
```

The application calculates:

```text
₹5000 - ₹2898 = ₹2102
```

---

## Step 8 — Approval

The user sees the complete purchase summary.

The user clicks:

**Approve Purchase**

---

## Step 9 — Validation

The Wallet Engine checks:

```text
✓ Product exists
✓ Price is valid
✓ Product is in stock
✓ Quantity is valid
✓ Wallet has enough funds
✓ User approved purchase
```

---

## Step 10 — Test Payment

The payment process uses Razorpay Test Mode.

No real money is involved.

---

## Step 11 — Wallet Update

The simulated wallet becomes:

```text
Before: ₹5000
After:  ₹2102
```

---

## Step 12 — Audit

The system records the important actions.

The user can view them in the Audit Trail.

---

# ❌ Failure Demonstration

The second part of the demo shows what happens when a purchase cannot be completed.

The wallet contains:

```text
₹2102
```

The user asks:

> "Buy this ₹45000 laptop."

The Wallet Engine checks the balance.

```text
Required:  ₹45000
Available: ₹2102
```

The transaction is blocked.

The system explains the reason clearly.

This demonstrates that the AI cannot simply spend money without passing application-level safety checks.

---

# 🔐 Security Principles

SafeShop AI follows these important rules.

### Rule 1

The LLM cannot directly modify wallet balances.

### Rule 2

The LLM cannot decide that a payment was successful.

### Rule 3

The LLM cannot invent product prices.

### Rule 4

The LLM cannot invent stock information.

### Rule 5

The LLM cannot bypass wallet validation.

### Rule 6

The LLM cannot bypass user approval.

### Rule 7

Product prices are revalidated before purchase.

### Rule 8

Stock is revalidated before purchase.

### Rule 9

Payment secrets stay on the backend.

### Rule 10

Important money-related actions are logged.

### Rule 11

Failed transactions are handled gracefully.

### Rule 12

No real financial credentials are collected.

---

# 🔒 Data Safety

The MVP does not require users to provide:

* Bank account credentials
* UPI PIN
* Card PIN
* Real financial wallet credentials

The wallet shown in the application is only a simulated test environment.

---

# 🚀 Setup

## 1. Clone the repository

```bash
git clone https://github.com/Naseehashaik/SafeShop-AI.git
```

Move into the project:

```bash
cd SafeShop-AI
```

---

# 📦 Install Dependencies

Install the required packages:

```bash
npm install
```

On Windows PowerShell, if necessary:

```bash
npm.cmd install
```

---

# 🔑 Environment Variables

Create a `.env` file.

Use `.env.example` as a reference.

Example:

```env
DATABASE_URL=your_postgresql_connection_string

GROQ_API_KEY=your_groq_api_key

OPENAI_API_KEY=your_openai_api_key

RAZORPAY_KEY_ID=your_razorpay_test_key_id

RAZORPAY_KEY_SECRET=your_razorpay_test_secret

RAZORPAY_MODE=test
```

### ⚠️ Important

Never commit the `.env` file to GitHub.

Never expose:

```text
RAZORPAY_KEY_SECRET
```

in frontend code.

---

# 🗄️ Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Push the schema:

```bash
npx prisma db push
```

Seed the demo data:

```bash
node prisma/seed.js
```

The seed creates demo:

* Merchants
* Products
* User
* Wallet
* Purchase history

---

# ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

On Windows:

```bash
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Testing the Application

The recommended testing flow is:

### Test 1 — Product Search

Enter:

> "I need headphones for college under ₹3000 with good battery life."

Verify that the AI returns catalog products.

---

### Test 2 — Recommendation

Check that the recommended product contains valid:

* Name
* Price
* Image
* Stock
* Specifications

---

### Test 3 — Cross-Sell

Select the recommended headphone.

Verify that the related case is suggested.

---

### Test 4 — Wallet

Check the TEST wallet balance.

---

### Test 5 — Approval

Try to purchase without approval.

The transaction should not proceed.

---

### Test 6 — Successful Purchase

Approve the purchase.

Verify:

* Payment test flow
* Wallet update
* Order confirmation
* Audit log

---

### Test 7 — Insufficient Balance

Use a product that costs more than the wallet balance.

Verify that:

* The transaction is blocked.
* A clear explanation is shown.
* The application does not crash.
* The failure is recorded where applicable.

---

# 🏆 Buildathon Demonstration

The main demonstration is designed around one simple story.

### Consumer

A user wants headphones.

### AI

The AI finds the best matching product.

### Merchant

The merchant's AI-readable catalog makes the product discoverable.

### Growth

The AI suggests a relevant accessory.

### Trust

The purchase is controlled by the user's approval and Wallet Engine.

### Payment

Razorpay Test Mode demonstrates the payment layer.

### Transparency

The Audit Trail records the important actions.

### Failure Safety

An expensive purchase is blocked when the wallet does not have enough funds.

This demonstrates:

```text
AI COMMERCE
      +
CONSUMER TRUST
      +
MERCHANT GROWTH
```

---

# 📊 What Makes the Project Different?

SafeShop AI is not only an AI chatbot.

A normal chatbot may:

```text
User
 ↓
AI
 ↓
Answer
```

SafeShop AI demonstrates:

```text
User
 ↓
AI Shopping Agent
 ↓
Merchant Catalogs
 ↓
Product Recommendation
 ↓
Cross-Sell
 ↓
User Approval
 ↓
Wallet Engine
 ↓
Payment Test Mode
 ↓
Audit Trail
```

The important difference is that AI reasoning and transaction authority are separated.

---

# 🧠 AI + Deterministic Logic

SafeShop AI combines two types of logic.

## AI Logic

Useful for:

* Understanding natural language
* Understanding preferences
* Comparing products
* Explaining recommendations
* Suggesting relevant products

## Deterministic Application Logic

Useful for:

* Checking prices
* Checking stock
* Checking wallet balance
* Calculating totals
* Validating transactions
* Updating balances
* Recording transactions

This makes the system easier to control and understand.

---

# 📈 Merchant Growth Model

SafeShop AI provides a simple model for AI-driven merchant growth.

```text
Merchant Catalog
       ↓
AI Discovery
       ↓
Product Recommendation
       ↓
Customer Selection
       ↓
Cross-Sell
       ↓
Higher Order Opportunity
```

Merchants become easier for AI agents to discover because their products are available in a standardized format.

---

# 🏪 Example Merchant Catalog

The MVP uses demo merchants.

Each merchant can provide multiple products.

For example:

```text
AudioHub
 ├── SoundMax Pro
 ├── BassBeat Lite
 └── AudioGuard Case

TechWorld
 ├── TechSound 40
 ├── PowerSound 50
 └── StudyBuds X

QuickKart
 ├── PocketBuds
 ├── ProBook 15
 └── Laptop Sleeve 15
```

The exact catalog can be expanded as the project grows.

---

# 📦 MVP Scope

The project intentionally avoids unnecessary complexity.

The MVP focuses on:

```text
2–3 Demo Merchants
       +
20–50 Products
       +
1 AI Shopping Agent
       +
1 TEST AI Wallet
       +
Razorpay Test Mode
       +
Cross-Sell
       +
Audit Trail
       +
Failure Handling
       +
Merchant Dashboard
```

The purpose is to demonstrate the complete end-to-end concept rather than build a full production shopping marketplace.

---

# ⚠️ Limitations

SafeShop AI is a buildathon MVP.

It is not a production financial product.

The AI Wallet is simulated.

The demo does not provide:

* Real banking
* Real UPI
* Real wallet services
* Real money transfers
* Real financial accounts
* Production financial authorization

The merchant catalog is also a controlled demo catalog.

---

# 🔮 Future Improvements

If SafeShop AI were developed beyond the MVP, possible improvements include:

## 1. More Merchants

Connect more real merchants through standardized AI-readable catalogs.

## 2. Larger Catalog

Support thousands or millions of products.

## 3. Better Personalization

Learn from user preferences and previous shopping behavior.

## 4. Voice Shopping

Allow users to speak naturally with the shopping agent.

## 5. Spending Limits

Allow users to define:

```text
Daily AI spending limit
Per-purchase limit
Category limit
Merchant limit
```

## 6. Merchant Controls

Allow merchants to manage their AI-readable catalog.

## 7. Better Recommendations

Use more advanced recommendation methods.

## 8. Fraud Detection

Add stronger transaction monitoring.

## 9. Multi-Agent Commerce

Allow multiple specialized agents to handle:

* Product discovery
* Price comparison
* Delivery
* Payment
* Returns

## 10. Production Financial Infrastructure

A real financial wallet would require appropriate:

* Identity verification
* KYC
* Regulatory compliance
* Financial partners
* Secure authentication
* Fraud prevention
* Transaction monitoring
* Production-grade security

These requirements are outside the scope of this buildathon MVP.

---

# 🌍 Long-Term Vision

The long-term vision of SafeShop AI is:

> **Make AI-powered shopping trustworthy for consumers and accessible to merchants.**

In the future, users could say:

> "Find me a good laptop for college under ₹50000."

Instead of manually visiting multiple websites, an AI shopping agent could:

```text
Understand the request
       ↓
Search many merchants
       ↓
Compare products
       ↓
Understand user preferences
       ↓
Recommend the best options
       ↓
Suggest useful accessories
       ↓
Show the complete price
       ↓
Request approval
       ↓
Complete the transaction
       ↓
Record everything
```

The important part is that the AI operates within clear boundaries.

---

# 🧩 Core Design Principle

The most important principle behind SafeShop AI is:

> **Let AI make recommendations, but let deterministic application logic control money.**

The AI is good at understanding and reasoning.

The application is responsible for enforcing rules.

This creates a safer structure for agentic commerce.

---

# 📌 Project Status

### SafeShop AI — Buildathon MVP

Implemented:

* [x] AI shopping interface
* [x] Natural-language product requests
* [x] Merchant catalogs
* [x] AI-readable product structure
* [x] Product search
* [x] Product recommendations
* [x] Recommendation explanations
* [x] User personalization
* [x] Purchase history
* [x] Related products
* [x] Cross-selling
* [x] TEST/SIMULATION AI Wallet
* [x] Wallet balance validation
* [x] User approval
* [x] Product validation
* [x] Price validation
* [x] Stock validation
* [x] Razorpay Test Mode
* [x] Transaction history
* [x] Audit Trail
* [x] Insufficient balance handling
* [x] Merchant Dashboard
* [x] Demo/Test metrics
* [x] PostgreSQL database
* [x] Production deployment

---

# 🌐 Project Links

### GitHub Repository

https://github.com/Naseehashaik/SafeShop-AI

### Live Demo

https://safe-shop-ai-seven.vercel.app/

---

# 👩‍💻 Built For

**Razorpay AI Buildathon 2026**

**Track 1 — AI Growth & Agentic Commerce**

SafeShop AI focuses on:

```text
Consumer Trust
      +
AI Commerce
      +
Merchant Growth
```

---

# 📜 Disclaimer

SafeShop AI is a demonstration project created for the **Razorpay AI Buildathon 2026**.

The AI Wallet is a **TEST/SIMULATION wallet**.

No real money is used.

No real bank account is connected.

No real UPI account is created.

No real financial wallet is created.

Razorpay is used only in **Test Mode** for the demonstration.

The project should not be considered a production financial service.

---

# ⭐ Final Summary

**SafeShop AI** is a trusted AI shopping agent that connects consumers with AI-readable merchants.

It allows users to describe what they want in natural language, discover products from multiple merchants, receive personalized recommendations, and get relevant cross-sell suggestions.

The project also demonstrates a safer approach to AI-powered purchasing through an isolated **TEST/SIMULATION AI Wallet**.

The AI can request a transaction, but it cannot directly control money.

A deterministic Wallet Engine validates the product, price, stock, wallet balance, and user approval before the transaction proceeds.

Razorpay Test Mode demonstrates the payment layer, while the Audit Trail records important actions.

The project brings together:

```text
🤖 AI SHOPPING
       +
🏪 AI-READABLE MERCHANTS
       +
🛒 CROSS-SELL
       +
💳 ISOLATED TEST WALLET
       +
🔐 TRANSACTION SAFETY
       +
📋 AUDIT TRAIL
```

### In one sentence:

> **SafeShop AI is an AI buyer that helps consumers discover and purchase products from AI-readable merchants while demonstrating a safer, isolated spending model for agentic commerce.**

---

## ❤️ SafeShop AI

**Shop smarter. Give AI boundaries. Build trust in agentic commerce.**
