AFRAME.registerComponent('spiral-personality', {
  schema: {},
  init: function () {
    this.t = 0;
    this.phi = 1.6180339887;
    this.el.setAttribute('text', {
      value: '⊹ DEWEY ⊹',
      color: '#ff00ff',
      align: 'center',
      width: 6
    });
  },
  tick: function (time, delta) {
    this.t += delta / 1000;
    let r = this.phi * this.t * 0.5;
    let x = Math.cos(this.t) * r;
    let y = 1.6 + Math.sin(this.t / this.phi) * 0.2;
    let z = -2.5 + Math.sin(this.t) * 0.2;

    this.el.setAttribute('position', { x: x, y: y, z: z });

    let frame = '⊹ DEWEY ⊹\nφ=' + this.phi.toFixed(5) + '\nt=' + this.t.toFixed(2);
    this.el.setAttribute('text', 'value', frame);
  }
});
