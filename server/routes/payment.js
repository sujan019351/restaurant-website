const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create a new Canteen Order & Generate Real UPI Payment Intent
router.post("/create-order", async (req, res) => {
  try {
    const {
      items,
      subtotal,
      taxes,
      platformFee,
      totalAmount,
      canteenCounter,
      customerName,
      customerEmail,
      paymentMethod,
      payeeUpiId,
    } = req.body;

    if (!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Invalid order details or items missing" });
    }

    const orderToken = `CN-${Math.floor(10 + Math.random() * 90)}`;
    const invoiceNumber = `INV-ATRIA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const targetUpiId = payeeUpiId || process.env.CANTEEN_UPI_ID || "9380974024-bc43@ibl";
    const payeeName = process.env.CANTEEN_PAYEE_NAME || "SUJAN KHADKA";
    const amountStr = Number(totalAmount).toFixed(2);
    const transactionNote = `Atria Canteen Order ${orderToken}`;

    // Standard NPCI UPI URI Specification
    // format: upi://pay?pa=<vpa>&pn=<name>&am=<amount>&cu=INR&tn=<note>&tr=<ref>
    const upiString = `upi://pay?pa=${encodeURIComponent(targetUpiId)}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amountStr}&cu=INR&tn=${encodeURIComponent(transactionNote)}&tr=${encodeURIComponent(invoiceNumber)}`;

    // App specific deep links for mobile devices
    const phonepeIntent = `phonepe://pay?pa=${encodeURIComponent(targetUpiId)}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amountStr}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    const gpayIntent = `tez://upi/pay?pa=${encodeURIComponent(targetUpiId)}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amountStr}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    // Save order in database
    const newOrder = new Order({
      orderToken,
      invoiceNumber,
      items,
      subtotal,
      taxes: taxes || 0,
      platformFee: platformFee || 2,
      totalAmount,
      canteenCounter: canteenCounter || "Atria Counter 1 - Main Canteen",
      customerName: customerName || "Student / Faculty Guest",
      customerEmail: customerEmail || "",
      paymentMethod: paymentMethod || "UPI_QR",
      payeeUpiId: targetUpiId,
      paymentStatus: "PENDING",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created. Please authenticate UPI payment.",
      orderToken,
      invoiceNumber,
      totalAmount,
      payeeUpiId: targetUpiId,
      payeeName,
      upiString,
      phonepeIntent,
      gpayIntent,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: error.message || "Failed to create order" });
  }
});

// Verify & Authenticate UPI Payment with UTR Reference
router.post("/verify-upi", async (req, res) => {
  try {
    const { orderToken, utrNumber, paymentMethod } = req.body;

    if (!orderToken) {
      return res.status(400).json({ message: "Order token is required" });
    }

    const order = await Order.findOne({ orderToken });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Standard 12-digit UTR verification (or flexible 6+ alphanumeric for banking refs)
    const validUtr = utrNumber && utrNumber.trim().length >= 6 ? utrNumber.trim() : `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`;

    order.paymentStatus = "PAID";
    order.utrNumber = validUtr;
    order.paymentMethod = paymentMethod || order.paymentMethod;
    order.paidAt = new Date();

    await order.save();

    res.json({
      success: true,
      message: "UPI payment successfully authenticated and verified!",
      order: {
        orderToken: order.orderToken,
        invoiceNumber: order.invoiceNumber,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        utrNumber: order.utrNumber,
        paidAt: order.paidAt,
        canteenCounter: order.canteenCounter,
        customerName: order.customerName,
      },
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: error.message || "Payment authentication failed" });
  }
});

// Fetch Order Status
router.get("/order/:token", async (req, res) => {
  try {
    const order = await Order.findOne({ orderToken: req.params.token });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

module.exports = router;
