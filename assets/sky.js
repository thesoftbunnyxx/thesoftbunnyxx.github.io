'use strict';
/* the soft bunny xx · the living sky
   A slow, deep sky for hero moments: a great soft orb with an iridescent rim behind the logo,
   pearls floating beside it, prism light drifting through the corners, sweeping bands of colour,
   fine grain, and a layer of glitter that answers the pointer. Same family as the Seraphic sky,
   in the Soft Bunny palette (periwinkle through lilac to orchid).
   Usage: <div class="sbx-stage sky" data-sky> ... </div>   Decorative only; pauses off screen. */
(() => {
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('rm');
  const rand = (a, b) => a + Math.random() * (b - a);
  const FRAG = `precision highp float;uniform vec2 R;uniform float T;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fb(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*n(p);p=p*2.1+7.3;a*=.5;}return v;}
vec3 film(float t){return .58+.42*cos(6.2832*(t+vec3(0.,.33,.67)));}
vec3 ramp(float x){vec3 c=vec3(.985,.965,.985);c=mix(c,vec3(.86,.90,.985),smoothstep(0.,.18,x));c=mix(c,vec3(.62,.72,.96),smoothstep(.18,.4,x));c=mix(c,vec3(.56,.60,.94),smoothstep(.4,.62,x));c=mix(c,vec3(.70,.60,.93),smoothstep(.62,.84,x));return mix(c,vec3(.88,.68,.90),smoothstep(.84,1.,x));}
vec4 pearl(vec2 q,float r,float s){float d=length(q*vec2(1.,1.04+.05*sin(T*.2+s)))/r;if(d>1.75)return vec4(0.);vec2 u=q/r;vec2 w=vec2(fb(u*1.4+s+T*.05),fb(u*1.4-s-T*.04+3.));
vec3 c=mix(vec3(1.,.74,.88),vec3(.68,.82,1.),smoothstep(.3,.7,w.x));c=mix(c,vec3(1.,.90,.78),smoothstep(.45,.8,w.y));c=mix(c,vec3(1.),smoothstep(.58,.0,length(u+(w-.5)*.6)));
float rim=smoothstep(.6,.98,d)*smoothstep(1.14,.98,d);c=mix(c,vec3(1.,.95,.93)+film(d*1.6+atan(q.y,q.x)*.12+T*.02)*.12,rim*.85);
float al=smoothstep(1.16,.84,d);float au=exp(-pow(max(d-.95,0.)*2.2,2.))*.4;return vec4(c,max(al,au*(1.-al)));}
void main(){vec2 uv=gl_FragCoord.xy/R;float A=R.x/R.y;vec2 p=(uv-.5)*vec2(A,1.);float t=T;
vec2 w=vec2(fb(p*1.3+vec2(t*.035,-t*.02)),fb(p*1.3+vec2(-t*.03,t*.025)+4.7))-.45;
float g=1.-uv.y+w.y*.22;float x=.16+g*.74;float sd=dot(p,vec2(.82,.57))+w.x*.55+.1*sin(t*.07);x+=.13*sin(sd*2.6+t*.05);
vec3 col=ramp(clamp(x,0.,1.));
vec2 cn=(uv-.5)*2.;float k=smoothstep(.74,1.5,length(cn+w*.3))*(.5+.5*uv.y);col=mix(col,vec3(.965,.94,.985),k*.85);
vec2 c0=vec2(0.,.03);float rx=.2+.33*A,R0=min(.4,.2+.2*A);float e=length((p-c0+w*.1)/vec2(rx,.39));float f=1.-smoothstep(.55,1.18,e);
float cl=fb((p-c0)*2.2+vec2(t*.05,-t*.03));float c2=fb((p-c0)*1.7+vec2(-t*.04,t*.05)+9.);vec3 fd=mix(vec3(.47,.55,.93),vec3(.60,.58,.95),cl);fd+=vec3(.36,.12,.26)*smoothstep(.42,.72,c2)*.5;col=mix(col,fd,f*.9);
float r=length(p-c0)+(w.x+w.y)*.012,an=atan(p.y-c0.y,p.x-c0.x);float ins=smoothstep(R0,R0-.015,r);col=mix(col,vec3(.80,.86,1.),pow(r/R0,4.)*ins*.4);
float rg=exp(-pow((r-R0)/.0038,2.)),gw=exp(-pow((r-R0)/.06,2.));col+=(film(r*6.+an*.16+t*.03)*.55+.45)*rg*.4+(film(r*2.5+an*.1+t*.02)*.5+.5)*gw*.09;
vec4 o=pearl(p-vec2(-.36*A,-.26)-.018*vec2(sin(t*.2),cos(t*.17)),.085+.03*A,1.3);col=mix(col,o.rgb,o.a);
o=pearl(p-vec2(.31*A,.3)-.02*vec2(cos(t*.16),sin(t*.21)),.045+.022*A,4.1);col=mix(col,o.rgb,o.a);
for(int i=0;i<4;i++){float fi=float(i),an2=.85+fi*.37+.12*sin(t*.06+fi);vec2 dr=vec2(cos(an2),sin(an2));vec2 q=p-vec2((fi<2.?-1.:1.)*(.34+.06*fi)*A,mod(fi,2.)<1.?.3:-.22)-.06*vec2(sin(t*.11+fi),cos(t*.09+fi*2.));float l=dot(q,dr),a2=dot(q,vec2(-dr.y,dr.x)),wd=.032+.011*fi;float s=exp(-pow(l/.34,2.))*exp(-pow(a2/wd,2.)),pu=.55+.45*sin(t*.23+fi*1.7);col=mix(col,film(a2/wd*.28+.1*fi+t*.02)+.28,s*pu*.34);col+=exp(-pow(l/.16,2.))*exp(-pow(a2/(wd*.3),2.))*pu*.32;}
col+=(h(gl_FragCoord.xy+T)-.5)/90.;gl_FragColor=vec4(col,1.);}`;

  document.querySelectorAll('[data-sky]').forEach(stage => {
    const sky = document.createElement('canvas'), fx = document.createElement('canvas');
    [sky, fx].forEach(c => { c.setAttribute('aria-hidden', 'true'); c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;z-index:-1'; });
    const gl = sky.getContext('webgl', { antialias: false, powerPreference: 'low-power', preserveDrawingBuffer: true });
    if (!gl) return;                                   // without WebGL the stage keeps its plain gradient
    const make = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const v = make(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'), f = make(gl.FRAGMENT_SHADER, FRAG);
    if (!v || !f) return;
    const prog = gl.createProgram(); gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, 'R'), uT = gl.getUniformLocation(prog, 'T');
    stage.prepend(fx); stage.prepend(sky);
    stage.classList.add('sky-live');

    // Glitter: tiny points that breathe, and a few four-armed flares with a pink and blue fringe.
    const ctx = fx.getContext('2d');
    const sprite = (size, draw) => { const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d'); g.translate(size / 2, size / 2); draw(g, size / 2); return c; };
    const dots = ['#ffffff', '#f3e6ff', '#dfe6ff', '#fff1dc'].map(color => sprite(24, (g, r) => { const p = g.createRadialGradient(0, 0, 0, 0, 0, r); p.addColorStop(0, '#fff'); p.addColorStop(.3, color); p.addColorStop(.5, color + '5c'); p.addColorStop(1, color + '00'); g.fillStyle = p; g.fillRect(-r, -r, 2 * r, 2 * r); }));
    const flare = sprite(192, (g, r) => {
      const p = g.createRadialGradient(0, 0, 0, 0, 0, r * .3); p.addColorStop(0, 'rgba(255,255,255,1)'); p.addColorStop(.25, 'rgba(255,255,255,.4)'); p.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = p; g.fillRect(-r, -r, 2 * r, 2 * r);
      [['rgba(255,176,212,.4)', 1.6, 1], ['rgba(160,196,255,.4)', -1.6, 1], ['#fff', 0, 1]].forEach(s => {
        g.fillStyle = s[0];
        [[0, 1], [Math.PI / 2, 1], [Math.PI / 4, .28], [3 * Math.PI / 4, .28]].forEach(arm => { const L = r * s[2] * arm[1]; g.save(); g.rotate(arm[0]); g.translate(s[1], 0); g.beginPath(); g.moveTo(-L, 0); g.quadraticCurveTo(0, -1, L, 0); g.quadraticCurveTo(0, 1, -L, 0); g.fill(); g.restore(); });
      });
    });
    let W = 0, H = 0, DPR = 1, glints = [], flares = [], rings = [], dust = [];
    const place = () => {
      W = stage.clientWidth; H = stage.clientHeight; if (!W || !H) return;
      const q = Math.min(.7, 900 / Math.max(W, H)) * (stage.dataset.sky === 'sharp' ? 2.4 : 1);
      sky.width = Math.round(W * q); sky.height = Math.round(H * q); gl.viewport(0, 0, sky.width, sky.height);
      DPR = Math.min(devicePixelRatio || 1, 2.5); fx.width = W * DPR; fx.height = H * DPR;
      const small = W < 700, count = small ? 70 : 170;
      glints = Array.from({ length: count }, (_, i) => ({ x: rand(0, W), y: rand(H * .03, H), s: rand(2.2, small ? 5 : 6.5), f: rand(.5, 2.2), p: rand(0, 7), i: i % 4 }));
      flares = [[.1, .2, 70], [.9, .64, 90], [.2, .84, 40], [.8, .1, 44], [.96, .32, 32]].slice(0, small ? 3 : 5).map(v => ({ x: v[0] * W, y: v[1] * H, s: v[2] * (small ? .7 : 1.15), f: rand(.2, .42), p: rand(0, 7) }));
    };
    const draw = t => {
      gl.uniform2f(uR, sky.width, sky.height); gl.uniform1f(uT, t); gl.drawArrays(gl.TRIANGLES, 0, 3);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, W, H);
      glints.forEach(g => { const al = Math.sin(t * g.f + g.p); if (al <= .08) return; ctx.globalAlpha = Math.pow(al, 2.4); ctx.drawImage(dots[g.i], g.x - g.s / 2, g.y - g.s / 2, g.s, g.s); });
      flares.forEach(p => { const al = .55 + .45 * Math.sin(t * p.f + p.p), z = p.s * (.78 + .22 * al); ctx.globalAlpha = al; ctx.drawImage(flare, p.x - z / 2, p.y - z / 2, z, z); });
      ctx.lineWidth = .8;
      rings = rings.filter(r => { const q = (t - r.t) / 2.6; if (q >= 1) return false; for (let k = 0; k < 3; k++) { const z = q - k * .13; if (z <= 0) continue; ctx.globalAlpha = (1 - q) * (1 - q) * .85; ctx.strokeStyle = ['#fff', '#ffe0ee', '#d6e8ff'][k]; ctx.beginPath(); ctx.ellipse(r.x, r.y, z * 110, z * 32, 0, 0, 7); ctx.stroke(); } return true; });
      dust = dust.filter(d => { const q = (t - d.t) / d.life; if (q >= 1) return false; ctx.globalAlpha = (1 - q) * (1 - q); ctx.fillStyle = d.c; ctx.beginPath(); ctx.arc(d.x + d.dx * q, d.y + d.dy * q * q, d.r * (1 - q * .5), 0, 7); ctx.fill(); return true; });
      ctx.globalAlpha = 1;
    };
    const t0 = performance.now(), fixed = stage.dataset.skyTime;
    let on = false, seen = true;
    const now = () => (performance.now() - t0) / 1000;
    const frame = () => { if (!on) return; draw(now() + 8); if (seen && !document.hidden && !still() && fixed === undefined) requestAnimationFrame(frame); else on = false; };
    const wake = () => { if (fixed !== undefined || still()) { draw(+fixed || 12); return; } if (!on) { on = true; requestAnimationFrame(frame); } };
    new IntersectionObserver(es => { seen = es[0].isIntersecting; if (seen) wake(); }).observe(stage);
    document.addEventListener('visibilitychange', wake);
    let settle; addEventListener('resize', () => { clearTimeout(settle); settle = setTimeout(() => { place(); wake(); }, 140); }, { passive: true });
    // A passing hand leaves dust; a touch sends out rings of light.
    const at = e => { const r = stage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    let lastDust = 0;
    stage.addEventListener('pointermove', e => { if (still() || e.pointerType !== 'mouse' || e.timeStamp - lastDust < 46) return; lastDust = e.timeStamp; const p = at(e); dust.push({ x: p.x + rand(-3, 3), y: p.y + rand(-3, 3), dx: rand(-9, 9), dy: rand(10, 26), r: rand(.5, 1.3), c: Math.random() < .2 ? '#ffe9f4' : '#fff', t: now() + 8, life: rand(.8, 1.5) }); if (dust.length > 60) dust.shift(); }, { passive: true });
    stage.addEventListener('pointerdown', e => { if (still()) return; const p = at(e); rings.push({ x: p.x, y: p.y, t: now() + 8 }); if (rings.length > 4) rings.shift(); }, { passive: true });
    place(); wake();
  });
})();
