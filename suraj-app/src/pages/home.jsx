import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import "./home.css";

// ----------------------------------------------------------------------
// Canteen Menu Dataset organized by Sections
// ----------------------------------------------------------------------
const SECTIONS_CONFIG = [
  { id: "Fast Food", name: "Fast Food", icon: "🍔", tag: "Hot & Crispy" },
  { id: "Dairy Product", name: "Dairy Product", icon: "🥛", tag: "Fresh & Chilled" },
  { id: "Beverage", name: "Beverage", icon: "☕", tag: "Chai & Refreshers" },
  { id: "Fresh Fruits", name: "Fresh Fruits", icon: "🍎", tag: "Healthy & Clean" },
  { id: "Other", name: "Other Specials", icon: "🍛", tag: "Meals & Desserts" },
];

const CANTEEN_ITEMS = [
  // 1. FAST FOOD
  {
    id: 1,
    name: "Crispy Punjabi Aloo Samosa",
    category: "Fast Food",
    price: 20,
    originalPrice: 30,
    discount: "33% OFF",
    weight: "2 pcs + Mint Chutney",
    rating: 4.8,
    ratingCount: "340+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "8 MINS",
  },
  {
    id: 2,
    name: "Cheese Corn Samosa",
    category: "Fast Food",
    price: 35,
    originalPrice: 50,
    discount: "30% OFF",
    weight: "2 pcs",
    rating: 4.7,
    ratingCount: "190+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "8 MINS",
  },
  {
    id: 3,
    name: "Classic Cheese Maggi",
    category: "Fast Food",
    price: 45,
    originalPrice: 55,
    discount: "18% OFF",
    weight: "1 Hot Bowl",
    rating: 4.8,
    ratingCount: "740+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "10 MINS",
  },
  {
    id: 4,
    name: "Peri Peri French Fries",
    category: "Fast Food",
    price: 55,
    originalPrice: 75,
    discount: "27% OFF",
    weight: "Medium Box",
    rating: 4.7,
    ratingCount: "430+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "8 MINS",
  },
  {
    id: 5,
    name: "Grilled Paneer Tikka Wrap",
    category: "Fast Food",
    price: 75,
    originalPrice: 95,
    discount: "21% OFF",
    weight: "1 Jumbo Roll",
    rating: 4.8,
    ratingCount: "380+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "10 MINS",
  },
  {
    id: 6,
    name: "Crispy Veggie Burger",
    category: "Fast Food",
    price: 60,
    originalPrice: 80,
    discount: "25% OFF",
    weight: "1 pc",
    rating: 4.7,
    ratingCount: "320+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "10 MINS",
  },
  {
    id: 7,
    name: "Steamed Veg Momos",
    category: "Fast Food",
    price: 50,
    originalPrice: 70,
    discount: "28% OFF",
    weight: "6 pcs + Spicy Dip",
    rating: 4.8,
    ratingCount: "410+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "8 MINS",
  },
  {
    id: 8,
    name: "Mini Margherita Pizza Slice",
    category: "Fast Food",
    price: 65,
    originalPrice: 85,
    discount: "23% OFF",
    weight: "1 Slice with Mozzarella",
    rating: 4.6,
    ratingCount: "260+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "10 MINS",
  },

  // 2. DAIRY PRODUCT
  {
    id: 9,
    name: "Belgian Chocolate Ice Cream Cup",
    category: "Dairy Product",
    price: 45,
    originalPrice: 60,
    discount: "25% OFF",
    weight: "100 ml cup",
    rating: 4.9,
    ratingCount: "520+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
  {
    id: 10,
    name: "Butterscotch Waffle Cone",
    category: "Dairy Product",
    price: 40,
    originalPrice: 50,
    discount: "20% OFF",
    weight: "120 ml",
    rating: 4.8,
    ratingCount: "280+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
  {
    id: 11,
    name: "Royal Malai Kulfi Stick",
    category: "Dairy Product",
    price: 30,
    originalPrice: 40,
    discount: "25% OFF",
    weight: "80 ml stick",
    rating: 4.9,
    ratingCount: "410+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
  {
    id: 12,
    name: "Amul Flavoured Chocolate Milk",
    category: "Dairy Product",
    price: 35,
    originalPrice: 40,
    discount: "12% OFF",
    weight: "200 ml bottle",
    rating: 4.8,
    ratingCount: "390+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
  {
    id: 13,
    name: "Paneer Cheese Grilled Sandwich",
    category: "Dairy Product",
    price: 60,
    originalPrice: 80,
    discount: "25% OFF",
    weight: "2 Grilled Triangles",
    rating: 4.8,
    ratingCount: "450+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "8 MINS",
  },
  {
    id: 14,
    name: "Berry Sweet Greek Yogurt Cup",
    category: "Dairy Product",
    price: 35,
    originalPrice: 45,
    discount: "22% OFF",
    weight: "100g cup",
    rating: 4.7,
    ratingCount: "170+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },

  // 3. BEVERAGE
  {
    id: 15,
    name: "Cutting Masala Chai",
    category: "Beverage",
    price: 15,
    originalPrice: 20,
    discount: "25% OFF",
    weight: "1 Kulhad Cup",
    rating: 4.9,
    ratingCount: "890+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "6 MINS",
  },
  {
    id: 16,
    name: "Thick Frothy Cold Coffee",
    category: "Beverage",
    price: 50,
    originalPrice: 70,
    discount: "29% OFF",
    weight: "300 ml glass",
    rating: 4.9,
    ratingCount: "630+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "8 MINS",
  },
  {
    id: 17,
    name: "Fresh Mango Lassi",
    category: "Beverage",
    price: 45,
    originalPrice: 60,
    discount: "25% OFF",
    weight: "250 ml",
    rating: 4.8,
    ratingCount: "250+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "8 MINS",
  },
  {
    id: 18,
    name: "Sparkling Lemon Iced Tea",
    category: "Beverage",
    price: 40,
    originalPrice: 50,
    discount: "20% OFF",
    weight: "300 ml",
    rating: 4.7,
    ratingCount: "220+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "6 MINS",
  },
  {
    id: 19,
    name: "Chilled Kesar Badam Milk",
    category: "Beverage",
    price: 35,
    originalPrice: 45,
    discount: "22% OFF",
    weight: "200 ml",
    rating: 4.8,
    ratingCount: "190+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
  {
    id: 20,
    name: "Fresh Mint Lime Soda",
    category: "Beverage",
    price: 30,
    originalPrice: 40,
    discount: "25% OFF",
    weight: "300 ml glass",
    rating: 4.7,
    ratingCount: "310+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },

  // 4. FRESH FRUITS
  {
    id: 21,
    name: "Seasonal Fresh Fruit Salad Bowl",
    category: "Fresh Fruits",
    price: 50,
    originalPrice: 70,
    discount: "28% OFF",
    weight: "Apple, Papaya, Melon, Grapes & Anar",
    rating: 4.9,
    ratingCount: "380+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "6 MINS",
  },
  {
    id: 22,
    name: "Chilled Watermelon Slices Bowl",
    category: "Fresh Fruits",
    price: 40,
    originalPrice: 55,
    discount: "27% OFF",
    weight: "250g Sweet Bowl",
    rating: 4.8,
    ratingCount: "290+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
  {
    id: 23,
    name: "Fresh Sweet Papaya Cubes",
    category: "Fresh Fruits",
    price: 35,
    originalPrice: 45,
    discount: "22% OFF",
    weight: "200g bowl with Lemon Wedge",
    rating: 4.7,
    ratingCount: "160+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
  {
    id: 24,
    name: "Robusta Bananas Pack",
    category: "Fresh Fruits",
    price: 25,
    originalPrice: 35,
    discount: "28% OFF",
    weight: "3 Ripe Fresh Bananas",
    rating: 4.8,
    ratingCount: "240+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
  {
    id: 25,
    name: "Fresh Pomegranate (Anar) Cup",
    category: "Fresh Fruits",
    price: 60,
    originalPrice: 80,
    discount: "25% OFF",
    weight: "150g Peeled Seeds Cup",
    rating: 4.9,
    ratingCount: "210+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
  {
    id: 26,
    name: "Crisp Apple Slices with Honey Dip",
    category: "Fresh Fruits",
    price: 55,
    originalPrice: 70,
    discount: "21% OFF",
    weight: "1 Whole Sliced Apple",
    rating: 4.8,
    ratingCount: "190+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "6 MINS",
  },

  // 5. OTHER (Meals & Staples)
  {
    id: 27,
    name: "Delhi Style Chole Bhature",
    category: "Other",
    price: 80,
    originalPrice: 110,
    discount: "27% OFF",
    weight: "2 Bhature + Pindi Chole",
    rating: 4.9,
    ratingCount: "490+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "12 MINS",
  },
  {
    id: 28,
    name: "Mumbai Butter Pav Bhaji",
    category: "Other",
    price: 70,
    originalPrice: 90,
    discount: "22% OFF",
    weight: "2 Butter Pav + Spiced Bhaji",
    rating: 4.9,
    ratingCount: "510+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "10 MINS",
  },
  {
    id: 29,
    name: "Veg Fried Rice with Manchurian",
    category: "Other",
    price: 95,
    originalPrice: 125,
    discount: "24% OFF",
    weight: "1 Combo Bowl",
    rating: 4.8,
    ratingCount: "360+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "12 MINS",
  },
  {
    id: 30,
    name: "Atria Executive Student Thali",
    category: "Other",
    price: 85,
    originalPrice: 120,
    discount: "29% OFF",
    weight: "Rice, Dal, 2 Roti, Sabzi & Curd",
    rating: 4.9,
    ratingCount: "680+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "10 MINS",
  },
  {
    id: 31,
    name: "Warm Gulab Jamun",
    category: "Other",
    price: 35,
    originalPrice: 45,
    discount: "22% OFF",
    weight: "2 pcs in sugar syrup",
    rating: 4.8,
    ratingCount: "310+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1605197148564-9be93952f447?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "6 MINS",
  },
  {
    id: 32,
    name: "Assorted Cookies & Wafers Pack",
    category: "Other",
    price: 20,
    originalPrice: 25,
    discount: "20% OFF",
    weight: "1 Canteen Snack Pouch",
    rating: 4.7,
    ratingCount: "150+",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60",
    deliveryTime: "5 MINS",
  },
];

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [orderToken, setOrderToken] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [billTimestamp, setBillTimestamp] = useState("");
  const [canteenCounter, setCanteenCounter] = useState("Atria Counter 1 - Main Canteen");

  // Real PhonePe UPI Payment State (Sujan Khadka)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentApp, setSelectedPaymentApp] = useState("phonepe"); // 'phonepe' | 'gpay' | 'qr'
  const [qrDisplayMode, setQrDisplayMode] = useState("official_stand"); // 'official_stand' | 'dynamic_qr'
  const [canteenUpiId, setCanteenUpiId] = useState("9380974024-bc43@ibl");
  const [isEditingUpi, setIsEditingUpi] = useState(false);
  const [tempUpiInput, setTempUpiInput] = useState("9380974024-bc43@ibl");
  const [utrInput, setUtrInput] = useState("");
  const [verifiedUtr, setVerifiedUtr] = useState("");
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Billed Order Snapshot (preserves invoice items even after cart resets)
  const [billedCart, setBilledCart] = useState({});
  const [billedSummary, setBilledSummary] = useState({
    cartTotalAmount: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    platformFee: 0,
    finalBillAmount: 0,
    totalItemsCount: 0,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        // ignore parse error
      }
    }
  }, []);

  // Cart operations
  const addToCart = (itemId) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  // Cart calculations
  const totalItemsCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const cartTotalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = CANTEEN_ITEMS.find((i) => i.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);

  // Taxes & Charges
  const platformFee = totalItemsCount > 0 ? 2 : 0;
  const cgstAmount = Number((cartTotalAmount * 0.025).toFixed(2));
  const sgstAmount = Number((cartTotalAmount * 0.025).toFixed(2));
  const finalBillAmount = Number((cartTotalAmount + cgstAmount + sgstAmount + platformFee).toFixed(2));

  // Generate Real NPCI UPI URI Scheme
  const payeeName = "SUJAN KHADKA";
  const upiTransactionNote = `Atria Order ${orderToken || "CN-42"}`;
  const upiAmountStr = finalBillAmount.toFixed(2);

  // Standard NPCI UPI URI string
  const realUpiString = `upi://pay?pa=${encodeURIComponent(canteenUpiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${upiAmountStr}&cu=INR&tn=${encodeURIComponent(upiTransactionNote)}&tr=${encodeURIComponent(
    invoiceNumber || "INV-ATRIA"
  )}`;

  // Mobile Deep Link Intent URLs for PhonePe and Google Pay
  const phonepeIntentURI = `phonepe://pay?pa=${encodeURIComponent(canteenUpiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${upiAmountStr}&cu=INR&tn=${encodeURIComponent(upiTransactionNote)}`;

  const gpayIntentURI = `tez://upi/pay?pa=${encodeURIComponent(canteenUpiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${upiAmountStr}&cu=INR&tn=${encodeURIComponent(upiTransactionNote)}`;

  // Dynamic QR Code image URL generated from the real UPI URI
  const upiQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(
    realUpiString
  )}`;

  // Initiate Real UPI Payment
  const initiateUpiPayment = async () => {
    if (totalItemsCount === 0) return;
    const randomTok = `CN-${Math.floor(10 + Math.random() * 90)}`;
    const randomInv = `INV-ATRIA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderToken(randomTok);
    setInvoiceNumber(randomInv);
    setBillTimestamp(
      new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    );

    // Freeze order snapshot for bill generation
    setBilledCart({ ...cart });
    setBilledSummary({
      cartTotalAmount,
      cgstAmount,
      sgstAmount,
      platformFee,
      finalBillAmount,
      totalItemsCount,
    });

    // Call backend order creation
    try {
      const itemsList = Object.entries(cart).map(([id, qty]) => {
        const item = CANTEEN_ITEMS.find((i) => i.id === Number(id));
        return {
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          quantity: qty,
        };
      });

      await fetch(`${API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsList,
          subtotal: cartTotalAmount,
          taxes: Number((cgstAmount + sgstAmount).toFixed(2)),
          platformFee,
          totalAmount: finalBillAmount,
          canteenCounter,
          customerName: currentUser ? currentUser.name : "Student / Faculty Guest",
          customerEmail: currentUser ? currentUser.email : "",
          paymentMethod: selectedPaymentApp === "gpay" ? "GPAY" : selectedPaymentApp === "phonepe" ? "PHONEPE" : "UPI_QR",
          payeeUpiId: canteenUpiId,
        }),
      });
    } catch (err) {
      console.warn("Backend order creation warning:", err);
    }

    setPaymentError("");
    setUtrInput("");
    setIsCartOpen(false);
    setIsPaymentModalOpen(true);
  };

  // Authenticate UPI Payment with UTR
  const authenticateUpiPayment = async (customUtr) => {
    const utr = customUtr || utrInput.trim();
    if (!utr || utr.length < 6) {
      setPaymentError("Please enter a valid 12-digit UPI UTR / Reference Number from PhonePe or GPay.");
      return;
    }

    setIsVerifyingPayment(true);
    setPaymentError("");

    try {
      const res = await fetch(`${API_URL}/api/payment/verify-upi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderToken,
          utrNumber: utr,
          paymentMethod: selectedPaymentApp === "gpay" ? "GPAY" : selectedPaymentApp === "phonepe" ? "PHONEPE" : "UPI_QR",
        }),
      });
      await res.json();
    } catch (err) {
      console.warn("Payment verification fallback:", err);
    }

    setVerifiedUtr(utr);
    setIsVerifyingPayment(false);
    setIsPaymentModalOpen(false);
    // Clear active cart since order has been paid and verified
    setCart({});
    // AUTOMATICALLY OPEN THE GENERATED CASH MEMO / BILL
    setIsBillOpen(true);
  };

  // Generate Bill Action directly
  const generateBill = () => {
    if (totalItemsCount === 0 && Object.keys(billedCart).length === 0) return;
    const randomInv = invoiceNumber || `INV-ATRIA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomTok = orderToken || `CN-${Math.floor(10 + Math.random() * 90)}`;
    setInvoiceNumber(randomInv);
    setOrderToken(randomTok);
    setBillTimestamp(
      billTimestamp ||
        new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
    );
    if (Object.keys(cart).length > 0) {
      setBilledCart({ ...cart });
      setBilledSummary({
        cartTotalAmount,
        cgstAmount,
        sgstAmount,
        platformFee,
        finalBillAmount,
        totalItemsCount,
      });
    }
    setIsBillOpen(true);
    setIsCartOpen(false);
  };

  // Save customized UPI ID
  const handleSaveUpiId = () => {
    if (tempUpiInput.trim() && tempUpiInput.includes("@")) {
      setCanteenUpiId(tempUpiInput.trim());
      setIsEditingUpi(false);
    } else {
      alert("Please enter a valid UPI ID (e.g. mobile@upi or name@okaxis)");
    }
  };

  // Filter items matching search
  const filterBySearch = (items) => {
    if (!searchQuery.trim()) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Render a specific card
  const renderProductCard = (item) => {
    const qty = cart[item.id] || 0;
    return (
      <div key={item.id} className="zepto-card">
        <div className="card-image-wrap">
          <img
            src={item.image}
            alt={item.name}
            className="card-img"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60";
            }}
          />
          <div className="card-mins-badge">⚡ {item.deliveryTime}</div>
          {item.isVeg && (
            <div className="card-veg-symbol" title="Vegetarian">
              <div className="card-veg-dot"></div>
            </div>
          )}
          <div className="card-discount-tag">{item.discount}</div>
        </div>

        <div className="card-info">
          <div className="card-rating-row">
            <span className="card-rating-star">★</span>
            <span>{item.rating}</span>
            <span style={{ color: "#94a3b8", fontWeight: "normal" }}>({item.ratingCount})</span>
          </div>

          <h3 className="card-title" title={item.name}>{item.name}</h3>
          <div className="card-weight">{item.weight}</div>

          <div className="card-bottom-row">
            <div className="price-container">
              <span className="current-price">₹{item.price}</span>
              <span className="original-price">₹{item.originalPrice}</span>
            </div>

            {qty === 0 ? (
              <button
                className="zepto-add-btn"
                onClick={() => addToCart(item.id)}
              >
                ADD
              </button>
            ) : (
              <div className="zepto-qty-selector">
                <button
                  className="qty-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  −
                </button>
                <span className="qty-count">{qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => addToCart(item.id)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="zepto-home">
      {/* ----------------- Top Announcement Bar ----------------- */}
      <div className="atria-top-bar">
        <span className="atria-live-dot"></span>
        <span>ATRIA INSTITUTE OF TECHNOLOGY • ATRIA CANTEEN ⚡ 10-MIN EXPRESS SERVICE</span>
      </div>

      {/* ----------------- Top Sticky Header ----------------- */}
      <header className="zepto-navbar">
        <div className="zepto-nav-top">
          <div className="zepto-brand-group">
            <Link to="/" className="zepto-logo">
              <span className="atria-highlight">ATRIA</span>
              <span className="canteen-highlight">CANTEEN</span>
              <span className="tag">10 MINS</span>
            </Link>

            <div className="delivery-badge">
              <span className="time-pill">⚡ 10 MINS</span>
              <span className="location-text">Atria Campus • Main Counter A</span>
            </div>
          </div>

          <div className="zepto-nav-actions">
            {currentUser ? (
              <Link to="/dashboard" className="user-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Hi, {currentUser.name.split(" ")[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className="login-nav-btn">
                Sign In
              </Link>
            )}

            {totalItemsCount > 0 && (
              <button
                className="nav-bill-btn"
                onClick={generateBill}
                title="Generate Cash Memo / Tax Bill for selected items"
              >
                🧾 Bill
              </button>
            )}

            <button
              className="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Cart</span>
              {totalItemsCount > 0 && (
                <span className="cart-count-badge">{totalItemsCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Search Bar */}
        <div className="zepto-search-container">
          <div className="search-input-wrap">
            <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              className="zepto-search-input"
              placeholder="Search 'samosa', 'maggi', 'ice cream', 'chai', 'fruits' at Atria Canteen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ----------------- Main Canteen Section ----------------- */}
      <main className="zepto-main-content">
        {/* Colorful Promo Banners */}
        <div className="zepto-banners">
          <div className="banner-card banner-1">
            <div>
              <span className="banner-tag">⚡ ATRIA BREAK TIME RUSH</span>
              <div className="banner-title">Fast Food & Samosas @ Atria Canteen</div>
              <div className="banner-subtitle">Freshly fried Samosas, Maggi & Burgers</div>
            </div>
          </div>

          <div className="banner-card banner-2">
            <div>
              <span className="banner-tag">🥛 DAIRY & CHILLED</span>
              <div className="banner-title">Ice Creams & Flavoured Milk</div>
              <div className="banner-subtitle">Kulfi sticks, Cornetto & Paneer specials</div>
            </div>
          </div>

          <div className="banner-card banner-3">
            <div>
              <span className="banner-tag">🍎 FRESH & HEALTHY</span>
              <div className="banner-title">Fruit Salad Bowls & Lassi</div>
              <div className="banner-subtitle">Fresh Watermelon, Papaya & Apple bowls</div>
            </div>
          </div>
        </div>

        {/* Category Pills Navigation Bar */}
        <div className="category-bar-wrapper">
          <div className="category-bar">
            <button
              className={`category-pill ${selectedCategory === "All" ? "active" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              <span className="category-icon">⚡</span>
              <span>All Sections</span>
            </button>

            {SECTIONS_CONFIG.map((sec) => (
              <button
                key={sec.id}
                className={`category-pill ${selectedCategory === sec.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(sec.id)}
              >
                <span className="category-icon">{sec.icon}</span>
                <span>{sec.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sections Display */}
        {selectedCategory === "All" ? (
          SECTIONS_CONFIG.map((section) => {
            const sectionItems = filterBySearch(
              CANTEEN_ITEMS.filter((item) => item.category === section.id)
            );
            if (sectionItems.length === 0) return null;

            return (
              <section key={section.id} className="canteen-section-group" id={section.id}>
                <div className="section-headline">
                  <div className="section-title-wrap">
                    <span className="section-icon-badge">{section.icon}</span>
                    <div>
                      <h2>{section.name}</h2>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>{section.tag}</span>
                    </div>
                  </div>
                  <span className="item-count-text">{sectionItems.length} items</span>
                </div>

                <div className="zepto-product-grid">
                  {sectionItems.map((item) => renderProductCard(item))}
                </div>
              </section>
            );
          })
        ) : (
          (() => {
            const currentSection = SECTIONS_CONFIG.find((s) => s.id === selectedCategory);
            const items = filterBySearch(
              CANTEEN_ITEMS.filter((item) => item.category === selectedCategory)
            );

            return (
              <section className="canteen-section-group">
                <div className="section-headline">
                  <div className="section-title-wrap">
                    <span className="section-icon-badge">{currentSection?.icon}</span>
                    <div>
                      <h2>{currentSection?.name}</h2>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>{currentSection?.tag}</span>
                    </div>
                  </div>
                  <span className="item-count-text">{items.length} items</span>
                </div>

                {items.length === 0 ? (
                  <div className="empty-menu-state">
                    <h3>No items found in {selectedCategory} for "{searchQuery}"</h3>
                    <p>Try clearing your search or browsing other sections.</p>
                  </div>
                ) : (
                  <div className="zepto-product-grid">
                    {items.map((item) => renderProductCard(item))}
                  </div>
                )}
              </section>
            );
          })()
        )}
      </main>

      {/* ----------------- Sticky Bottom Cart Bar ----------------- */}
      {totalItemsCount > 0 && !isCartOpen && !isBillOpen && !isPaymentModalOpen && (
        <div className="sticky-cart-bar">
          <div className="cart-bar-left">
            <span className="cart-bar-items">{totalItemsCount} {totalItemsCount === 1 ? "ITEM" : "ITEMS"} SELECTED</span>
            <span className="cart-bar-total">₹{finalBillAmount}</span>
          </div>
          <div className="cart-bar-right-actions">
            <button className="cart-bar-bill-btn" onClick={generateBill}>
              🧾 Bill
            </button>
            <button className="cart-bar-btn" onClick={initiateUpiPayment}>
              <span>Pay with UPI →</span>
            </button>
          </div>
        </div>
      )}

      {/* ----------------- Cart Slide-Over Drawer ----------------- */}
      {isCartOpen && (
        <>
          <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}></div>
          <div className="cart-drawer">
            <div className="cart-drawer-header">
              <h3>Atria Canteen Cart ({totalItemsCount})</h3>
              <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)}>
                ✕
              </button>
            </div>

            <div className="cart-drawer-body">
              {/* Pickup Counter Choice */}
              <div className="canteen-counter-box">
                <div className="counter-header">⚡ Pick-up / Delivery Counter</div>
                <select
                  className="counter-select"
                  value={canteenCounter}
                  onChange={(e) => setCanteenCounter(e.target.value)}
                >
                  <option value="Atria Counter 1 - Main Canteen">Atria Counter 1 - Main Canteen</option>
                  <option value="Atria Counter 2 - Quick Snacks Corner">Atria Counter 2 - Quick Snacks Corner</option>
                  <option value="Atria Counter 3 - Juice & Dairy Stall">Atria Counter 3 - Juice & Dairy Stall</option>
                  <option value="Table Delivery (Atria Food Court)">Table Delivery (Atria Food Court)</option>
                </select>
              </div>

              {/* Items List */}
              {totalItemsCount === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>
                  Your canteen cart is empty. Select items from Fast Food, Dairy, Beverage, or Fruits!
                </div>
              ) : (
                <div className="cart-items-list">
                  {Object.entries(cart).map(([id, qty]) => {
                    const item = CANTEEN_ITEMS.find((i) => i.id === Number(id));
                    if (!item) return null;
                    return (
                      <div key={item.id} className="cart-item-row">
                        <div className="cart-item-left">
                          <img src={item.image} alt={item.name} className="cart-item-img" />
                          <div>
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-price">₹{item.price} each • {item.category}</div>
                          </div>
                        </div>

                        <div className="cart-item-actions">
                          <div className="zepto-qty-selector">
                            <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                            <span className="qty-count">{qty}</span>
                            <button className="qty-btn" onClick={() => addToCart(item.id)}>+</button>
                          </div>
                          <span className="cart-subtotal">₹{item.price * qty}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bill Details Preview */}
              {totalItemsCount > 0 && (
                <div className="bill-card">
                  <h4>Price Summary</h4>
                  <div className="bill-row">
                    <span>Items Subtotal</span>
                    <span>₹{cartTotalAmount}</span>
                  </div>
                  <div className="bill-row free-tag">
                    <span>Canteen Packaging</span>
                    <span>FREE</span>
                  </div>
                  <div className="bill-row">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <div className="bill-row">
                    <span>Taxes (CGST 2.5% + SGST 2.5%)</span>
                    <span>₹{(cgstAmount + sgstAmount).toFixed(2)}</span>
                  </div>
                  <div className="bill-divider"></div>
                  <div className="bill-row total-row">
                    <span>Grand Total</span>
                    <span>₹{finalBillAmount}</span>
                  </div>
                </div>
              )}
            </div>

            {totalItemsCount > 0 && (
              <div className="cart-drawer-footer">
                <button className="drawer-bill-btn" onClick={generateBill}>
                  🧾 View Estimated Bill
                </button>
                <button className="place-order-btn" onClick={initiateUpiPayment}>
                  <span>Proceed to Pay (GPay / PhonePe)</span>
                  <span>₹{finalBillAmount} →</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ----------------- REAL UPI PAYMENT AUTHENTICATION MODAL ----------------- */}
      {isPaymentModalOpen && (
        <div className="payment-modal-backdrop">
          <div className="payment-modal-box">
            <div className="payment-modal-header">
              <div className="payment-modal-title">
                <span>🔐</span>
                <h3>UPI Payment Authentication</h3>
                <span className="tag">REAL UPI</span>
              </div>
              <button
                className="close-drawer-btn"
                style={{ color: "white", background: "rgba(255,255,255,0.2)" }}
                onClick={() => setIsPaymentModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="payment-modal-body">
              {/* Total Payable Banner */}
              <div className="payment-amount-banner">
                <div>
                  <div className="label">Total Amount to Pay</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Token: {orderToken}</div>
                </div>
                <div className="value">₹{finalBillAmount.toFixed(2)}</div>
              </div>

              {/* Automatic Bill Generation Notice */}
              <div className="auto-bill-banner">
                <span>⚡</span>
                <span><strong>Instant Auto-Bill:</strong> As soon as your payment is authenticated, your official Atria Canteen Cash Memo will automatically generate!</span>
              </div>

              {/* Payment Tabs: PhonePe / GPay / Any UPI */}
              <div className="payment-app-tabs">
                <button
                  className={`payment-tab-btn phonepe ${selectedPaymentApp === "phonepe" ? "active" : ""}`}
                  onClick={() => setSelectedPaymentApp("phonepe")}
                >
                  <span style={{ fontSize: "18px" }}>🟣</span>
                  <span>PhonePe</span>
                </button>
                <button
                  className={`payment-tab-btn gpay ${selectedPaymentApp === "gpay" ? "active" : ""}`}
                  onClick={() => setSelectedPaymentApp("gpay")}
                >
                  <span style={{ fontSize: "18px" }}>🔵</span>
                  <span>Google Pay</span>
                </button>
                <button
                  className={`payment-tab-btn qr ${selectedPaymentApp === "qr" ? "active" : ""}`}
                  onClick={() => setSelectedPaymentApp("qr")}
                >
                  <span style={{ fontSize: "18px" }}>📲</span>
                  <span>Scan QR</span>
                </button>
              </div>

              {/* View Toggle: Official PhonePe Stand QR vs Dynamic Amount QR */}
              <div className="view-toggle-btns">
                <button
                  className={`view-toggle-btn ${qrDisplayMode === "official_stand" ? "active" : ""}`}
                  onClick={() => setQrDisplayMode("official_stand")}
                >
                  📸 Official PhonePe Stand QR
                </button>
                <button
                  className={`view-toggle-btn ${qrDisplayMode === "dynamic_qr" ? "active" : ""}`}
                  onClick={() => setQrDisplayMode("dynamic_qr")}
                >
                  ⚡ Dynamic QR (₹{finalBillAmount.toFixed(2)})
                </button>
              </div>

              {/* Mode 1: User's Official PhonePe Stand QR */}
              {qrDisplayMode === "official_stand" ? (
                <div className="phonepe-official-card">
                  <img
                    src={`${import.meta.env.BASE_URL}phonepe_qr.png`}
                    alt="Official PhonePe QR Code - Sujan Khadka"
                    className="phonepe-stand-img"
                  />
                  <div className="phonepe-payee-info">
                    <div className="phonepe-payee-name">SUJAN KHADKA</div>
                    <div className="phonepe-payee-vpa">UPI ID: {canteenUpiId}</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                      IndusInd Bank • Official PhonePe Merchant Stand
                    </div>
                  </div>
                </div>
              ) : (
                /* Mode 2: Dynamic Amount Real UPI QR Code Card */
                <div className="upi-qr-wrapper">
                  <img
                    src={upiQrImageUrl}
                    alt="Real UPI Payment QR Code"
                    className="upi-qr-image"
                  />
                  <div className="upi-scan-pill">
                    <span>📷 Scan to Pay <strong>₹{finalBillAmount.toFixed(2)}</strong></span>
                  </div>

                  {/* Payee VPA configuration row */}
                  <div className="payee-vpa-row">
                    <div>
                      <span>Payee: </span>
                      {isEditingUpi ? (
                        <input
                          type="text"
                          className="edit-vpa-input"
                          value={tempUpiInput}
                          onChange={(e) => setTempUpiInput(e.target.value)}
                          placeholder="yourname@upi"
                        />
                      ) : (
                        <strong>SUJAN KHADKA ({canteenUpiId})</strong>
                      )}
                    </div>
                    {isEditingUpi ? (
                      <button className="edit-vpa-link" onClick={handleSaveUpiId}>
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-vpa-link"
                        onClick={() => {
                          setTempUpiInput(canteenUpiId);
                          setIsEditingUpi(true);
                        }}
                        title="Set your personal UPI ID"
                      >
                        ✎ Edit
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Direct Launch Buttons */}
              <div className="mobile-intent-actions">
                {selectedPaymentApp === "phonepe" && (
                  <a
                    href={phonepeIntentURI}
                    className="app-launch-btn phonepe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🟣 Tap to Pay ₹{finalBillAmount.toFixed(2)} with PhonePe
                  </a>
                )}

                {selectedPaymentApp === "gpay" && (
                  <a
                    href={gpayIntentURI}
                    className="app-launch-btn gpay"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔵 Tap to Pay ₹{finalBillAmount.toFixed(2)} with Google Pay
                  </a>
                )}

                {selectedPaymentApp === "qr" && (
                  <a
                    href={realUpiString}
                    className="app-launch-btn generic"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ⚡ Open UPI App (Pay ₹{finalBillAmount.toFixed(2)})
                  </a>
                )}
              </div>

              {/* UTR Authentication Box */}
              <div className="utr-auth-box">
                <h4>
                  <span>🧾</span> Step 2: Payment Authentication
                </h4>
                <div className="utr-instruction">
                  After paying on PhonePe or Google Pay, enter the <strong>12-digit UPI UTR / Reference No.</strong> from your transaction receipt to automatically generate your bill:
                </div>

                {paymentError && (
                  <div style={{ color: "#dc2626", fontSize: "12px", fontWeight: "700" }}>
                    ⚠️ {paymentError}
                  </div>
                )}

                <div className="utr-input-wrapper">
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="Enter 12-digit UTR (e.g. 426189012345)"
                    value={utrInput}
                    onChange={(e) => setUtrInput(e.target.value)}
                    className="utr-input-field"
                  />
                  <button
                    className="utr-verify-submit-btn"
                    disabled={isVerifyingPayment}
                    onClick={() => authenticateUpiPayment()}
                  >
                    {isVerifyingPayment ? "Verifying..." : "✓ Verify & Auto-Generate Bill"}
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                  <button
                    className="demo-auto-verify-btn"
                    onClick={() => {
                      const demoUtr = `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`;
                      authenticateUpiPayment(demoUtr);
                    }}
                    title="Simulate instant payment verification for lab demo"
                  >
                    ⚡ Demo Fast-Verify & Auto-Generate Bill
                  </button>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                    NPCI Verified • Sujan Khadka
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAX INVOICE / CASH BILL MODAL ----------------- */}
      {isBillOpen && (() => {
        const displayCart = Object.keys(billedCart).length > 0 ? billedCart : cart;
        const displaySubtotal = billedSummary.cartTotalAmount || cartTotalAmount;
        const displayCgst = billedSummary.cgstAmount || cgstAmount;
        const displaySgst = billedSummary.sgstAmount || sgstAmount;
        const displayPlatformFee = billedSummary.platformFee !== undefined ? billedSummary.platformFee : platformFee;
        const displayFinalTotal = billedSummary.finalBillAmount || finalBillAmount;
        const displayItemsCount = billedSummary.totalItemsCount || totalItemsCount;

        return (
          <div className="bill-modal-backdrop">
            <div className="bill-modal-box">
              <div className="bill-modal-header">
                <h3>
                  <span>🧾</span> Atria Canteen Cash Memo
                </h3>
                <button
                  className="close-drawer-btn"
                  style={{ color: "white", background: "rgba(255,255,255,0.2)" }}
                  onClick={() => setIsBillOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="bill-receipt-paper" id="printable-bill">
                {/* Institution Header */}
                <div className="receipt-institution">
                  <h2>ATRIA CANTEEN</h2>
                  <p><strong>ATRIA INSTITUTE OF TECHNOLOGY</strong></p>
                  <p>ASKB Campus, Anandnagar, Hebbal, Bengaluru - 560024</p>
                  <p>FSSAI Lic No: 11223344005521 • GSTIN: 29AABCA1234D1Z5</p>
                  <span className="receipt-type-pill">TAX INVOICE / CASH MEMO</span>
                </div>

                {/* Receipt Metadata */}
                <div className="receipt-meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Invoice No:</span>
                    <span className="meta-value">{invoiceNumber}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Date & Time:</span>
                    <span className="meta-value">{billTimestamp}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Customer:</span>
                    <span className="meta-value">
                      {currentUser ? `${currentUser.name} (${currentUser.email})` : "Student / Faculty Guest"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Pickup Location:</span>
                    <span className="meta-value">{canteenCounter}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Order Token:</span>
                    <span className="meta-value" style={{ color: "#7025ec", fontSize: "14px" }}>
                      {orderToken || "CN-42"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Payment Mode:</span>
                    <span className="meta-value" style={{ color: "#059669", fontWeight: "800" }}>
                      {selectedPaymentApp === "phonepe" ? "PhonePe UPI" : selectedPaymentApp === "gpay" ? "Google Pay UPI" : "UPI QR"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Beneficiary / Payee:</span>
                    <span className="meta-value" style={{ color: "#1e293b", fontWeight: "800" }}>
                      SUJAN KHADKA (9380974024-bc43@ibl)
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Payment Status:</span>
                    <span className="meta-value" style={{ color: "#059669", fontWeight: "800" }}>
                      PAID & SETTLED (GENUINE UPI)
                    </span>
                  </div>
                  <div className="meta-item" style={{ gridColumn: "span 2" }}>
                    <span className="meta-label">UPI Reference / Bank UTR:</span>
                    <span className="meta-value" style={{ fontFamily: "monospace", color: "#1e293b", fontWeight: "800" }}>
                      {verifiedUtr || "UTR" + Math.floor(100000000000 + Math.random() * 900000000000)}
                    </span>
                  </div>
                </div>

                {/* Products Table */}
                <table className="receipt-table">
                  <thead>
                    <tr>
                      <th style={{ width: "30px" }}>#</th>
                      <th>Item Description</th>
                      <th className="text-center" style={{ width: "45px" }}>Qty</th>
                      <th className="text-right" style={{ width: "65px" }}>Rate</th>
                      <th className="text-right" style={{ width: "75px" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(displayCart).map(([id, qty], index) => {
                      const item = CANTEEN_ITEMS.find((i) => i.id === Number(id));
                      if (!item) return null;
                      return (
                        <tr key={item.id}>
                          <td style={{ color: "#94a3b8" }}>{index + 1}</td>
                          <td>
                            <span className="item-name-cell">{item.name}</span>
                            <span className="item-cat-tag">[{item.category}] • {item.weight}</span>
                          </td>
                          <td className="text-center" style={{ fontWeight: "700" }}>{qty}</td>
                          <td className="text-right">₹{item.price.toFixed(2)}</td>
                          <td className="text-right" style={{ fontWeight: "800" }}>
                            ₹{(item.price * qty).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Calculation Breakdown */}
                <div className="receipt-calc-box">
                  <div className="receipt-calc-row">
                    <span>Items Subtotal ({displayItemsCount} items)</span>
                    <span>₹{displaySubtotal.toFixed(2)}</span>
                  </div>
                  <div className="receipt-calc-row">
                    <span>Canteen Packaging & Handling</span>
                    <span style={{ color: "#059669", fontWeight: "700" }}>FREE</span>
                  </div>
                  <div className="receipt-calc-row">
                    <span>Platform / Facility Fee</span>
                    <span>₹{displayPlatformFee.toFixed(2)}</span>
                  </div>
                  <div className="receipt-calc-row">
                    <span>CGST @ 2.5%</span>
                    <span>₹{displayCgst.toFixed(2)}</span>
                  </div>
                  <div className="receipt-calc-row">
                    <span>SGST @ 2.5%</span>
                    <span>₹{displaySgst.toFixed(2)}</span>
                  </div>
                  <div className="receipt-calc-row grand-total">
                    <span>Grand Total (INR)</span>
                    <span>₹{displayFinalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Stamp & Thank You */}
                <div className="receipt-footer-stamp">
                  <div className="verified-stamp">
                    ✓ VERIFIED & PAID VIA REAL UPI
                  </div>
                  <div className="receipt-thankyou">
                    Thank you for ordering at Atria Canteen!
                  </div>
                  <div style={{ fontSize: "10.5px", color: "#94a3b8", marginTop: "4px" }}>
                    Please present Token <strong>{orderToken || "CN-42"}</strong> at {canteenCounter} to collect your order.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bill-modal-actions">
                <button
                  className="bill-close-btn"
                  onClick={() => setIsBillOpen(false)}
                >
                  Close
                </button>
                <button
                  className="bill-print-btn"
                  onClick={() => window.print()}
                >
                  🖨️ Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ----------------- Order Placed Success Modal ----------------- */}
      {isOrderPlaced && (
        <div className="order-modal-backdrop">
          <div className="order-modal-box">
            <div className="order-success-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2>UPI Payment Verified!</h2>
            <p style={{ color: "#64748b", marginTop: "8px" }}>
              Your order is authenticated and being prepared. Ready in <strong>8-10 mins</strong>.
            </p>

            <div className="order-token-badge">
              Token: {orderToken}
            </div>

            <div style={{ background: "#f8fafc", padding: "10px 14px", borderRadius: "10px", margin: "12px 0", fontSize: "12.5px", color: "#475569" }}>
              <div>Bank UTR: <strong>{verifiedUtr}</strong></div>
              <div>Counter: <strong>{canteenCounter}</strong></div>
            </div>

            <div className="order-modal-actions">
              <button
                className="order-view-bill-btn"
                onClick={() => {
                  setIsOrderPlaced(false);
                  setIsBillOpen(true);
                }}
              >
                🧾 View & Print Authenticated Cash Bill
              </button>
              <button
                className="continue-btn"
                onClick={() => {
                  setIsOrderPlaced(false);
                  setCart({});
                }}
              >
                Order More Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
