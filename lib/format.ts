export function inr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function lakhLabel(amount: number) {
  const lakhs = amount / 100000;
  const rounded = Number.isInteger(lakhs) ? lakhs.toFixed(0) : lakhs.toFixed(2).replace(/0$/, '').replace(/\.$/, '');
  return `₹${rounded} lakh`;
}
