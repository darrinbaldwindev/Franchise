# Stock Economics & Opening Inventory Model

## Purpose

Define the canonical SKU-level model behind the Franchise opening-stock proposition and the ongoing inventory system.

## Current commercial proposition

- Entry investment: **AUD $4,995**
- Opening inventory target cost basis: **approximately $2,000**
- Opening inventory target retail value: **$3,300+**
- Customer-facing delivery proposition: **free delivery**
- Technology, furniture, shelving and additional stock may be offered as optional add-ons.

These are commercial planning inputs, not guarantees. The actual opening inventory must be represented by real SKUs and actual supplier costs before a franchisee is told an exact retail value.

## SKU record requirements

Each sellable SKU should support at least:

- sku_id
- product name
- category
- supplier
- supplier SKU/reference
- purchase cost ex/inclusive of tax as configured
- recommended retail price
- actual selling price
- quantity received
- quantity sold
- quantity refunded/returned
- quantity damaged/adjusted
- quantity on hand
- reorder point
- reorder quantity
- margin amount
- margin percentage
- tax treatment/configuration
- effective dates for price/cost changes
- active/inactive status

## Opening-stock verification

The system should calculate opening stock from the actual SKU list:

`Opening stock cost = sum(quantity received × unit purchase cost)`

`Opening stock retail value = sum(quantity received × configured retail price)`

`Opening stock gross margin = opening retail value - opening stock cost`

`Opening stock gross margin % = gross margin / opening retail value × 100`

The dashboard must not display "$3,300+ retail value" as a verified fact unless the actual SKU list supports it.

## Sales economics

For each order, the financial engine should be able to identify the SKU-level COGS:

`SKU COGS = quantity sold × applicable unit cost`

Where historical cost changes exist, the inventory/accounting implementation must define a consistent costing method rather than silently using the latest purchase price.

The chosen method must be documented and tested.

## Free delivery

Free delivery is customer-facing. The platform must still record the actual delivery cost associated with each order where available.

Delivery cost should not be hidden inside product margin.

This allows the business to determine:

- product gross margin;
- contribution after delivery;
- contribution by territory;
- contribution by order;
- contribution by SKU/category.

## Stock turnover

The dashboard should expose:

- opening units;
- units sold;
- units remaining;
- sell-through percentage;
- opening cost consumed;
- opening retail value sold;
- gross margin generated;
- current stock value;
- low-stock SKUs;
- stock-outs;
- replenishment requirements.

## Additional stock

Franchisees may purchase additional approved stock after launch.

Additional stock must be tracked separately from the original opening package so the franchisee can distinguish:

- opening investment inventory;
- replenishment inventory;
- optional additional inventory;
- inventory purchased from approved suppliers.

## Supplier flexibility

The business may permit approved products to be sourced through designated suppliers or approved retail channels where commercially appropriate.

Supplier flexibility must not bypass:

- product safety requirements;
- required product data;
- pricing controls;
- margin rules;
- inventory reconciliation;
- tax configuration;
- prohibited-product rules.

## Margin reporting

The platform should provide at least:

- margin by SKU;
- margin by category;
- margin by order;
- margin by franchisee;
- margin by period;
- margin after delivery cost;
- contribution after configured payment fees and royalty.

## Important separation

Do not confuse:

**Retail value** with **revenue**.

**Revenue** with **gross margin**.

**Gross margin** with **contribution**.

**Contribution** with **owner income**.

**Stock value** with **cash available**.

The dashboard should make these distinctions visible.

## Required tests

Tests should cover:

- opening-stock valuation;
- SKU margin calculations;
- quantity changes;
- refunds/returns;
- cost changes;
- stock-outs;
- additional stock;
- free-delivery cost;
- margin versus contribution;
- tax configuration;
- investment recovery interaction.

## Commercial safeguard

No sales or marketing material should promise a particular profit, income, number of orders or investment-recovery period. The platform should show actual results and clearly label forecasts/illustrations as estimates.
