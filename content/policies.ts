export interface Policy {
  key: "cancellation" | "conduct";
  shortLabel: string;
  title: string;
  paragraphs: string[];
}

export const policies: Record<Policy["key"], Policy> = {
  cancellation: {
    key: "cancellation",
    shortLabel: "Cancellation Policy",
    title: "Cancellation Policy",
    paragraphs: [
      "Clients are required to respect the time and commitment of our therapists. Any last-minute cancellation, refusal upon arrival, or unjustified rejection of a therapist will incur a mandatory cancellation fee of IDR 50,000, payable directly to the assigned therapist as compensation.",
      "Failure to fulfill this obligation may result in restriction from future bookings and further action where applicable."
    ]
  },
  conduct: {
    key: "conduct",
    shortLabel: "Professional Conduct",
    title: "Professional Conduct & Booking Policy",
    paragraphs: [
      "Our services are strictly professional wellness and therapeutic treatments, delivered by trained and certified therapists. We do not provide, promote, or tolerate any form of inappropriate or adult-oriented services.",
      "Any behavior, request, or expectation that falls outside the scope of professional massage therapy will result in immediate termination of the session and may be subject to further action.",
      "We uphold a respectful and inclusive environment for all of our therapists. Discrimination, inappropriate comments, or refusal of service based on personal expectations unrelated to professional standards will not be tolerated."
    ]
  }
};
