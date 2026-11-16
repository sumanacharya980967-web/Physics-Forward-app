import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Course, PaymentOrder } from '../../types';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  QrCode,
  CreditCard,
  Building2,
  ShieldCheck,
  Tag,
  Phone,
  ArrowRight,
  Download
} from 'lucide-react';

interface EnrollmentModalProps {
  course: Course;
  onClose: () => void;
  onSuccess: (order: PaymentOrder) => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  course,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cash'>('upi');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PaymentOrder | null>(null);

  const finalAmount = Math.max(0, course.price - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponError('');
    try {
      const res = await api.validateCoupon(couponCode);
      if (res.valid && res.coupon) {
        const disc = Math.round((course.price * res.coupon.discountPercent) / 100);
        setDiscountAmount(disc);
        setCouponApplied(true);
      } else {
        setCouponError(t('অবৈধ কুপন কোড!', 'Invalid coupon code!'));
      }
    } catch (e) {
      setCouponError('Error verifying coupon');
    }
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    try {
      const res = await api.createOrder({
        studentId: user?.id || 'user-student-rahul',
        studentName: user?.name || 'Rahul Das',
        courseId: course.id,
        courseTitle: course.titleBn || course.title,
        amount: finalAmount,
        discountAmount: discountAmount,
        couponCode: couponApplied ? couponCode : undefined,
        paymentMethod: paymentMethod.toUpperCase()
      });

      if (res.success && res.order) {
        setCompletedOrder(res.order);
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        onSuccess(res.order);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-neutral-900">
              {t('পেমেন্ট ও এনরোলমেন্ট সফল হয়েছে! 🎉', 'Enrollment Confirmed! 🎉')}
            </h3>
            <p className="text-xs text-neutral-500">
              {t('তোমার ব্যাচে যোগদান সম্পন্ন হয়েছে। ক্লাসের সময়সূচী ড্যাশবোর্ডে দৃশ্যমান।', 'You have been enrolled into the batch. Class schedule is now active in your dashboard.')}
            </p>
          </div>

          {/* Receipt Details */}
          <div className="bg-neutral-50 rounded-2xl p-4 text-left text-xs border border-neutral-200 space-y-2 font-mono">
            <div className="flex justify-between">
              <span className="text-neutral-500">Invoice No:</span>
              <span className="font-bold text-neutral-900">{completedOrder.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Transaction ID:</span>
              <span className="text-neutral-800">{completedOrder.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Course:</span>
              <span className="text-neutral-800">{completedOrder.courseTitle}</span>
            </div>
            <div className="flex justify-between text-sm font-sans font-black text-neutral-900 pt-2 border-t border-neutral-200">
              <span>Paid Amount:</span>
              <span className="text-[#FF9933]">₹{completedOrder.amount}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                const receiptContent = `=========================================
PHYSICS FORWARD - OFFICIAL INVOICE RECEIPT
Website: https://physicsforward.in
Contact / Helpline: +91 8972263462
Email: suman.acharya.980967@outlook.com
Contai, Purba Medinipur, West Bengal
=========================================

Invoice No    : ${completedOrder.invoiceNumber}
Transaction ID: ${completedOrder.transactionId}
Student Name  : ${completedOrder.studentName}
Course Name   : ${completedOrder.courseTitle}
Payment Mode  : ${completedOrder.paymentMethod}
Amount Paid   : INR ${completedOrder.amount}/-
Status        : SUCCESSFUL & ENROLLED
Issued Date   : ${new Date().toLocaleDateString('en-IN')}

=========================================
Thank you for joining PHYSICS FORWARD!
Understand Physics. Move Forward.
=========================================`;

                const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Invoice-${completedOrder.invoiceNumber}.txt`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
              className="w-full py-3 rounded-xl border border-neutral-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors"
            >
              <Download className="w-4 h-4 text-[#FF9933]" />
              <span>{t('ইনভয়েস রসিদ ডাউনলোড করো (.txt)', 'Download Official Receipt')}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all shadow-sm"
            >
              {t('ড্যাশবোর্ডে ক্লাস শুরু করুন', 'Go to My Dashboard')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-4 sm:p-7 border border-neutral-200 shadow-2xl space-y-5 sm:space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2.5 py-0.5 rounded-full">
              Course Enrollment
            </span>
            <h3 className="text-lg font-black text-neutral-900 mt-1">
              {course.titleBn || course.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Summary */}
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2 text-xs">
          <div className="flex justify-between text-neutral-600">
            <span>{t('সাধারণ কোর্স ফি:', 'Course Fee:')}</span>
            <span className="line-through">₹{course.originalPrice}</span>
          </div>
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>{t('প্রাথমিক বিশেষ ছাড়:', 'Launch Discount:')}</span>
            <span>-₹{course.originalPrice - course.price}</span>
          </div>
          {couponApplied && (
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>{t(`কুপন কোড (${couponCode}):`, `Coupon (${couponCode}):`)}</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-200">
            <span>{t('মোট প্রদেয় অর্থ (Net Payable):', 'Net Payable:')}</span>
            <span className="text-xl text-[#FF9933]">₹{finalAmount}</span>
          </div>
        </div>

        {/* Coupon Code Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-neutral-700">
            {t('ডিসকাউন্ট কুপন আছে? (যেমন: FORWARD50)', 'Have a Coupon Code? (Try: FORWARD50)')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={e => setCouponCode(e.target.value.toUpperCase())}
              placeholder="FORWARD50"
              disabled={couponApplied}
              className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 text-xs uppercase font-mono focus:outline-none focus:border-[#FF9933] disabled:opacity-50"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={couponApplied}
              className="px-4 py-2 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-black disabled:opacity-40"
            >
              {couponApplied ? t('প্রযুক্ত', 'Applied') : t('কুপন প্রয়োগ', 'Apply')}
            </button>
          </div>
          {couponError && <p className="text-xs text-red-600 font-semibold">{couponError}</p>}
          {couponApplied && <p className="text-xs text-emerald-700 font-bold">{t('কুপন সফলভাবে প্রয়োগ করা হয়েছে!', 'Coupon applied successfully!')}</p>}
        </div>

        {/* Payment Methods Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-neutral-700">
            {t('পেমেন্ট মাধ্যম নির্বাচন করুন (Payment Option):', 'Select Payment Option:')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`p-3 rounded-xl border font-bold flex items-center gap-2 transition-all ${
                paymentMethod === 'upi'
                  ? 'border-[#FF9933] bg-orange-50/50 text-neutral-900'
                  : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <QrCode className="w-4 h-4 text-[#FF9933]" />
              <span>UPI / QR / GPay</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-xl border font-bold flex items-center gap-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-[#FF9933] bg-orange-50/50 text-neutral-900'
                  : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#FF9933]" />
              <span>Card / Debit / Credit</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('netbanking')}
              className={`p-3 rounded-xl border font-bold flex items-center gap-2 transition-all ${
                paymentMethod === 'netbanking'
                  ? 'border-[#FF9933] bg-orange-50/50 text-neutral-900'
                  : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#FF9933]" />
              <span>Net Banking</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('cash')}
              className={`p-3 rounded-xl border font-bold flex items-center gap-2 transition-all ${
                paymentMethod === 'cash'
                  ? 'border-[#FF9933] bg-orange-50/50 text-neutral-900'
                  : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <Phone className="w-4 h-4 text-[#FF9933]" />
              <span>Contai Center / Cash</span>
            </button>
          </div>
        </div>

        {/* UPI Details preview */}
        {paymentMethod === 'upi' && (
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-center space-y-2">
            <p className="text-xs font-semibold text-neutral-700">
              {t('স্ক্যান করে পেমেন্ট সম্পন্ন করো অথবা ইউপিআই আইডি ব্যবহার করো', 'Scan QR code or use official UPI')}
            </p>
            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border border-neutral-300 flex items-center justify-center">
              <QrCode className="w-24 h-24 text-neutral-800" />
            </div>
            <p className="text-xs font-mono font-bold text-neutral-900">
              physicsforward@upi • 8972263462
            </p>
          </div>
        )}

        {/* Submit / Pay Button */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleProcessPayment}
            className="w-full py-3.5 bg-[#FF9933] text-black font-black text-sm rounded-xl hover:bg-[#ffaa55] transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>
              {isProcessing
                ? t('প্রসেসিং হচ্ছে...', 'Processing Payment...')
                : t(`₹${finalAmount} টাকা পেমেন্ট নিশ্চিত করো`, `Confirm Payment & Enroll (₹${finalAmount})`)}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-center text-[11px] text-neutral-400 mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('নিরাপদ ও নির্ভরযোগ্য পেমেন্ট গেটওয়ে • তৎক্ষণাৎ রসিদ প্রদান', 'Secure 256-bit encrypted checkout with instant invoice')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
