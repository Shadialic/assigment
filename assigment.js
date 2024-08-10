const fs = require("fs");
fs.readFile("salesData.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const each = data.trim().split("\n");
  const salesData = each.map((item) => {
    const [date, sku, unitPrice, quantity, totalPrice] = item.split(",");
    return {
      date,
      sku,
      unitPrice: Number(unitPrice),
      quantity: Number(quantity),
      totalPrice: Number(totalPrice),
    };
  });
  let totelSales = 0;
  let monthWiseSales = {};
  let monthWiseItem = {};
  salesData.forEach((item) => {
    totelSales += item.totalPrice;
    const month = item.date.slice(0, 7);

    if (!monthWiseSales[month]) {
      monthWiseSales[month] = 0;
      monthWiseItem[month] = {};
    }
    monthWiseSales[month] += item.totalPrice;
    if (!monthWiseItem[month][item.sku]) {
      monthWiseItem[month][item.sku] = { quantity: 0, revenue: 0 };
    }
    monthWiseItem[month][item.sku].quantity += item.quantity;
    monthWiseItem[month][item.sku].revenue += item.totalPrice;
  });
  console.log("Total sales of the store", totelSales);
  console.log("Month wise sales totals", monthWiseSales);
  for (let month in monthWiseItem) {
    let MaxQuantity = 0;
    let mostPopulerItem = "";
    let MaxRevenue = 0;
    let mostRevenueItem = "";
    let ItemQuantity = [];
    for (let item in monthWiseItem[month]) {
      let data = monthWiseItem[month][item];
      ItemQuantity.push(data.quantity);
      if (data.quantity > MaxQuantity) {
        MaxQuantity = data.quantity;
        mostPopulerItem = item;
      }
      if (data.revenue > MaxRevenue) {
        MaxRevenue = data.revenue;
        mostRevenueItem = item;
      }
    }
    let MinOrders = Math.min(...ItemQuantity);
    let MaxOrders = Math.max(...ItemQuantity);
    const AverageOrders =
      ItemQuantity.reduce((acc, curr) => acc + curr, 0) / ItemQuantity.length;
    console.log("Month :", month);

    console.log(
      `Most popular item in each month: ${mostPopulerItem} Quantity: ${MaxQuantity}`
    );
    console.log(
      `items generating most revenue in each month. Item${mostRevenueItem} Revenue : ${MaxRevenue}`
    );
    console.log(
      `Min Orders: ${MinOrders}, Max Orders: ${MaxOrders}, Avg Orders: ${AverageOrders.toFixed(
        2
      )}`
    );
  }
});
