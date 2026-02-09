export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})


// 'en-US': Specifies the format for US English (like commas for thousands and decimal points).

// style: 'currency': Tells the formatter to show the number as currency.

// currency: 'USD': Specifies you want the currency to be in US dollars (USD).

// In short: It formats numbers as US dollar values (like $1,000.00).



// export const currencyFormatter = new Intl.NumberFormat('en-PK', {
//     style: 'currency',
//     currency: 'PKR'
// });