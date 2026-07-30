export const formatCurrency = (amount) => {
  return '₹ ' + Number(amount).toLocaleString('en-IN');
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};
