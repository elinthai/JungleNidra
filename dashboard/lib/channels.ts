export interface ChannelConfig {
  slug: string;
  name: string;
  identity: {
    showsFace: boolean;
    showsName: boolean;
    anonymityRules?: string;
  };
  voice: {
    type: "elevenlabs-cloned" | "live-on-camera" | "TBD";
    notes?: string;
  };
  brand: {
    palette: { label: string; color: string; usage?: string }[];
    imageryNotes?: string;
    typography?: string;
  };
}

export const CHANNELS: ChannelConfig[] = [
  {
    slug: "jungle-nidra",
    name: "Jungle Nidra",
    identity: {
      showsFace: false,
      showsName: false,
      anonymityRules: "No face, no name, no cross-brand references to Eli's other businesses.",
    },
    voice: { type: "elevenlabs-cloned" },
    brand: {
      palette: [
        { label: "Deep blue", color: "#1f3a52" },
        { label: "Soft moss green", color: "#4f6b52" },
        { label: "Warm amber glow", color: "#c9903f" },
      ],
      imageryNotes:
        "Nature/ambient/symbolic — never a human face or figure, never Eli's identity, never a named real-world location.",
    },
  },
  {
    slug: "syt",
    name: "Samui Yoga Therapy",
    identity: { showsFace: true, showsName: true },
    voice: { type: "TBD", notes: "Fill in: ElevenLabs or live on-camera voice per video?" },
    brand: {
      palette: [
        { label: "Temple teak", color: "#4A3524" },
        { label: "Saffron ember", color: "#C97A2B" },
        { label: "Jungle canopy", color: "#3F5C46" },
        { label: "Dawn lotus", color: "#E8C4A0", usage: "accent only" },
        { label: "Incense ash", color: "#EDE7DD", usage: "bg" },
      ],
      imageryNotes: "Temple-rooted, warm, saturated.",
      typography: "Lora (display) + Raleway (body) — already in use",
    },
  },
  {
    slug: "eli-caleb",
    name: "Eli Caleb",
    identity: { showsFace: true, showsName: true },
    voice: { type: "TBD" },
    brand: {
      palette: [
        { label: "Lake grey-blue", color: "#5B7B82" },
        { label: "Sun-worn sand", color: "#C9B896" },
        { label: "Hill green, muted", color: "#566B4F" },
        { label: "Market accent", color: "#B5502E", usage: "sparing use" },
        { label: "Paper grey", color: "#EDEBE6", usage: "bg" },
      ],
      imageryNotes: "Sun-worn, unposed, muted.",
      typography: "Plain humanist sans, no serif flourish",
    },
  },
];

export function getChannel(slug: string): ChannelConfig {
  return CHANNELS.find((c) => c.slug === slug) ?? CHANNELS[0];
}
