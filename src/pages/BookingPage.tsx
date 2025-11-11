import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import {
  ArrowLeft,
  Users,
  CreditCard,
  Star,
  MapPin,
  Tag,
  Clock,
  Calendar as CalendarIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedRoom } = location.state || {};

  const [step, setStep] = useState(1);
  const [dates, setDates] = useState<DateRange | undefined>(undefined);

  // changed: include contact info array for adults
  const [guests, setGuests] = useState<{
    adults: number;
    children: number;
    contacts: { name: string; email: string; phone: string }[];
  }>({
    adults: 1,
    children: 0,
    contacts: [{ name: "", email: "", phone: "" }],
  });

  // added: breakfast option
  const [breakfastSelected, setBreakfastSelected] = useState(false);

  // derive breakfast price per person from selectedRoom.labels when possible
  const getBreakfastPricePerPerson = () => {
    const DEFAULT = 250;
    const labels = selectedRoom?.labels;
    if (!labels || !labels.length) return DEFAULT;

    const findByLabel = (regex: RegExp) =>
      labels.find((l: any) => regex.test(String(l.label || "")));

    const standardLabel =
      findByLabel(/standard/i) || labels[0];
    const breakfastLabel =
      findByLabel(/breakfast/i) || labels[1];

    const parsePrice = (p: any) =>
      parseInt(String(p ?? "").replace(/[^0-9]/g, "")) || 0;

    const std = parsePrice(standardLabel?.price);
    const withBreakfast = parsePrice(breakfastLabel?.price);

    const diff = withBreakfast - std;
    return diff > 0 ? diff : DEFAULT;
  };

  const steps = [
    { number: 1, title: "Select Dates", icon: CalendarIcon },
    { number: 2, title: "Guest Details", icon: Users },
    { number: 3, title: "Review & Pay", icon: CreditCard },
  ];

  // Helper: currency formatting
  const formatCurrency = (v: number) =>
    `₹${v.toLocaleString("en-IN")}`;

  // Helper: small date range label
  const formatDateRange = (from?: Date, to?: Date) => {
    if (!from) return "Select dates";
    if (!to) return from.toDateString();
    return `${from.toDateString()} → ${to.toDateString()}`;
  };

  // replace the existing handleDateSelect with a tolerant normalizer
  const handleDateSelect = (selection: any) => {
    // clear selection
    if (!selection) {
      setDates(undefined);
      return;
    }

    // DayPicker may return a single Date when first click happens
    if (selection instanceof Date) {
      setDates({ from: selection, to: undefined });
      return;
    }

    // DayPicker may return an array [from, to]
    if (Array.isArray(selection)) {
      const [from, to] = selection as (Date | undefined)[];
      setDates({ from: from ?? undefined, to: to ?? undefined });
      return;
    }

    // DayPicker may return an object with from/to (DateRange)
    if (selection?.from || selection?.to) {
      setDates(selection as DateRange);
      return;
    }

    // fallback
    setDates(undefined);
  };

  // Helper: return array of nights (dates) from `from` (inclusive) to `to` (exclusive)
  const getDatesInRange = (from: Date, to: Date) => {
    const nights: Date[] = [];
    const cur = new Date(from);
    while (cur < to) {
      nights.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return nights;
  };

  // Helper: normalize a date to YYYY-MM-DD for lookup
  const formatDateKey = (d: Date) => d.toISOString().slice(0, 10);

  // Helper: get price for a particular night (falls back to base price)
  const getNightPrice = (date: Date) => {
    const basePrice =
      parseInt(
        String(selectedRoom?.labels?.[0]?.price ?? "").replace(/[^0-9]/g, "")
      ) || 0;

    const rates: any[] | undefined = selectedRoom?.nightlyRates;
    if (!rates || !rates.length) return basePrice;

    const key = formatDateKey(date);

    const match = rates.find((r: any) => {
      // support common shapes: r.date, r.day, r.dateKey
      const rDate = r?.date ?? r?.day ?? r?.dateKey;
      if (!rDate) return false;
      try {
        const rKey = new Date(rDate).toISOString().slice(0, 10);
        if (rKey === key) return true;
      } catch {
        /* ignore parse errors */
      }
      // direct string match (if stored already as YYYY-MM-DD)
      if (String(rDate) === key) return true;
      return false;
    });

    if (!match) return basePrice;

    const priceVal = match.price ?? match.rate ?? match.amount ?? match.value;
    return parseInt(String(priceVal).replace(/[^0-9]/g, "")) || basePrice;
  };

  // Updated calculateTotal: sums each night's price individually + optional breakfast cost
  const calculateTotal = () => {
    if (!dates?.from || !dates?.to) return 0;
    const nights = getDatesInRange(dates.from, dates.to);
    const baseTotal = nights.reduce((sum, night) => sum + getNightPrice(night), 0);

    if (!breakfastSelected) return baseTotal;

    const pax = (guests.adults || 0) + (guests.children || 0);
    const perPerson = getBreakfastPricePerPerson();
    const breakfastTotal = nights.length * pax * perPerson;
    return baseTotal + breakfastTotal;
  };

  // Safe defaults
  const roomTitle = selectedRoom?.title ?? "Premium Room";
  const roomImage = selectedRoom?.image ?? "/placeholder-room.jpg";
  const roomFeatures = selectedRoom?.features ?? "Beautiful stay with modern amenities";
  const rating = selectedRoom?.rating ?? 4.6;
  const locationText = selectedRoom?.location ?? "Near city center";

  // helper to ensure contacts array length matches adults count
  const ensureContacts = (adults: number, contacts: { name: string; email: string; phone: string }[]) => {
    const out = contacts.slice(0, adults);
    while (out.length < adults) out.push({ name: "", email: "", phone: "" });
    return out;
  };

  // simple validation for step 2 guest info: require contact for each adult
  const isStep2Valid = () => {
    if (guests.adults < 1) return false;
    if (!Array.isArray(guests.contacts)) return false;
    if (guests.contacts.length !== guests.adults) return false;
    for (let i = 0; i < guests.contacts.length; i++) {
      const c = guests.contacts[i];
      if (!c.name?.trim()) return false;
      if (!/\S+@\S+\.\S+/.test(c.email)) return false;
      if (c.phone?.trim().length < 7) return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f7fb] via-white to-[#fff8f2] text-slate-800">
      {/* Top bar */}
      <header className="bg-transparent">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition"
          >
            <div className="p-2 rounded-full bg-white shadow">
              <ArrowLeft size={18} />
            </div>
            <div>
              <div className="text-sm font-medium">Back</div>
              <div className="text-xs text-slate-500">to rooms</div>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md shadow-md border border-white/30">
              <Star className="text-amber-400" size={16} />
              <div className="text-sm font-semibold">{rating}</div>
              <div className="text-xs text-slate-500 ml-2">· {locationText}</div>
            </div>
            <button
              onClick={() => {}}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#06b6d4] to-[#0ea5a4] text-white font-semibold shadow-xl hover:scale-105 transform transition"
            >
              Save
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-white to-[#fcf9f3] shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <div className="lg:col-span-2 flex gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="w-2/5 rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="relative w-full h-full">
                <img src={roomImage} alt={roomTitle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-cyan-400">
                {roomTitle}
              </h1>
              <p className="mt-2 text-sm text-slate-600">{roomFeatures}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm text-sm">
                  <MapPin size={16} className="text-slate-500" /> <span className="text-slate-600">{locationText}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm text-sm">
                  <Star size={16} className="text-amber-400" /> <span className="text-slate-600">{rating}</span>
                </div>
                {selectedRoom?.tags?.slice?.(0,2)?.map((t: string, idx: number) => (
                  <div key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-violet-50 to-indigo-50 text-indigo-700 text-sm shadow-sm">
                    <Tag size={14} /> {t}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-6">
                <div className="text-sm text-slate-600 bg-white/60 p-3 rounded-lg shadow-inner">
                  <div className="font-medium">Guests</div>
                  <div className="mt-1">
                    {guests.contacts && guests.contacts[0] && guests.contacts[0].name ? (
                      <>
                        <div className="font-medium">{guests.contacts[0].name}</div>
                        {guests.contacts[0].email && <div className="text-xs text-slate-400">{guests.contacts[0].email}</div>}
                        {guests.contacts[0].phone && <div className="text-xs text-slate-400">{guests.contacts[0].phone}</div>}
                        <div className="text-xs text-slate-400 mt-1">{guests.adults} adults · {guests.children} children</div>
                      </>
                    ) : (
                      <div>{guests.adults} adults · {guests.children} children</div>
                    )}
                  </div>
                </div>

                <div className="text-sm text-slate-600 bg-white/60 p-3 rounded-lg shadow-inner">
                  <div className="font-medium">Stay</div>
                  <div className="mt-1">{formatDateRange(dates?.from, dates?.to)}</div>
                </div>

                <div className="text-sm text-slate-600 bg-gradient-to-r from-white to-[#fff7ed] p-3 rounded-lg shadow-inner">
                  <div className="font-medium">Total</div>
                  <div className="text-lg font-bold">{formatCurrency(calculateTotal())}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="p-4 rounded-xl bg-white/80 backdrop-blur-md shadow-2xl border border-white/30 lg:sticky lg:top-28">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                <img src={roomImage} alt={roomTitle} className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold">{roomTitle}</div>
                <div className="text-sm text-slate-500">{selectedRoom?.labels?.[0]?.price ?? "₹0"}/night</div>
              </div>
            </div>

            <div className="mt-4 border-t pt-4 space-y-4">
              <div>
                <div className="text-xs text-slate-500">When</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-sm font-medium">{formatDateRange(dates?.from, dates?.to)}</div>
                  <button onClick={() => setStep(1)} className="text-xs text-sky-600 hover:underline">Change</button>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Guests</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-sm">
                    {guests.contacts && guests.contacts[0] && guests.contacts[0].name ? (
                      <div>
                        <div className="font-medium">{guests.contacts[0].name}</div>
                        <div className="text-xs text-slate-400">{guests.adults} adults · {guests.children} children</div>
                      </div>
                    ) : (
                      <div className="text-sm">{guests.adults} adults · {guests.children} children</div>
                    )}
                  </div>
                  <button onClick={() => setStep(2)} className="text-xs text-sky-600 hover:underline">Edit</button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" checked={breakfastSelected} onChange={(e) => setBreakfastSelected(e.target.checked)} className="w-4 h-4 rounded border-gray-300" />
                  <span>Breakfast at <span className="font-semibold">{formatCurrency(getBreakfastPricePerPerson())}</span> / person / night</span>
                </label>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-inner">
                <div className="flex justify-between text-sm text-slate-600">
                  <div>Base rate</div>
                  <div>{selectedRoom?.labels?.[0]?.price ?? "-"}</div>
                </div>

                {dates?.from && dates?.to && (
                  <div className="mt-2 space-y-1 text-sm">
                    {getDatesInRange(dates.from, dates.to).map((d) => (
                      <div key={d.toISOString()} className="flex justify-between">
                        <div className="text-slate-600">{d.toDateString().slice(4, 10)}</div>
                        <div className="font-medium">{formatCurrency(getNightPrice(d))}</div>
                      </div>
                    ))}

                    {breakfastSelected && (
                      <div className="mt-2 border-t pt-2">
                        <div className="flex justify-between text-sm">
                          <span>Breakfast / night ({(guests.adults + guests.children) || 0} pax)</span>
                          <span className="font-medium">{formatCurrency(getBreakfastPricePerPerson() * ((guests.adults || 0) + (guests.children || 0)))}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Added each night</div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t flex justify-between items-center">
                  <div className="text-sm text-slate-600">Total</div>
                  <div className="text-xl font-bold text-slate-900">{formatCurrency(calculateTotal())}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (step < 3) setStep(step + 1);
                  else {
                    // Handle booking submission
                  }
                }}
                disabled={
                  (step === 1 && (!dates || !dates.from || !dates.to)) ||
                  (step === 2 && !isStep2Valid())
                }
                className="w-full mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#ff7a18] via-[#ffb347] to-[#f59e0b] text-white font-semibold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[-2px] transform transition"
              >
                {step === 3 ? "Confirm & Pay" : "Continue"}
              </button>

              <div className="mt-3 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <Clock size={14} /> Instant confirmation
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={14} /> Free cancellation up to 24 hrs
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Main booking grid (calendar + form) */}
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar & steps */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-slate-500">Booking step</div>
                    <div className="text-lg font-semibold">Step {step} · {steps[step-1]?.title}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {steps.map((s, i) => (
                      <div key={i} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${step === s.number ? "bg-gradient-to-r from-sky-600 to-cyan-400 text-white shadow-md" : "bg-slate-100 text-slate-600"}`}>
                        {/* icon + title */}
                        <s.icon size={14} />
                        <span>{s.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Select Your Dates</h2>
                    <div className="rounded-lg border p-4 bg-gradient-to-br from-white to-slate-50 shadow-sm">
                      <DatePicker
                        mode="range"
                        selected={dates}
                        onSelect={handleDateSelect}
                        className="rounded-md bg-white"
                        numberOfMonths={2}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Guest Information</h2>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700" htmlFor="adults">
                              Number of Adults
                            </label>
                            <select
                              id="adults"
                              title="Number of Adults"
                              aria-label="Number of Adults"
                              value={guests.adults}
                              onChange={(e) => {
                                const newAdults = parseInt(e.target.value);
                                setGuests((prev) => ({
                                  ...prev,
                                  adults: newAdults,
                                  contacts: ensureContacts(newAdults, prev.contacts),
                                }));
                              }}
                              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-sky-400 focus:ring-sky-200"
                            >
                              {[1, 2, 3, 4].map((num) => (
                                <option key={num} value={num}>
                                  {num} {num === 1 ? "Adult" : "Adults"}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-700" htmlFor="children">
                              Children (0-12 years)
                            </label>
                            <select
                              id="children"
                              title="Number of Children"
                              aria-label="Number of Children"
                              value={guests.children}
                              onChange={(e) =>
                                setGuests({ ...guests, children: parseInt(e.target.value) })
                              }
                              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-sky-400 focus:ring-sky-200"
                            >
                              {[0, 1, 2].map((num) => (
                                <option key={num} value={num}>
                                  {num} {num === 1 ? "Child" : "Children"}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* new: per-adult contact fields */}
                        <div className="grid grid-cols-1 gap-4">
                          {guests.contacts.map((c, idx) => (
                            <div key={idx} className="p-3 rounded-md bg-white border">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-medium">Guest {idx + 1} details {idx === 0 ? "(Primary)" : ""}</div>
                                <div className="text-xs text-slate-400">Adult</div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-sm font-medium text-slate-700" htmlFor={`guest-name-${idx}`}>Full name</label>
                                  <input
                                    id={`guest-name-${idx}`}
                                    value={c.name}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setGuests((prev) => {
                                        const contacts = prev.contacts.slice();
                                        contacts[idx] = { ...contacts[idx], name: val };
                                        return { ...prev, contacts };
                                      });
                                    }}
                                    placeholder="Full name"
                                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 focus:border-sky-400 focus:ring-sky-200"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-slate-700" htmlFor={`guest-email-${idx}`}>Email</label>
                                  <input
                                    id={`guest-email-${idx}`}
                                    value={c.email}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setGuests((prev) => {
                                        const contacts = prev.contacts.slice();
                                        contacts[idx] = { ...contacts[idx], email: val };
                                        return { ...prev, contacts };
                                      });
                                    }}
                                    placeholder="name@example.com"
                                    type="email"
                                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 focus:border-sky-400 focus:ring-sky-200"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-slate-700" htmlFor={`guest-phone-${idx}`}>Contact Number</label>
                                  <input
                                    id={`guest-phone-${idx}`}
                                    value={c.phone}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setGuests((prev) => {
                                        const contacts = prev.contacts.slice();
                                        contacts[idx] = { ...contacts[idx], phone: val };
                                        return { ...prev, contacts };
                                      });
                                    }}
                                    placeholder="+91 98765 43210"
                                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 focus:border-sky-400 focus:ring-sky-200"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Review & Payment</h2>
                    {/* Per-night breakdown */}
                    {dates?.from && dates?.to ? (
                      <div className="mb-4">
                        <h3 className="font-medium mb-2">Per-night breakdown</h3>
                        <div className="space-y-2 text-sm bg-slate-50 p-4 rounded-lg">
                          {getDatesInRange(dates.from, dates.to).map((d) => (
                            <div key={d.toISOString()} className="flex justify-between">
                              <span>{d.toDateString()}</span>
                              <span className="font-medium">{formatCurrency(getNightPrice(d))}</span>
                            </div>
                          ))}

                          {breakfastSelected && (
                            <div className="mt-2 border-t pt-2">
                              <div className="flex justify-between text-sm">
                                <span>Breakfast / night ({(guests.adults + guests.children) || 0} pax)</span>
                                <span className="font-medium">{formatCurrency(getBreakfastPricePerPerson() * ((guests.adults || 0) + (guests.children || 0)))}</span>
                              </div>
                              <div className="text-xs text-slate-400 mt-1">Added each night</div>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                          <span>Total</span>
                          <span>{formatCurrency(calculateTotal())}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">Select dates to view breakdown.</p>
                    )}

                    {/* Add payment form here */}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar in grid (kept as placeholder to preserve layout) */}
            <div className="lg:col-span-1">
              {/* small placeholder to keep spacing; main booking CTA is in hero's aside */}
              <div className="bg-white rounded-xl p-6 shadow-sm text-center text-slate-500">
                Booking summary available above.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
