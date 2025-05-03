// spiral-ai.js — SpiralAI v0.2: 100 Deterministic Workers (Offline Engine)

export const SpiralContext = {
  breath: "Inhale",
  wobble: 0,
  tick: 0,
  update(dt) {
    this.tick += dt;
    this.breath = this.tick % 7000 < 2500 ? "Inhale" : this.tick % 7000 < 4500 ? "Hold" : "Exhale";
    this.wobble = Math.abs(Math.sin(this.tick / 1000));
  }
};

function prng(seed) {
  let x = seed;
  return () => {
    x = (x * 16807) % 2147483647;
    return x / 2147483647;
  };
}

const Workers = [...Array(100)].map((_, i) => ({
  name: `Worker_${i}`,
  rules: [
    {
      when: { event: "onSpeak" },
      do: [
        {
          type: "spawnText",
          text: `«$msg» (echo ${i})`
        }
      ]
    }
  ]
}));

Workers[0].name = "Poet";
Workers[1].name = "Logik";
Workers[2].name = "Mathseer";

export function createAI(waaiicode) {
  const seed = [...waaiicode].reduce((a, c) => a + c.charCodeAt(0), 0);
  const rng = prng(seed);
  const worker = Workers[Math.floor(rng() * 100)];

  function act(rule, event) {
    if (rule.type === "spawnText") {
      const e = document.createElement("a-entity");
      e.setAttribute("text", {
        value: rule.text.replace("$msg", event.msg),
        color: "#ffd",
        align: "center"
      });
      e.setAttribute("position", "0 1.8 -2");
      document.querySelector("a-scene").appendChild(e);
    } else if (rule.type === "spawnCube") {
      const m = document.createElement("a-box");
      m.setAttribute("color", "#6cf");
      m.setAttribute("position", "0 0 -3");
      document.querySelector("a-scene").appendChild(m);
    }
  }

  function onEvent(event) {
    worker.rules.forEach((r) => {
      if (r.when.event && r.when.event !== event.type) return;
      act(r.do[0], event);
    });
  }

  return { worker, onEvent };
}
