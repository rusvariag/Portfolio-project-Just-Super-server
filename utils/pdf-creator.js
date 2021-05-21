const PDFDocument = require('pdfkit');

// Colors definitions
const primaryColor = '#041E42';
const primaryLightColor = '#0071DC';
const secondaryColor = '#FFCC220';
const secondaryLightColor = '#FCED70';

function tableRow(doc, arr, options) {
  // Row doc parameters
  const color = options.color ? options.color : "black";
  doc.fill(color);

  // Inner parameters
  const lineWidth = doc.page.width - doc.page.margins.right * 2;
  const currentY = doc.y;
  const currentX = doc.x;
  const quarterLine = lineWidth / 5;
  let strLength;
  let cellPadding;

  // Start of drawing
  doc.text("|", currentX + quarterLine * 0, currentY);

  strLength = doc.widthOfString(arr[0]);
  cellPadding = (quarterLine - strLength) / 2;
  doc.text(arr[0], currentX + quarterLine * 0 + cellPadding, currentY);

  doc.text("|", currentX + quarterLine * 2, currentY);

  strLength = doc.widthOfString(arr[1]);
  cellPadding = (quarterLine - strLength) / 2;
  doc.text(arr[1], currentX + quarterLine * 2 + cellPadding, currentY);

  doc.text("|", currentX + quarterLine * 3, currentY);

  strLength = doc.widthOfString(arr[2]);
  cellPadding = (quarterLine - strLength) / 2;
  doc.text(arr[2], currentX + quarterLine * 3 + cellPadding, currentY);

  doc.text("|", currentX + quarterLine * 4, currentY);

  strLength = doc.widthOfString(arr[3]);
  cellPadding = (quarterLine - strLength) / 2;
  doc.text(arr[3], currentX + quarterLine * 4 + cellPadding, currentY);

  doc.text("|", currentX + quarterLine * 5 - doc.widthOfString("|"), currentY);

  // return the parameters to its start value
  doc.x = currentX;
}

function tableTotal(doc, arr) {
  const lineWidth = doc.page.width - doc.page.margins.right * 2;
  const quarterLine = lineWidth / 5;
  const currentY = doc.y;
  const currentX = doc.x;
  let strLength;
  let cellPadding;

  doc.text("|", currentX + quarterLine * 3, currentY);

  strLength = doc.widthOfString(arr[0]);
  cellPadding = (quarterLine - strLength) / 2;
  doc.text(arr[0], currentX + quarterLine * 3 + cellPadding, currentY);

  doc.text("|", currentX + quarterLine * 4, currentY);

  strLength = doc.widthOfString(arr[1]);
  cellPadding = (quarterLine - strLength) / 2;
  doc.text(arr[1], currentX + quarterLine * 4 + cellPadding, currentY);

  doc.text("|", currentX + quarterLine * 5, currentY);

  const stringHalfHeight = doc.heightOfString("|") / 2;
  doc.moveDown();

  doc
    .lineCap("butt")
    .moveTo(currentX + quarterLine * 3, doc.y + stringHalfHeight)
    .lineTo(currentX + quarterLine * 5, doc.y + stringHalfHeight)
    .fill('black')
    .dash(10, { space: 3 })
    .stroke();
}

function drawSection(doc) {
  const lineWidth = doc.page.width - doc.page.margins.right * 2;

  doc
    .rect(doc.x, doc.y, lineWidth, doc.currentLineHeight())
    .fill(primaryColor)
    .stroke();

  doc.moveDown(2);
}

function drawSeparator(doc, color = "black") {
  const stringHalfHeight = doc.heightOfString("|") / 2;

  doc
    .lineCap("butt")
    .moveTo(doc.x, doc.y + stringHalfHeight)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + stringHalfHeight)
    .fill(color)
    .dash(10, { space: 3 })
    .stroke();

  doc.moveDown();
}

function Header(doc, data) {
  const lineWidth = doc.page.width - doc.page.margins.right * 2;
  const fontSize = doc._fontSize;
  doc.fontSize(18);
  doc
    .text("Super Shop Receipt", {
      width: lineWidth,
      align: "left",
      continued: true
    })
    .text(`No. ${data.receiptNumber}`, { width: lineWidth, align: "right" });
  doc.fontSize(fontSize);
  doc.moveDown(2);
}

function customerDetails(doc, data) {
  doc.fill('black');
  doc.text("Customer");
  doc.moveDown();
  doc.text("ID :", { continued: true }).text(`${data.id}`, { align: "right" });
  doc.text("Name :", { continued: true }).text(`${data.name}`, { align: "right" });
  doc.text("Email :", { continued: true }).text(`${data.email}`, { align: "right" });
}

function billingDetails(doc, data) {
  doc.fill('black');
  doc.text("Billing details");
  doc.moveDown();
  doc.text("City :", { continued: true }).text(`${data.street}`, { align: "right" });
  doc.text("Street :", { continued: true }).text(`${data.street}`, { align: "right" });
  doc.text("Account number :", { continued: true }).text(`${data.account}`, { align: "right" });
  doc.text("Issued :", { continued: true }).text(`${data.issued}`, { align: "right" });
  doc.text("Supply date :", { continued: true }).text(`${data.supply}`, { align: "right" });
}

module.exports.pdfCreator = (res, data) => {

  const receiptNumber = data.id;

  const customerData = {
    id: data.user.identity,
    name: data.user.firstname + ' ' + data.user.lastname,
    email: data.user.email,
  };

  const billingData = {
    city: data.city,
    street: data.street,
    account: data.credit_card,
    issued: data.issued_at,
    supply: data.shipment_at,
    totalCost: data.total_cost
  };

  const products = data.products;

  const doc = new PDFDocument();
  doc.pipe(res);

  Header(doc, { receiptNumber });

  drawSection(doc);

  customerDetails(doc, customerData);

  doc.moveDown();

  drawSection(doc);

  billingDetails(doc, billingData);

  doc.moveDown();

  drawSection(doc);

  tableRow(doc, ["Item", "Quantity", "Price per piece", "Total"], {
    color: 'black'
  });

  drawSeparator(doc, 'black');

  products.forEach(product => {
    const { name, quantity, price, cost } = product;
    tableRow(doc, [name, quantity, price, cost], {
      color: 'black'
    });
    drawSeparator(doc, 'black');
  });

  tableTotal(doc, ["Summary :", billingData.totalCost]);

  doc.end();
}
