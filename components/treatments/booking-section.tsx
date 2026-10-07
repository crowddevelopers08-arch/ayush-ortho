import { bookingFeeRupees } from "@/lib/razorpay";
import BookingForm from "./booking-form";

export default function BookingSection() {
  return (
    <section className="bg-white px-4 py-9 sm:px-6 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1240px]">
        <BookingForm bookingFee={bookingFeeRupees()} />
      </div>
    </section>
  );
}
