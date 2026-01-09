// lib/booking/calculateBookingPrice.js

export function calculateBookingPrice({
  roomType,
  checkIn,
  checkOut,
  adults = 1,
  children = 0,
  rooms = 1,
}) {
  if (!roomType) {
    throw new Error("Room type is required");
  }

  if (!checkIn || !checkOut) {
    throw new Error("Check-in and check-out dates are required");
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const nights = Math.ceil((checkOutDate - checkInDate) / MS_PER_DAY);

  if (nights <= 0) {
    throw new Error("Invalid date range");
  }

  const totalGuests = adults + children;

  const { basePrice, maxGuests, maxGuestsWithExtra, extraGuestPricing } =
    roomType;

  const baseGuestsCapacity = maxGuests * rooms;
  const hardLimitCapacity = maxGuestsWithExtra * rooms;

  if (totalGuests > hardLimitCapacity) {
    return {
      valid: false,
      reason: "EXCEEDS_MAX_CAPACITY",
      suggestedRooms: Math.ceil(totalGuests / maxGuestsWithExtra),
    };
  }

  const basePriceTotal = basePrice * nights * rooms;

  let extraAdults = 0;
  let extraChildren = 0;

  if (totalGuests > baseGuestsCapacity) {
    const extraGuests = totalGuests - baseGuestsCapacity;

    // Adults take priority
    extraAdults = Math.min(extraGuests, adults - baseGuestsCapacity);
    extraChildren = extraGuests - extraAdults;
  }

  const adultExtraPerNight = (basePrice * extraGuestPricing.adultPercent) / 100;

  const childExtraPerNight = (basePrice * extraGuestPricing.childPercent) / 100;

  const extraAdultCost = adultExtraPerNight * extraAdults * nights;

  const extraChildCost = childExtraPerNight * extraChildren * nights;

  const totalExtraGuestCost = extraAdultCost + extraChildCost;

  const totalPrice = basePriceTotal + totalExtraGuestCost;

  return {
    valid: true,

    nights,
    rooms,

    guests: {
      adults,
      children,
      total: totalGuests,
    },

    pricing: {
      basePricePerNight: basePrice,
      basePriceTotal,

      extraGuests: {
        adults: extraAdults,
        children: extraChildren,
      },

      extraGuestCharges: {
        adultPerNight: adultExtraPerNight,
        childPerNight: childExtraPerNight,
        totalExtraGuestCost,
      },

      totalPrice,
    },
  };
}
