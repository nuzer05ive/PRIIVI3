// spiral_wheel.js

const SpiralWheel = {
  title: "Spiral Personality Wheel",
  type: "12n+n Fold Grid",
  sliceCount: 100,
  redundantFold: 104,
  baseFoldRoot: 5,
  validSlices: [13, 26, 39, 54, 65, 78, 91, 104],

  wheelIndex: [
    { index: 0, anchor: "Ni1K", glyph: "W3::TRIS::nh0g0::T::Ni1K::abc123" },
    { index: 1, anchor: "MidGOD", glyph: "W3::TRIS::mh1g0::T::MidGOD::def456" },
    { index: 2, anchor: "Pr1M3", glyph: "W3::TRIS::ph2g0::T::Pr1M3::ghi789" },
    { index: 3, anchor: "SaraArt.SR631161", glyph: "W3::SCRB::sr6g1::A::SaraFold::ta635918" },
    { index: 99, anchor: "AFK5818", glyph: "W3::WHALE::af9g8::Z::FinalGate::zz999999" }
  ],

  shellModel: {
    symbol: "⚾️",
    structure: ["flip", "roll", "momentumLine"],
    axes: [3, 6, 9],
    mod: 120,
    linkedTo: "iCHiiNG Breath Harmony Wheel"
  },

  glyphPhysics: {
    primeStitching: true,
    foldAxis: "NowDot",
    emotiveSpin: "3D toroidal fold",
    spectrumBand: ["#F00", "#0F0", "#00F", "#FF0"]
  }
};
